const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const emailRouter = require("./routes/emailroute");
const authrouter = require("./routes/authroute");
const cors = require("cors");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // React/Vite frontend URL
    credentials: true,
  })
);

app.use("/api/verify", emailRouter);
app.use("/api/auth",authrouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});