'use client';

import { useState } from "react";

import EmployeeService from "@/services/EmployeeService";
import columnEmployee from "../columns/Employee";
import TemplateDatatable from "./TemplateDatatable";
import usePaginate from "@/hooks/usePaginate";
import FieldInput from "../commons/field/FieldInput";
import ButtonPrimary from "../commons/buttons/ButtonPrimary";
import FieldSelect from "../commons/field/FieldSelect";
import { countryOptions, departmentOptions } from "@/stub/data";
import StructuredModal from "../general/StructureModal";
import useOpen from "@/hooks/useOpen";
import EmployeeForm from "../form/EmployeeForm";

const ContainerHome = () => {
    const employeeService = new EmployeeService();
    const column = columnEmployee();
    const sortableColumns = ['name', 'monthlySalary', 'entryDate'];
    const { handleFilter, filter, debouncedFilter } = usePaginate();
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const { isOpen, onClose, onOpen } = useOpen();
    
    const combinedOptions = [
        ...selectedDepartments,
        ...selectedCountries
    ];

    const handleDepartmentChange = (values: string | string[] | null) => {
        setSelectedDepartments(Array.isArray(values) ? values : values ? [values] : []);
    };

    const handleCountryChange = (values: string | string[] | null) => {
        setSelectedCountries(Array.isArray(values) ? values : values ? [values] : []);
    };

    return (
        <>
            <header className="w-full flex justify-end gap-5 mt-10 px-10 items-center">
                <div className="w-full flex gap-4 max-w-3xl">
                <FieldSelect
                    label="Department"
                    name="department"
                    id="department"
                    options={departmentOptions}
                    onChange={handleDepartmentChange}
                    isMultiple
                />
                <FieldSelect
                    label="Country"
                    name="country"
                    id="country"
                    options={countryOptions}
                    onChange={handleCountryChange}
                    isMultiple
                />
                </div>
                <FieldInput 
                    label="filter"
                    classAditional="max-w-xs"
                    name="filter"
                    id="filter"
                    onChange={(e) => handleFilter(e.target.value)}
                    value={filter}
                />
                <ButtonPrimary type="button" onClick={onOpen}>
                    Create Employee
                </ButtonPrimary>
            </header>
            <TemplateDatatable
                columns={column}
                sortableColumns={sortableColumns}
                option={combinedOptions}
                classService={employeeService.employeePaginate}
                name='employees'
                filter={debouncedFilter}
                withCache
            />

            <StructuredModal classAditional="max-w-none xl:w-96" onClose={onClose} show={isOpen}>
                <EmployeeForm onClose={onClose} action='create' />
            </StructuredModal>
        </>
  )
}

export default ContainerHome
