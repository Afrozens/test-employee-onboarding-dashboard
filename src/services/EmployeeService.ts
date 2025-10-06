import { Employee } from '@/models/employee';
import { Paginate } from '@/models/common';
import { formatDateToYYYYMMDD } from '@/utils/datetime';

/**
 * Service class for handling employee-related operations including:
 * - Paginated employee data retrieval
 * - Global filter and multi-select filtering
 */
class EmployeeService {
    /**
     * Verifies if an email is available (not already in use)
     * @param {string} email - Email to verify
     * @returns {Promise<boolean>} True if email is available, false if already in use
     * @throws {Error} When the request fails
     */
    async employeeEmailVerifiy(email: string): Promise<boolean> {
        try {
            const delay = Math.random() * 400 + 100;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const allEmployees: Employee[] = JSON.parse(localStorage.getItem('data-stub') || '[]') as Employee[];
            
            const emailExists = allEmployees.some(employee => 
                employee.email.toLowerCase() === email.toLowerCase()
            );
            
            return !emailExists;
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }

    /**
     * Creates a new employee
     * @param {Omit<Employee, 'id'>} data - Employee data without ID
     * @returns {Promise<Employee>} The created employee with generated ID
     * @throws {Error} When the creation fails
     */
    async createEmployee(data: Partial<Employee>): Promise<void> {
        try {
            const delay = Math.random() * 500 + 100;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const allEmployees: Employee[] = JSON.parse(localStorage.getItem('data-stub') || '[]') as Employee[];

            const newEmployee = {
                ...data,
                entryDate: formatDateToYYYYMMDD(data.entryDate),
                id: `emp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            };
            
            const updatedEmployees = [newEmployee, ...allEmployees];
            
            localStorage.setItem('data-stub', JSON.stringify(updatedEmployees));
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    }

    /**
     * Updates an existing employee
     * @param {string} id - Employee ID to update
     * @param {Partial<Employee>} employeeData - Partial employee data to update
     * @returns {Promise<Employee>} The updated employee
     * @throws {Error} When the update fails or employee is not found
     */
    async editEmployee(data: Partial<Employee>, id?: string | undefined): Promise<void> {
        try {
            const delay = Math.random() * 500 + 100;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const allEmployees: Employee[] = JSON.parse(localStorage.getItem('data-stub') || '[]') as Employee[];
            
            const employeeIndex = allEmployees.findIndex(employee => employee.id === id);
            
            if (employeeIndex === -1) {
                throw new Error(`Employee with ID ${id} not found`);
            }
            
            const updatedEmployee: Employee = {
                ...allEmployees[employeeIndex],
                ...data,
                id: allEmployees[employeeIndex].id,
            };
            
            const updatedEmployees = [...allEmployees];
            updatedEmployees[employeeIndex] = updatedEmployee;
            
            localStorage.setItem('data-stub', JSON.stringify(updatedEmployees));
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    }

    /**
     * Retrieves paginated employee data with global filter and multi-select filtering
     * @param {number} page - Current page number (default: 1)
     * @param {number} limit - Number of items per page (default: 10)
     * @param {string} filter - Global filter term for name, email, or department
     * @param {string[]} options - Array of selected departments and countries
     * @returns {Promise<Paginate<Employee>>} Paginated response with employee data
     * @throws {Error} When the request fails
     */
    async employeePaginate(
        page: number = 1,
        limit: number = 10,
        filter: string | undefined = '',
        options: string[] = [],
        sortField?: string,
        sortOrder?: 'ascend' | 'descend',
    ): Promise<Paginate<Employee>> {
        try {
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 500));
            
            const allEmployees: Employee[] = JSON.parse(localStorage.getItem('data-stub')!) as Employee[];
            
            let filteredEmployees = allEmployees.filter(employee => {
                const matchesFilter = !filter || filter.trim() === '' || 
                    employee.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
                    employee.email.toLowerCase().includes(filter.toLowerCase().trim()) ||
                    employee.department.toLowerCase().includes(filter.toLowerCase().trim()) ||
                    employee.country.toLowerCase().includes(filter.toLowerCase().trim());

                const matchesOptions = options.length === 0 ||
                    options.includes(employee.department) ||
                    options.includes(employee.country);

                return matchesFilter && matchesOptions;
            });


            if (sortField && sortOrder) {
                filteredEmployees = filteredEmployees.sort((a, b) => {
                const aValue = a[sortField as keyof Employee];
                const bValue = b[sortField as keyof Employee];
                
                if (sortOrder === 'ascend') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
                });
            }

            const totalRecord = filteredEmployees.length;
            const totalPages = Math.ceil(totalRecord / limit);
            const currentPage = Math.max(1, Math.min(page, totalPages));
            const startIndex = (currentPage - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedData = filteredEmployees.slice(startIndex, endIndex);

            return {
                pageNumber: currentPage,
                pageSize: limit,
                totalPages: totalPages,
                totalRecord: totalRecord,
                data: paginatedData
            };

        } catch (error) {
            throw error;
        }
    }
}

export default EmployeeService;