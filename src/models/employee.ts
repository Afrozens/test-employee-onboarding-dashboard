export type typedepartment = 'HR' | 'Engineering' | 'Sales' | 'Operations';
export type typeCountry = 'el salvador' | 'guatemala' | 'honduras' | 'costa rica' | 'panamá';

export interface Employee {
    id: string;
    name: string;
    email: string
    department: typedepartment;
    monthlySalary: number;
    country: typeCountry;
    entryDate: string;
}