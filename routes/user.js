import express from "express";
import Users from "../models/user.js";
import cookieParser from "cookie-parser"; 
import { getAllUsers, register, getMyProfile,login} from "../controllers/user.js";
const router = express.Router();
router.get("/users/all",getAllUsers);
router.post("/users/new",register);
router.post("/user/login",login)
router.get("/user/me",getMyProfile);

export default router;