import { Teacher, teachers } from "../Utility/Interface/teacher";

export default class TeacherRepository {
  constructor() {
  }

  findAll = async (): Promise<Teacher[]> => {
    return teachers;
  }

  findById = async (id: number): Promise<Teacher | undefined> => {
    return teachers.find((teacher) => teacher.id === id);
  }

  create = async (data: Teacher): Promise<Teacher> => {
    const newTeacher = { ...data, id: teachers.length + 1 };
    teachers.push(newTeacher);
    return newTeacher;
  }

  update = async (id: number, data: Partial<Teacher>): Promise<Teacher | undefined> => {
    const index = teachers.findIndex((teacher) => teacher.id === id);
    if (index === -1) return undefined;

    teachers[index] = { ...teachers[index], ...data };
    return teachers[index];
  }

  delete = async (id: number): Promise<boolean> => {
    const index = teachers.findIndex((teacher) => teacher.id === id);
    if (index === -1) return false;

    teachers.splice(index, 1);
    return true;
  }
}
