import { NextFunction, Request, Response } from "express";
import TeacherService from "../Service/teacherService";
import { sendResponse } from "../Utility/Responsehelper";
import { HTTP_STATUS_CODE } from "../Utility/Enum";

export default class TeacherController {
  private teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  getAllTeachers = async (req: Request, res: Response) => {
    const teachers = await this.teacherService.getAllTeachers();
    return sendResponse(res, HTTP_STATUS_CODE.OK, teachers, "Teachers fetched successfully");
  }

  getTeacherById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teacher = await this.teacherService.getTeacherById(Number(id));

    if (!teacher) {
      return sendResponse(res, HTTP_STATUS_CODE.NOTFOUND, null, "", "Teacher not found");
    }

    return sendResponse(res, HTTP_STATUS_CODE.OK, teacher, "Teacher fetched successfully");
  }

  createTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await this.teacherService.createTeacher(req.body);
    console.log("user=>", (req as any).user)
    // throw new Error("Please enter valid input parameter");
    return sendResponse(res, HTTP_STATUS_CODE.CREATED, { teacher, user: (req as any).user }, "Teacher created successfully");
  }

  updateTeacher = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTeacher = await this.teacherService.updateTeacher(Number(id), req.body);

    if (!updatedTeacher) {
      return sendResponse(res, HTTP_STATUS_CODE.NOTFOUND, null, "Teacher not found", "");
    }

    return sendResponse(res, HTTP_STATUS_CODE.OK, updatedTeacher, "Teacher updated successfully");
  }

  deleteTeacher = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDeleted = await this.teacherService.deleteTeacher(Number(id));

    if (!isDeleted) {
      return sendResponse(res, HTTP_STATUS_CODE.NOTFOUND, null, "Teacher not found", "");;
    }
    return sendResponse(res, HTTP_STATUS_CODE.OK, null, "Teacher deleted successfully");
  }
}