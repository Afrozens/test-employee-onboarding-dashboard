'use client';

import EmployeeService from "@/services/EmployeeService";
import columnEmployee from "../columns/Employee";
import TemplateDatatable from "./TemplateDatatable";
import usePaginate from "@/hooks/usePaginate";
import FieldInput from "../commons/field/FieldInput";
import ButtonPrimary from "../commons/buttons/ButtonPrimary";

const ContainerHome = () => {
    const employeeService = new EmployeeService();
    const column = columnEmployee();
    const sortableColumns = ['name', 'monthlySalary', 'entryDate'];
    const { handleFilter, filter, debouncedFilter } = usePaginate();

    return (
        <>
            <header className="w-full flex justify-end gap-5 mt-10 px-10 items-center ">
                <FieldInput 
                    label="filter"
                    classAditional="max-w-xs"
                    name="filter"
                    id="filter"
                    onChange={(e) => handleFilter(e.target.value)}
                    value={filter}
                />
                <ButtonPrimary type="button">
                    Create Employee
                </ButtonPrimary>
            </header>
            <TemplateDatatable
            columns={column}
            sortableColumns={sortableColumns}
            classService={employeeService.employeePaginate}
            name='employees'
            filter={debouncedFilter}
            
            withCache
            />
        </>
  )
}

export default ContainerHome
