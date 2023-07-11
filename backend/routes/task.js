const express=require('express')
const {newTask,getMyTask,UpdateTask, DeleteTask}=require('../controllers/task');
const isAuthentication = require('../middlewares/auth');
const router=express.Router();

router.post('/new',isAuthentication, newTask);
router.get('/fetchtask',isAuthentication,getMyTask);
router.route('/:taskid').put(isAuthentication,UpdateTask).delete(isAuthentication,DeleteTask);

module.exports=router;