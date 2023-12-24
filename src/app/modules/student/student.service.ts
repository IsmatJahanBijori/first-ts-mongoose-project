// import { Request, Response } from "express";
import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);   //built in static method


  //custom static methods
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("already exists")
  }
  const result = await Student.create(studentData);


  // const student = new Student(studentData) //create an instance method

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists")
  // }


  // const result = await student.save() //built in instance method


  return result; //return kora result controller e chole jabej
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getOneStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getOneStudentFromDB,
};
