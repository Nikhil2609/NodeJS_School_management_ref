import express from "express";
import TeacherRepository from "../Repository/teacherRepository";
import TeacherService from "../Service/teacherService";
import TeacherController from "../Controller/teacherController";
import { teacherSchema } from "../Utility/Validation/teacherValidation";
import { celebrate } from "celebrate";
import { authenticateToken } from "../Middleware/authMiddleware";

const { CreateTeacher, DeleteTeacher, UpdateTeacher, GetTeacher } = teacherSchema

const teacherRouter = express.Router();
const teacherRepository: TeacherRepository = new TeacherRepository();
const teacherService: TeacherService = new TeacherService(teacherRepository);
const teacherController: TeacherController = new TeacherController(teacherService);

teacherRouter.get("/", authenticateToken, teacherController.getAllTeachers)
teacherRouter.get("/:id", celebrate(GetTeacher), teacherController.getTeacherById)
teacherRouter.post("/", celebrate(CreateTeacher), teacherController.createTeacher)
teacherRouter.put("/", celebrate(UpdateTeacher), teacherController.updateTeacher)
teacherRouter.delete("/:id", celebrate(DeleteTeacher), teacherController.deleteTeacher)

export default teacherRouter;