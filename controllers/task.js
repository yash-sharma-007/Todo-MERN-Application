const express=require('express')
const Task=require('../models/task')
const ErrorHandler=require('../middlewares/error')

const newTask = async(req,res,next) =>{
    try{
        const {title,description} =req.body 
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
        const userId=req.user._id;
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
        const task=await Task.findById({_id:req.params.taskid});
        if(!task) return next(new Error("Task Not Found"))
        if(JSON.stringify(task.user._id)!=JSON.stringify(req.user._id)) return next(new Error("Task Not Found"))
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
        if(!task) return next(new Error("Task Not Found"));
        if(JSON.stringify(task.user._id)!=JSON.stringify(req.user._id)) return next(new Error("Task Not Found"));
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
