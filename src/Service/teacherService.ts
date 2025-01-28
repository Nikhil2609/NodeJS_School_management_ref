import { Teacher } from "../Utility/Interface/teacher";
import TeacherRepository from "../Repository/teacherRepository";

export default class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor(teacherService: TeacherRepository) {
    this.teacherRepository = teacherService;
  }

  getAllTeachers = async (): Promise<Teacher[]> => {
    return this.teacherRepository.findAll();
  }

  getTeacherById = async (id: number): Promise<Teacher | undefined> => {
    return this.teacherRepository.findById(id);
  }

  createTeacher = async (data: Teacher): Promise<Teacher> => {
    return this.teacherRepository.create(data);
  }

  updateTeacher = async (id: number, data: Teacher): Promise<Teacher | undefined> => {
    return this.teacherRepository.update(id, data);
  }

  deleteTeacher = async (id: number): Promise<boolean> => {
    return this.teacherRepository.delete(id);
  }
}
