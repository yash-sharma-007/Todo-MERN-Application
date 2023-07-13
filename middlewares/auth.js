
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const isAuthentication = async (req, res, next) => {
  try {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      return res.status(404).json({ message: "Please Login", success: false });
    }

    const tokenCookie = cookieHeader.split(';').find((cookie) => cookie.trim().startsWith('token='));
    if (!tokenCookie) {
      return res.status(404).json({ message: "Please Login", success: false });
    }

    const token = tokenCookie.split('=')[1];
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(id);
  } catch (error) {
    console.log("Internal error in auth.js", error);
  }
  next();
};

module.exports = isAuthentication;
