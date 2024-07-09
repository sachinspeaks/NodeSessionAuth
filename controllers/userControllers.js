const session = require("express-session");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  console.log("sdjfbgsdjfbgjdsbg");
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

exports.login = async (req, res) => {
  console.log("sdlfjbgdjbgjh");
  console.log(req.session.clientId, req.session.user, "sdkfbgsdlkhf");
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username/password" });
    }
    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username/password" });
    }
    req.session.user = user;
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error });
  }
};

exports.getHomePage = (req, res) => {
  res.json({ message: "Welcome to the homepage", session: req.session });
};
