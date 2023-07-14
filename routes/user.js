const express=require('express')
const router=express.Router();
const{ Register,Login,Mydetails,Logout}=require('../controllers/user')
const fetchuser=require('../middlewares/fetchuser')
const { body, validationResult } = require('express-validator');

router.post('/register',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], Register);


router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
],Login);


router.get('/me',fetchuser,Mydetails);
router.get('/logout',Logout);

module.exports=router;

