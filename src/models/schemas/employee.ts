import { z } from 'zod';

const schema = z.object({
    name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .describe("Name (validation: minimum 3 characters)"),
    
    email: z.string().email("Must be a valid email")
    .refine(email => email.endsWith('@empresa.com'), {
      message: "Email must have @empresa.com domain"
    })
    .describe("Corporate email (validation: email format + @empresa.com domain)"),
    
    department: z.enum(['Engineering', 'Sales', 'HR', 'Operations'])
        .describe("Department (select: Engineering, Sales, HR, Operations)"),
        
    entryDate: z.date()
        .min(new Date(), "Hire date cannot be earlier than today")
        .describe("Hire date (date picker, cannot be earlier than today)"),
        
    monthlySalary: z.coerce.number()
        .min(800, "Minimum salary is $800")
        .max(10000, "Maximum salary is $10,000")
        .describe("Monthly salary (number, validation: between $800 and $10,000)"),
        
    country: z.enum(['el salvador', 'guatemala', 'honduras', 'costa rica', 'panamá'])
        .describe("Country (select: El Salvador, Guatemala, Honduras, Costa Rica, Panama)")
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  name: '',
  email: '',
  department: 'Engineering',
  entryDate: new Date(),
  monthlySalary: 800,
  country: 'el salvador'
};

export { type Schema, schema, defaultValues };