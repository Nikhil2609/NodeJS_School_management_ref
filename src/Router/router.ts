import express from "express";
import teacherRouter from "./teacherRoute";
import studentRouter from "./studentRoute";
import { authenticateToken } from "../Middleware/authMiddleware";
import loginRoute from "./loginRoutes";

const router = express.Router();

router.use("/login", loginRoute)
router.use("/teachers", authenticateToken, teacherRouter);
router.use("/students", studentRouter);

export default router;
