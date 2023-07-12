
const User = require('../models/user');
const jwt=require('jsonwebtoken')

const isAuthentication = async(req,res,next)=>{

    const { token } = req.cookies;
    if (!token)
      return res.status(404).json({ message: "Please Login", status: false });
  
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded);
    req.user = await User.findById(decoded.id);

    next();

}
module.exports=isAuthentication;