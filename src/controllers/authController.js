const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");
require("dotenv").config();

const register = async (req, res) => {
  console.log("hello, new user");
  try {
    const { userName, email } = req.body;
    console.log(req.body);

    const user = await User.findOne({ where: { name: userName } });;
    if (user) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const userEmail = await User.findOne({ where: { email: email } });
    if (userEmail) {
      return res.status(400).json({ error: "Email already in use!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      name: userName,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { name: userName } });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    // Create and assign a token
    const token = jwt.sign(
      { userId: user.id, username: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
    });
    console.log("Logged in successfully", {
      userName: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
