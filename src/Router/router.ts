import express from "express";
import teacherRouter from "./teacherRoute";
import studentRouter from "./studentRoute";
import { authenticateToken } from "../Middleware/authMiddleware";
import loginRoute from "./loginRoutes";

const router = express.Router();

router.use("/login", loginRoute)
router.use("/teacher", authenticateToken, teacherRouter);
router.use("/student", studentRouter);

export default router;
