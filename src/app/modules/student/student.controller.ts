import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //name alias
    //will call service function to call this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    //send data
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student found successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getOneStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getOneStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'One Student found successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getOneStudent,
};
