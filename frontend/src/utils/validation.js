import { z } from "zod"
export const studentSchema = z.object({
    first_name: z
     .string()
     .trim()
     .min(1, 'First name is required'),
    last_name: z
     .string()
     .trim()
     .min(1, 'Last name is required'),
    major: z
     .string()
     .trim()
     .min(1, 'Major is required'),


    email: z
     .email({ message: 'Invalid email fromat'})
     .trim()
     .min(1, 'Email is required'),
     

    gpa: z
     .string()
     .trim()
     .min(1, 'GPA is required')
     .refine((value) => !Number.isNaN(Number(value)), 'GPA must be a valid number')
     .refine((value) => Number(value) >= 0 && Number(value) <= 100, 'GPA must be between 0 and 100')
     .transform(Number),
})

