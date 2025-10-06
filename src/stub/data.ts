import { faker } from "@faker-js/faker";

import { User } from "@/models/user";
import { Employee, typeCountry } from "@/models/employee";

export const stubUser: User = {
    id: 'asjdlkjsdlkasjdlkadjslkajsd',
    name: 'John Doe',
    email: 'admin@rebuhr.com',
    role: 'admin'
}

export const corporateDomains = [
    'empresa.com',
];

const countries: typeCountry[] = [
    'el salvador',
    'guatemala', 
    'honduras',
    'costa rica',
    'panamá'
];

export const generateEmployee = (): Employee => {
    const firstName = faker.person.firstName();
    const domain = faker.helpers.arrayElement(corporateDomains);
    
    return {
        id: `emp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name: `${firstName}`,
        email: `${firstName.toLowerCase()}-${faker.word.verb()}@${domain}`,
        department: faker.helpers.arrayElement(['HR', 'Engineering', 'Sales', 'Operations']),
        monthlySalary: faker.number.float({ min: 800, max: 10000, fractionDigits: 0 }),
        country: faker.helpers.arrayElement(countries),
        entryDate: faker.date.between({ from: '2025-11-14', to: '2026-01-01' })
    };
};

export const generateEmployees = (count: number): Employee[] => {
    return Array.from({ length: count }, (_, index) => generateEmployee());
};

export const departmentOptions = [
    {
        label: "HR",
        value: "HR",
    },
    {
        label: 'Engineering',
        value: 'Engineering'
    },
    {
        label: 'Sales',
        value: 'Sales'
    },
    {
        label: 'Operations',
        value: 'Operations'
    }
]

export const countryOptions = [
    {
        label: 'El Salvador',
        value: 'el salvador'
    },
    {
        label: 'Guatemala',
        value: 'guatemala'
    },
    {
        label: 'Honduras',
        value: 'honduras'
    },
    {
        label: 'Costa Rica',
        value: 'costa rica'
    },
    {
        label: 'Panamá',
        value: 'panamá'
    },
];