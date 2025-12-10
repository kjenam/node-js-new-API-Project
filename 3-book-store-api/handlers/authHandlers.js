const userModel = require('../models/user-model')

const bcrypt = require("bcryptjs");

const registerHandler = async (req, res) => {
  try {
    const { username, email, password, height, isAdmin } = req.body;

    if (!username || !email || !password || !height) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      username,
      email,
      height,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    if (createdUser) {
      return res.status(201).json({
        message: "User Registered Successfully",
        username: createdUser.username,
        password: createdUser.password, 

        createdUser
      });
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginHandler = async (req, res) => {};

module.exports = { registerHandler, loginHandler };
