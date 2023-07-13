const User = require('../models/user');
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const isAuthentication = async(req,res,next)=>{
try {
  console.log(req.cookies);
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({ message: "Please Login", success: false });
  
  const {id} = jwt.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(id);
} catch (error) {
   console.log("Internal error in auth.js") 
}
    next();

}
module.exports=isAuthentication;
