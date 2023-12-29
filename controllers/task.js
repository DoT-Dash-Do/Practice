import Task from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req,res,next)=>{
    const {title,description} = req.body;
    await Task.create({
        title,
        description,
        user:req.user
    });

    res.status(201).json({
        success:true,
        message: "Task added successfully"
    });
};
export const updateTask = async(req,res,next) => {
    const {id} = req.params;
    const task = await Task.findById(id);
    task.isCompleted = !task.isCompleted;
    if(!task) 
        return next(new ErrorHandler("Task not Found",404));
    await task.save();

    res.status(200).json({
        success:true,
        message:"Task Updated",
    });
};

export const deleteTask = async(req,res,next) => {
    const {id} = req.params;
    const task = await Task.findById(id);

    if(!task) 
    return next(new ErrorHandler("Task not Found",404));
    await task.deleteOne();
    res.status(200).json({
        success:true,
        message:"Task deleted"
    });
};
export const allTasks = async(req,res,next)=>{
    const userid = req.user._id;

    const tasks = await Task.find({user:userid});

    res.status(200).json({
        success:true,
        tasks
    });
};