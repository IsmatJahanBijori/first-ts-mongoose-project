import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.zod.validation';
// import Joi from "joi"
//joi in this controller
// import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {

    // //joi
    // // Define Joi schema for the Student model
    // const studentSchema = Joi.object({
    //   id: Joi.string().required(),
    //   name: Joi.object({
    //     firstName: Joi.string().required().messages({
    //       'string.base': 'First name must be a string.',
    //       'any.required': 'First name is required.',
    //     }),
    //     middleName: Joi.string(),
    //     lastName: Joi.string().required().messages({
    //       'string.base': 'Last name must be a string.',
    //       'any.required': 'Last name is required.',
    //     }),
    //   }).required(),
    //   gender: Joi.string().valid('male', 'female', 'others').required().messages({
    //     'string.base': 'Gender must be a string.',
    //     'any.only': 'Invalid gender value.',
    //     'any.required': 'Gender is required.',
    //   }),
    //   dateOfBirth: Joi.string(),
    //   email: Joi.string().email().required().messages({
    //     'string.base': 'Email must be a string.',
    //     'string.email': 'Invalid email address.',
    //     'any.required': 'Email is required.',
    //   }),
    //   contactNo: Joi.string().required().messages({
    //     'string.base': 'Contact number must be a string.',
    //     'any.required': 'Contact number is required.',
    //   }),
    //   emergencyContactNo: Joi.string().required().messages({
    //     'string.base': 'Emergency contact number must be a string.',
    //     'any.required': 'Emergency contact number is required.',
    //   }),
    //   bloogGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().messages({
    //     'string.base': 'Blood group must be a string.',
    //     'any.only': 'Invalid blood group value.',
    //     'any.required': 'Blood group is required.',
    //   }),
    //   presentAddress: Joi.string().required().messages({
    //     'string.base': 'Present address must be a string.',
    //     'any.required': 'Present address is required.',
    //   }),
    //   permanentAddres: Joi.string().required().messages({
    //     'string.base': 'Permanent address must be a string.',
    //     'any.required': 'Permanent address is required.',
    //   }),
    //   guardian: Joi.object().keys({
    //     fatherName: Joi.string().required(),
    //     fatherOccupation: Joi.string().required(),
    //     fatherContactNo: Joi.string().required(),
    //     motherName: Joi.string().required(),
    //     motherOccupation: Joi.string().required(),
    //     motherContactNo: Joi.string().required(),
    //   }).required(),
    //   localGuardian: Joi.object().keys({
    //     name: Joi.string().required(),
    //     occupation: Joi.string().required(),
    //     contactNo: Joi.string().required(),
    //     address: Joi.string().required(),
    //   }).required(),
    //   profileImg: Joi.string(),
    //   isActive: Joi.string().valid('active', 'blocked').default('active'),
    // });






    const { student: studentData } = req.body;
    //name alias

    //joi
    // const { error, value } = studentValidationSchema.validate(studentData)
    // console.log({ error }, { value })


    //zod
    const zodParsedData = studentValidationSchema.parse(studentData)


    //will call service function to call this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    //send data


    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details
    //   })
    // }


    // //will call service function to call this data
    // const result = await StudentServices.createStudentIntoDB(studentData);
    // //send data
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err
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
