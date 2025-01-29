import { NextFunction, Request, Response } from "express";
import TeacherService from "../Service/teacherService";
import { sendErrorResponse, sendResponse } from "../Utility/Responsehelper";
import { HTTP_STATUS_CODE } from "../Utility/Enum";
import { TeacherModal } from "../Modal/Teacher";
import { Op } from "sequelize";

export default class TeacherController {
  private teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  getAllTeachers = async (req: Request, res: Response) => {
    const teachers = await this.teacherService.getAllTeachers();
    const message = teachers?.length ? "Teachers fetched successfully" : "No Teacher Found"
    return sendResponse(res, HTTP_STATUS_CODE.OK, teachers, message);
  }

  getTeacherById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const teacher = await this.teacherService.getTeacherById(Number(id));
    if (!teacher) {
      return sendErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, "Teacher Not Found");
    }

    return sendResponse(res, HTTP_STATUS_CODE.OK, teacher, "Teacher fetched successfully");
  }

  createTeacher = async (req: Request, res: Response, next: NextFunction) => {

    const isAlreadyExist: any = await TeacherModal.findOne({ where: { email: req.body.email } });
    if (isAlreadyExist) {
      return sendErrorResponse(res, HTTP_STATUS_CODE.CONFLICT, "Teacher is already exist");
    }

    const teacher = await this.teacherService.createTeacher(req.body);
    console.log("user=>", (req as any).user) // we can use this as admin user email for account base operation
    return sendResponse(res, HTTP_STATUS_CODE.CREATED, teacher, "Teacher created successfully");
  }

  updateTeacher = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("teacher=>", id)
    const teacher = await this.teacherService.getTeacherById(Number(id));
    console.log("teacher=>", teacher)
    if (!teacher) {
      return sendErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, "Teacher Not Found");
    }

    const isEmailAlreadyExist = await TeacherModal.findOne({ where: { email: { [Op.eq]: req.body.email }, id: { [Op.not]: id } } });
    if (isEmailAlreadyExist) {
      return sendErrorResponse(res, HTTP_STATUS_CODE.CONFLICT, "Teacher is already exist");
    }

    const updatedTeacher = await this.teacherService.updateTeacher(Number(id), req.body);
    return sendResponse(res, HTTP_STATUS_CODE.OK, updatedTeacher, "Teacher updated successfully");
  }

  deleteTeacher = async (req: Request, res: Response) => {
    const { id } = req.params;

    const teacher = await this.teacherService.getTeacherById(Number(id));
    if (!teacher) {
      return sendErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, "Teacher Not Found");
    }

    await this.teacherService.deleteTeacher(Number(id));
    return sendResponse(res, HTTP_STATUS_CODE.OK, null, "Teacher deleted successfully");
  }
}