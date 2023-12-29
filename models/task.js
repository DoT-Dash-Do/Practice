import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title:String,
    description:{
        type:String,
        required:true,
        unique:true
    },
    isCompleted: {
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const Task = mongoose.model("Task",schema);
export default Task;