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
    'corp.com',
    'company.es',
    'empresa.com',
    'business.com',
    'tech.corp',
    'solutions.es'
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
        id: faker.word.sample(),
        name: `${firstName}`,
        email: `${firstName.toLowerCase()}.@${domain}`,
        department: faker.helpers.arrayElement(['HR', 'Engineering', 'Sales', 'Operations']),
        monthlySalary: faker.number.float({ min: 800, max: 10000, fractionDigits: 2 }),
        country: faker.helpers.arrayElement(countries),
        entryDate: faker.date.between({ from: '2020-01-01', to: '2024-01-01' }).toISOString().split('T')[0]
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