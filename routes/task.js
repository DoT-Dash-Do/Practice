import express from 'express';
import { allTasks, newTask , updateTask , deleteTask} from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post("/new",isAuthenticated,newTask);
router.get("/allT",isAuthenticated,allTasks);

router
.route("/:id")
.put(isAuthenticated,updateTask)
.delete(isAuthenticated,deleteTask);
export default router;