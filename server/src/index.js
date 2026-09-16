const express = require("express");
const CORS = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const interviewRoutes = require("./routes/interview");
const resumeRoutes = require("./routes/resume");

const connectDB = require("./config/db");

connectDB();

const app = express();

// CORS
app.use(
  CORS({
    origin: ["http://localhost:3000",
       "https://client-theta-flame-21.vercel.app","https://client-lyphbgnyc-shreyaaa24s-projects.vercel.app",],
       
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/resume", resumeRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running !");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});