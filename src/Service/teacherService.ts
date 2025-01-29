import { Teacher } from "../Utility/Interface/teacher";
import TeacherRepository from "../Repository/teacherRepository";
import { TeacherModal } from "../Modal/Teacher";

export default class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor(teacherService: TeacherRepository) {
    this.teacherRepository = teacherService;
  }

  getAllTeachers = async (): Promise<TeacherModal[]> => {
    return this.teacherRepository.getAllTeachers();
  }

  getTeacherById = async (id: number): Promise<TeacherModal | null> => {
    return this.teacherRepository.getTeacherById(id);
  }

  createTeacher = async (data: TeacherModal): Promise<TeacherModal> => {
    return this.teacherRepository.createTeacher(data);
  }

  updateTeacher = async (id: number, data: TeacherModal): Promise<[number]> => {
    return this.teacherRepository.updateTeacher(id, data);
  }

  deleteTeacher = async (id: number): Promise<number> => {
    return this.teacherRepository.deleteTeacher(id);
  }
}
