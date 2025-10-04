export type typeDepartament = 'HR' | 'Engineering' | 'Sales' | 'Operations';
export type typeCountry = 'El Salvador' | 'Guatemala' | 'Honduras' | 'Costa Rica' | 'Panamá';

export interface Employee {
    id: string;
    name: string;
    email: string
    departament: typeDepartament;
    monthlySalary: number;
    country: string;
    entryDate: string;
}