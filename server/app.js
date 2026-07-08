const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const emailRouter = require("./routes/emailroute");
const authrouter = require("./routes/authroute");
const doctorrouter = require("./routes/doctorroute");
const slotRouter = require("./routes/slotroutre");
const cors = require("cors");

const corsOptions = {
  origin: "https://hospital-management-2-rg9j.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/verify", emailRouter);
app.use("/api/auth", authrouter);
app.use("/api/doctor", doctorrouter);
app.use("/api/slot", slotRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});