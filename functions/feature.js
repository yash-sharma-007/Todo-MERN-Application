const jwt = require('jsonwebtoken');

const sendCookie = (user, res, message, statuscode=200) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxage: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({ success: true, message: message,cookie:token,user:user });
};

module.exports = sendCookie;
