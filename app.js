import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express();
config({
    path:"./data/config.env",
})
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use("/api/v1/UserFn",userRouter);
app.use("/api/v1/TaskFn",taskRouter);

connectDb();

app.get("/",(req,res)=>{
    res.send("nice working");
});

app.use(errormiddleware);
