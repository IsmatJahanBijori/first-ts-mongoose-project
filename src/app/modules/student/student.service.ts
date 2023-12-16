// import { Request, Response } from "express";
import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result; //return kora result controller e chole jabej
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getOneStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getOneStudentFromDB,
};
