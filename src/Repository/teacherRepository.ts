import { InferCreationAttributes } from "sequelize";
import { TeacherModal } from "../Modal/Teacher"

export default class TeacherRepository {
  constructor() {
  }
  // Create a new teacher
  createTeacher = async (data: Partial<TeacherModal>) => {
    const teacher = await TeacherModal.create(data);
    return teacher;
  }

  // Get all teachers
  getAllTeachers = async () => {
    return await TeacherModal.findAll();
  }

  // Get a teacher by ID
  getTeacherById = async (id: number) => {
    const teacher = await TeacherModal.findByPk(id);
    return teacher;
  }

  // Update a teacher
  updateTeacher = async (id: number, data: TeacherModal) => {
    return await TeacherModal.update(data, { where: { id } });
  }

  // Delete a teacher
  deleteTeacher = async (id: number) => {
    return await TeacherModal.destroy({ where: { id } });
  }
}
