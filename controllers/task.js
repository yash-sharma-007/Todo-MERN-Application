const Task = require("../models/task");
const { validationResult } = require('express-validator');


const newTask = async (req, res, next) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
  try {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      user: req.user,
    });
    const saveTask = await task.save();

    res.status(201).json({
      success: true,
      message: "Task added successfully",
      saveTask,
    });
  } catch (error) {
    return next(error);
  }
};

const getMyTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    return next(error);
  }
};

const UpdateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskid);
    if (!task) return next(new Error("Task Not Found"));
    if (JSON.stringify(task.user) != JSON.stringify(req.user))
      return next(new Error("Task Not Found"));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task has been Updated",
    });
  } catch (error) {
    return next(error);
  }
};

const DeleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskid);
    if (!task) return next(new Error("Task Not Found"));
    if (JSON.stringify(task.user) != JSON.stringify(req.user))
      return next(new Error("Task Not Found"));
    await task.deleteOne();
    res.status(201).json({
      success: true,
      message: "Task has been Deleted",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { newTask, getMyTask, UpdateTask, DeleteTask };
