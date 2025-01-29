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

// get teacher list
teacherRouter.get(
    "/",
    teacherController.getAllTeachers
);

// get teacher by id
teacherRouter.get(
    "/:id",
    celebrate(GetTeacher),
    teacherController.getTeacherById
);

// create teacher
teacherRouter.post(
    "/",
    celebrate(CreateTeacher),
    teacherController.createTeacher
)

// update teacher
teacherRouter.put(
    "/:id",
    celebrate(UpdateTeacher),
    teacherController.updateTeacher
)

// delete teacher
teacherRouter.delete(
    "/:id",
    celebrate(DeleteTeacher),
    teacherController.deleteTeacher
);

export default teacherRouter;