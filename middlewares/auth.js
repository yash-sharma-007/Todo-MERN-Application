const User = require('../models/user');
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const isAuthentication = async(req,res,next)=>{
try {
  const token = req.rawHeaders[5].slice(6);
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
