const User = require("../models/user");
const signToken = (userId) => {
  const jwt = require("jsonwebtoken");
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1D",
  });
}
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = signToken(newUser._id.toString());
    res.status(200).json({
       message: "User registered successfully",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
       token });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
        message: "Internal server error",
        error: error.message
    });
}
  }

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (
      !existingUser ||
      !(await existingUser.comparePassword(password))
    ) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = signToken(existingUser._id.toString());

    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const founduser= await User.findById(req.user.id).select("-password");
    if (!founduser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: founduser });
    } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { register, login, getMe };