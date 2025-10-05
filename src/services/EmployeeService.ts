import { Employee } from '@/models/employee';
import { Paginate } from '@/models/common';
import employeesData from '@/stub/employee.json';

/**
 * Service class for handling employee-related operations including:
 * - Paginated employee data retrieval
 * - Global filter and multi-select filtering
 */
class EmployeeService {
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
            
            const allEmployees: Employee[] = employeesData as Employee[];
            
            let filteredEmployees = allEmployees.filter(employee => {
                const matchesFilter = !filter || filter.trim() === '' || 
                    employee.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
                    employee.email.toLowerCase().includes(filter.toLowerCase().trim()) ||
                    employee.departament.toLowerCase().includes(filter.toLowerCase().trim()) ||
                    employee.country.toLowerCase().includes(filter.toLowerCase().trim());

                const matchesOptions = options.length === 0 ||
                    options.includes(employee.departament) ||
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