'use client';

import EmployeeService from "@/services/EmployeeService";
import columnEmployee from "../columns/Employee";
import TemplateDatatable from "./TemplateDatatable";
import usePaginate from "@/hooks/usePaginate";
import FieldInput from "../commons/field/FieldInput";

const ContainerHome = () => {
    const employeeService = new EmployeeService();
    const column = columnEmployee();
    const { handleFilter, filter, debouncedFilter } = usePaginate();

    return (
        <>
            <header className="w-full flex justify-end mt-10 px-10 items-center ">
                <FieldInput 
                    label="filter"
                    classAditional="max-w-xs"
                    name="filter"
                    id="filter"
                    onChange={(e) => handleFilter(e.target.value)}
                    value={filter}
                />
            </header>
            <TemplateDatatable
            columns={column}
            classService={employeeService.employeePaginate}
            name='employees'
            filter={debouncedFilter}
            
            withCache
            />
        </>
  )
}

export default ContainerHome
