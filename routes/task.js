const express=require('express')
const {newTask,getMyTask,UpdateTask, DeleteTask}=require('../controllers/task');
const isAuthentication = require('../middlewares/auth');
const router=express.Router();

router.post('/new', newTask);
router.get('/fetchtask',getMyTask);
router.route('/:taskid').put(UpdateTask).delete(DeleteTask);

module.exports=router;
