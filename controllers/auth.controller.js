const User = require("../models/user.model");
const Promise = require("../models/promise.model");
const bcrypt = require("bcrypt");
const connect = require("../lib/db");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    await connect();
    console.log(req.body);
    const isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hash,
    });
    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  try {
    await connect();
    const isUser = await User.findOne({ email: req.body.email });
    if (!isUser) {
      return res.status(400).json({ message: "user not found" });
    }
    const match = await bcrypt.compare(req.body.password, isUser.password);
    if (!match) {
      return res.status(401).json({ message: "wrong password" });
    }
    const exp = Date.now() + 1000 * 60 * 60;
    const token = jwt.sign({ id: isUser._id, exp }, process.env.SECRET_KEY);
    res
      .cookie("Authorization", token)
      .status(200)
      .json({
        user: {
          email: isUser.email,
          _id: isUser._id,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error", error });
  }
};

const sendEmail = async (req, res) => {
  try {
    await connect()

    const user = await User.findOne({email:req.body.email})
    if(user){
      return res.status(400).json({ message: "User Already Exist" });


    }

    const mailer = require("../lib/mailer");
    const exp = Date.now() + 1000 * 60 * 60;
    const token = jwt.sign(
      { email: req.body.email, exp },
      process.env.SECRET_KEY
    );
    const template = `<h1>Confirmation Email from XAPP</h1>
        <div>please Click <a href=http://localhost:5173/auth/register?token=${token}>Dev Link</a></div>
        <div>please Click <a href=http://localhost:4444/auth/register?token=${token}>prod Link</a></div>
        `;
    mailer.sendEmail(req.body.email, "Email Confirmation", template);
    await connect();
    await Promise.create({
      email: req.body.email,
      token: token,
    });

    res.status(200).json({ message: "mail sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "mail error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    await connect();

    const decoded = jwt.decode(req.body.token, process.env.SECRET_KEY);

    if (decoded && decoded.exp > Date.now()) {
      const promise = await Promise.findOne({ email: decoded.email });
      console.log(promise);
      if (decoded.email == promise.email)
        return res
          .status(200)
          .json({ message: "email validated", email: promise.email });
    }

    res.status(400).json({ message: "failed verifying email" });
  } catch (error) {
    console.log();
    res.status(500).json({ message: "mail error" });
  }
};

const logout = async (req, res) => {
  try {
    res
      .clearCookie("Authorization")
      .status(204)
      .json({ message: "logged out" });
  } catch (error) {
    console.log();
    res.status(500).json({ message: "mail error" });
  }
};

module.exports = { register, login, sendEmail, verifyEmail,logout };
