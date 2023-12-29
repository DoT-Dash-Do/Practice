import express from "express";
import { isAuthenticated } from "../middlewares/auth.js"; 
import { getAllUsers, register, getMyProfile,login, logout} from "../controllers/user.js";
const router = express.Router();
router.get("/users/all",getAllUsers);
router.post("/users/new",register);
router.post("/user/login",login)
router.get("/user/me", isAuthenticated, getMyProfile);
router.get("/logout",logout)
export default router;