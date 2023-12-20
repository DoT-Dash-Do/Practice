import express from "express";
import Users from "../models/user.js";
import cookieParser from "cookie-parser"; 
import { getAllUsers, register, singleId } from "../controllers/user.js";
const router = express.Router();
router.get("/users/all",getAllUsers);
router.get("/users/:id",singleId);
router.post("/users/new",register);

export default router;