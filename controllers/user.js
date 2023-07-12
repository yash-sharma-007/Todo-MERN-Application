const mongoose = require("mongoose");
const User = require("../models/user");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const sendCookie = require("../functions/feature");

const Register = async (req, res,next) => {
  try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email: req.body.email });
      if (user) return res.send({ success:false,message: "User already Registered, Please Login" });
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

const Login = async (req, res,next) => {
  try{
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
  try{
     res.status(200).json({ success: true, user:req.user });
  } catch (error) {
    res.json({success:false,message:"Internal Error ..."});
  }
};

const Logout = (req,res)=>{
  try{
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    res
    .status(200)
    .cookie( {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
    localStorage.removeItem('token')
  } catch (error) {
      res.json({success:false,message:"Internal Error ..."});
  }
}


module.exports = { Register, Login, Mydetails,Logout };
