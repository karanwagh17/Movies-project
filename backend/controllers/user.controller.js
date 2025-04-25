const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signup = async (req, res) => {
  const { username, email, role, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "plese fill all the fields" });
  }
  if (role) {
    return res.status(400).json({ message: "you cant decide role" });
  }
  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "account is already exist" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const signupData = await userModel.create({
        ...req.body,
        password: hash,
      });

      const { password, ...rest } = signupData._doc;

      return res
        .status(200)
        .json({ message: "accoun is created success fully", rest });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "plese fill all the blanks " });
  }

  try {
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res
        .status(400)
        .json({ message: "plese create account first then sign in " });
    }

    await bcrypt.compare(password, existUser.password, async (err, result) => {
      if (err) {
        console.log(err);
      }
      if (!result) {
        return res.status(400).json({ message: "wrong password" });
      }

      const { password, ...rest } = existUser._doc;

      await jwt.sign({ user: rest }, process.env.PRIVATE_KEY, (err, token) => {
        if (err) {
          return console.log(err);
        }
        return res
          .cookie("verificationToken", token)
          .status(200)
          .json({ message: "login succefully", rest });
      });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { signup, signin };
