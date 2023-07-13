const Task=require('../models/task')
const jwt = require('jsonwebtoken')
const User=require('../models/user')

const newTask = async(req,res,next) =>{
    try{  
        const {title,description}=req.body;
        const token=req.header('auth-token')
        if (!token)
       return res.status(404).json({ message: "Please Login", success: false });
     
      const {id} = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(id);
          await Task.create({title,description,user});
        res.status(201).json({
            success:true,
            message:'Task added successfully',  
        });
    } catch (error) {
        return next(error);
    }
}

const getMyTask = async(req,res,next)=>{
    try{
        const {token}=req.body;
        if (!token)
            return res.status(404).json({ message: "Please Login", success: false });
        const {id} = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(id);
        const userId=user._id;
        const tasks=await Task.find({user:userId});
        res.status(201).json({success:true,
            tasks,
        });
    } catch (error) {
        return next(error);
    }
}

const UpdateTask = async(req,res,next)=>{
    
    try {   
        const {token}=req.body;
        if (!token)
            return res.status(404).json({ message: "Please Login", success: false });
        const {id} = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(id);
        const userId=user._id;
        const task=await Task.findById(req.params.taskid);
        console.log(task)
        if(!task) return next(new Error("Task Not Found"))
        if(JSON.stringify(task.user._id)!=JSON.stringify(userId)) return next(new Error("Task Not Found"))
        task.isCompleted=!task.isCompleted;
        await task.save();
        res.status(201).json({
            success:true,
            message:'Task has been Updated'
        });

    } catch (error) {
        return next(error);
    }
}

const DeleteTask = async(req,res,next)=>{

    try{
        const {token}=req.body;
        if (!token)
            return res.status(404).json({ message: "Please Login", success: false });
        const {id} = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(id);
        const userId=user._id;
        const task=await Task.findById(req.params.taskid);
        console.log(task)
        if(!task) return next(new Error("Task Not Found"))
        if(JSON.stringify(task.user._id)!=JSON.stringify(userId)) return next(new Error("Task Not Found"))
        await task.deleteOne();
        res.status(201).json({
            success:true,
            message:'Task has been Deleted'
        });
    } catch (error) {
        return next(error);
    }
}


module.exports={newTask,getMyTask,UpdateTask,DeleteTask};
