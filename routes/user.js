const express=require('express')
const router=express.Router();
const{ Register,Login,Mydetails,Logout}=require('../controllers/user')
const fetchuser=require('../middlewares/fetchuser')


router.post('/register',Register);
router.post('/login',Login);
router.get('/me',fetchuser,Mydetails);
router.get('/logout',Logout);

module.exports=router;

