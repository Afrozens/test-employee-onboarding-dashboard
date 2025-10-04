import { Employee } from '@/models/employee';
import { FilterOptions, Paginate } from '@/models/common';
import employeesData from '@/stub/employee.json';

/**
 * Service class for handling employee-related operations including:
 * - Paginated employee data retrieval
 * - Global search and multi-select filtering
 */
class EmployeeService {
    /**
     * Retrieves paginated employee data with global search and multi-select filtering
     * @param {number} page - Current page number (default: 1)
     * @param {number} limit - Number of items per page (default: 10)
     * @param {string} search - Global search term for name, email, or department
     * @param {FilterOptions} filters - Multi-select filters for department and country
     * @returns {Promise<Paginate<Employee>>} Paginated response with employee data
     * @throws {Error} When the request fails
     */
    async EmployeePaginate(
        page: number = 1,
        limit: number = 10,
        search: string | undefined = '',
        filters: FilterOptions = {}
    ): Promise<Paginate<Employee>> {
        try {
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 500));
            
            const allEmployees: Employee[] = employeesData as Employee[];
            
            let filteredEmployees = allEmployees.filter(employee => {
                const matchesSearch = !search || search.trim() === '' || 
                    employee.name.toLowerCase().includes(search.toLowerCase().trim()) ||
                    employee.email.toLowerCase().includes(search.toLowerCase().trim()) ||
                    employee.departament.toLowerCase().includes(search.toLowerCase().trim()) ||
                    employee.country.toLowerCase().includes(search.toLowerCase().trim());

                const matchesDepartments = !filters.departments || filters.departments.length === 0 ||
                    filters.departments.includes(employee.departament);

                const matchesCountries = !filters.countries || filters.countries.length === 0 ||
                    filters.countries.includes(employee.country);

                return matchesSearch && matchesDepartments && matchesCountries;
            });

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