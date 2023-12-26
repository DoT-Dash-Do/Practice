import express from "express";
import userRouter from "./routes/user.js";
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
export const app = express();
config({
    path:"./data/config.env",
})
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/UserFn",userRouter);
const router = express.Router();

connectDb();

app.get("/",(req,res)=>{
    res.send("nice working");
});
