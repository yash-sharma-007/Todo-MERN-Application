const Task=require('../models/task')
const jwt = require('jsonwebtoken')
const User=require('../models/user')

const newTask = async(req,res,next) =>{
    try{  
        const {title,description}=req.body;
          await Task.create({title,description,user:req.user});
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
        const tasks=await Task.find({user:req.user}); 
        res.status(201).json({success:true,
            tasks,
        });
    } catch (error) {
        return next(error);
    }
}

const UpdateTask = async(req,res,next)=>{
    
    try {   
       
        const task=await Task.findById(req.params.taskid);
        if(!task) return next(new Error("Task Not Found"))
        if(JSON.stringify(task.user)!=JSON.stringify(req.user)) return next(new Error("Task Not Found"))
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
        
        const task=await Task.findById(req.params.taskid);
        if(!task) return next(new Error("Task Not Found"))
        if(JSON.stringify(task.user)!=JSON.stringify(req.user)) return next(new Error("Task Not Found"))
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
