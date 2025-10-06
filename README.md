# Employee Onboarding Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Estás construyendo el módulo de onboarding de empleados para nuestro SAAS de HR.
Las empresas cliente necesitan registrar nuevos empleados con información básica
y visualizar el estado de los procesos de onboarding.

## Features

- 🚀 Create Employee
- 📊 Edit Employee
- 🔍 Datatable with list of Employee
- ⚡ Overview of Employee
- 🛡️ Authentication (login, user me in server side)

## Installation

```bash
npm install
```

### Structure
```bash
employee-onboarding-dashboard/
├── src/
│   ├── app/
│   ├── components/
│   ├── fonts/
│   ├── hooks/
│   ├── models/
│   ├── stub/
│   ├── styles/
│   ├── utils/
│   └── middleware.ts/
```

## Dependency
```json
{
  "dependencies": {
    "@ant-design/icons": "^6.1.0",
    "@faker-js/faker": "^10.0.0",
    "@hookform/resolvers": "^5.2.2",
    "@tanstack/react-query": "^5.90.2",
    "antd": "^5.27.4",
    "next": "14.2.33",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.64.0",
    "react-select": "^5.10.2",
    "sonner": "^2.0.7",
    "tailwindcss-animated": "^2.0.0",
    "zod": "^4.1.11"
  },
}
```

## Inspiration of UI
http://flowbite.com

https://ant.design

## Important technical decisions and why
I adopted a feature-oriented structure rather than an entity-oriented one, but with an emphasis on organization and code reuse due to the size of the project. I also reused previously created components to streamline the process.
I used classes in services to take advantage of the syntactic sugar of OOP in JavaScript and to encapsulate services correctly in context.


## Approximate time spent
9 hours

## If you used AI, how and why
I used it to speed up the simulations of all the API requests with the help of AI and indicating the prompt on how to integrate the timeout

Additionally, for the overview UI, indicating that based on a Flowbite template I would integrate a basic overview with Tailwind to display the Employee entity.

## Things you would improve with more time
I would improve the UI in everything related to styles in both pages and components.

I would integrate a test for the draft to save every 30 seconds in the localstorage in the form employee
