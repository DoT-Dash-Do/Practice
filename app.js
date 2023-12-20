import express from "express";
import userRouter from "./routes/user.js";
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
export const app = express();
config({
    path:"./data/config.env",
})
app.use(userRouter);
const router = express.Router();
app.use(express.json());
connectDb();

app.get("/",(req,res)=>{
    res.send("nice working");
});
