import { z, ZodError } from 'zod';

// Define Zod schema for the Student model
const studentValidationSchema = z.object({
    id: z.string(),
    password: z.string(),
    name: z.object({
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
    }),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddres: z.string(),
    guardian: z.object({
        fatherName: z.string(),
        fatherOccupation: z.string(),
        fatherContactNo: z.string(),
        motherName: z.string(),
        motherOccupation: z.string(),
        motherContactNo: z.string(),
    }),
    localGuardian: z.object({
        name: z.string(),
        occupation: z.string(),
        contactNo: z.string(),
        address: z.string(),
    }),
    profileImg: z.string(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean().default(false)
});

export default studentValidationSchema