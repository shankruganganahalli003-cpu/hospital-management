const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token,role } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }


    // ✅ FIX: verify WITH audience
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture,
        role: role
      });
    } else {
  user.role = role;
  await user.save();
}

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
  console.log("OAuth error:", err.message);
  return res.status(401).json({
    error: "Google login failed",
  });
}
};


