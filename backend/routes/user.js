const express=require('express')
const router=express.Router();
const{ Register,Login,Mydetails,Logout}=require('../controllers/user')
const isAuthentication=require('../middlewares/auth')


router.post('/register',Register);
router.post('/login',Login);
router.get('/me',isAuthentication,Mydetails);
router.get('/logout',Logout);

module.exports=router;

