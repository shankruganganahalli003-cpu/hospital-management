const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { token, role } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    console.log("Verifying token...");

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("Token verified");

    const payload = ticket.getPayload();

    console.log("Payload:", payload);

    let user = await User.findOne({ email: payload.email });

    console.log("User:", user);

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        profileImage: payload.picture,
        role,
      });

      console.log("User created");
    } else {
      user.role = role;
      await user.save();
      console.log("User updated");
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
  console.error("========== GOOGLE LOGIN ERROR ==========");
  console.error(err);

  return res.status(401).json({
    error: err.message,
    stack: err.stack,
  });
}
};