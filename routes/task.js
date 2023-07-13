const express=require('express')
const {newTask,getMyTask,UpdateTask, DeleteTask}=require('../controllers/task');
const router=express.Router();
const fetchuser=require('../middlewares/fetchuser')

router.post('/new',fetchuser, newTask);
router.get('/fetchtask',fetchuser,getMyTask);
router.route('/:taskid').put(fetchuser,UpdateTask).delete(fetchuser,DeleteTask);

module.exports=router;
