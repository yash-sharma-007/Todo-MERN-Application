const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendCookie = require("../functions/feature");
const { validationResult } = require("express-validator");

const Register = async (req, res, next) => {
  let success = false;
  const errors = validationResult(req);
  
    if (!errors.isEmpty()){
      return res.json({ success, message: errors.errors[0].msg });
  }
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.send({
        success: false,
        message: "User already Registered, Please Login",
      });
    else {
      const new_password = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
      );
      user = await User.create({
        name: name,
        email: email,
        password: new_password,
      });
      sendCookie(user, res, "User Successfully Registered...", 201);
    }
  } catch (error) {
    return next(new Error("Internal Error"));
  }
};

const Login = async (req, res, next) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, message: errors.errors[0].msg  });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");

    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid Email or Password", success: false });
    const check = await bcrypt.compare(password, user.password);
    if (!check)
      return res
        .status(404)
        .json({ message: "Invalid Email or Password", success: false });
    sendCookie(user, res, `Welcome Back ${user.name}`, 201);
  } catch (error) {
    return next(new Error("Internal Error"));
  }
};

const Mydetails = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.json({ success: false, message: "Internal Error ..." });
  }
};

const Logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    });
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Error..." });
  }
};

module.exports = { Register, Login, Mydetails, Logout };
