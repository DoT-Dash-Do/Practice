import Task from "../models/task.js";


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
        return res.status(404).json({
        success:false,
        message:"Invalid id"
    });
    await task.save();

    res.status(200).json({
        success:true,
        message:"Task Updated",
    });
};

export const deleteTask = async(req,res,next) => {
    const {id} = req.params;
    const task = await Task.findById(id);

    if(!task) return res.status(404).json({
        success:false,
        message:"Invalid id"
    });
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