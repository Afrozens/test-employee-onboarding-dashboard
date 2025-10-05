import { z } from 'zod';

const schema = z.object({
    name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .describe("Name (validation: minimum 3 characters)"),
    
    email: z.email("Must be a valid email")
    .refine(email => email.endsWith('@empresa.com'), {
      message: "Email must have @empresa.com domain"
    })
    .describe("Corporate email (validation: email format + @empresa.com domain)"),
    
    department: z.enum(['Engineering', 'Sales', 'HR', 'Operations'])
        .describe("Department (select: Engineering, Sales, HR, Operations)"),
        
    entryDate: z.date()
        .refine((dateStr) => {
                const date = new Date(dateStr);
                return date >= new Date();
            }, {
                message: "Hire date cannot be earlier than today"
            })
        .describe("Hire date (date picker, cannot be earlier than today)"),
        
    monthlySalary: z.string()
        .refine((salaryStr) => {
            const salary = Number(salaryStr);
            return !isNaN(salary) && salary >= 800 && salary <= 10000;
        }, {
            message: "Salary must be a valid number between $800 and $10,000"
        })
        .describe("Monthly salary (number, validation: between $800 and $10,000)"),
        
    country: z.enum(['el salvador', 'guatemala', 'honduras', 'costa rica', 'panamá'])
        .describe("Country (select: El Salvador, Guatemala, Honduras, Costa Rica, Panama)")
});

type Schema = z.infer<typeof schema>;

export { type Schema, schema };