import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent, StudentModel,   //Student interface theke Schema akare
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from "bcrypt"
import config from '../../config';
// import config from '../../config';

// Custom validator function for capitalization
const capitalizeFirstLetter = (value: string) => {
  if (typeof value !== 'string') {
    throw new Error('Invalid input. Must be a string.');
  }
  const values = value.charAt(0).toUpperCase() + value.slice(1)
  // Capitalize the first letter
  return values === value;
};


//2. create a schema based on the mongoose
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required."],
    validate: {
      validator: capitalizeFirstLetter,
      message: '{VALUE} name must start with a capital letter.',
    },   //custom validator
  },
  middleName: {
    type: String,

  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    validate: {
      validator: (value: string) => {
        return validator.isAlpha(value)
      },
      message: "{VALUE} is not valid"
    }
  },
});


//built in validator : trim, unique, required, 
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});


//agei chilo but custom methods waise (iv).
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: [true, "Password is required"], unique: true, maxlength: [20, "Can not be more than 20"] },
  name: {
    type: userNameSchema,
    trim: true,   //age pore space delete korar jonne
    required: [true, "Student's name is required."],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "{VALUE} is not a valid gender.",
    },
    required: [true, "Student's gender is required."],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not valid"
    }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: "{VALUE} can't be as blood group"
    },
    required: true,
  }, //enum
  presentAddress: { type: String, required: true, },
  permanentAddres: { type: String, required: true, },
  guardian: { type: guardianSchema, required: true, },
  localGuardian: { type: localGuardianSchema, required: true, },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  },
});

//creating a custom static method
//c.
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUSer = await Student.findOne({ id })
  return existingUSer
}



//v. creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUSer = await Student.findOne({ id })
//   return existingUSer;
// }



// pre save middleware/ hook : will work on create()  save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//vi.
// 3. create a model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);



