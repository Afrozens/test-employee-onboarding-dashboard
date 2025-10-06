'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import ButtonPrimary from "../commons/buttons/ButtonPrimary";
import FieldInput from "../commons/field/FieldInput";
import { Schema, schema } from "@/models/schemas/employee";
import useSubmit from "@/hooks/useSubmit";
import FieldSelect from "../commons/field/FieldSelect";
import { countryOptions, departmentOptions } from "@/stub/data";
import FieldDatePicker from "../commons/field/FieldDatePicker";
import EmployeeService from "@/services/EmployeeService";
import useEmail from "@/hooks/useEmail";
import { Employee } from "@/models/employee";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

interface Props {
    onClose: () => void;
    action: 'create' | 'edit'
    record?: Employee
}

const EmployeeForm = ({ action, onClose, record }: Props) => {
    const employeeService = new EmployeeService();
    const form = useForm<Schema>({
        mode: 'onChange',
        resolver: zodResolver(schema),
    });
    
    const { handleSubmit, control, watch, reset, setError, clearErrors, formState: { errors, isValid }, register } = form;
    
    const queryClient = useQueryClient();
    const { dataEmail, isLoadingEmail } = useEmail(watch('email'), errors.email?.message, record?.email);
    const { isLoading, doSubmit } = useSubmit<Partial<Employee>, void>();
    const saveService = action === 'create' ? employeeService.createEmployee : employeeService.editEmployee;

    const { markAsSubmitted, initializeWithData } = useAutoSaveForm({
        form,
        action,
        recordId: record?.id
    });

    useEffect(() => {
        if (record) {
            const formData = {
                ...record,
                entryDate: new Date(record.entryDate),
                monthlySalary: String(record.monthlySalary)
            };
            reset(formData);
        }
    }, [record, initializeWithData]);

    useEffect(() => {
        if (typeof dataEmail === 'boolean') {
            if (!dataEmail) {
                setError('email', {
                    type: 'manual',
                    message: 'Email is already in use. Please choose a different one.'
                });
            } else {
                clearErrors('email');
            }
        }
    }, [dataEmail]);
    
    const onSubmit: SubmitHandler<Schema> = async data => {
        markAsSubmitted();
        
        clearErrors();
        await doSubmit({ data, callback: saveService, id: record?.id });
        await queryClient.invalidateQueries({ queryKey: ['paginate-employees'] });
        if (action === 'edit') {
            await queryClient.invalidateQueries({ queryKey: ['employee', record?.id] });
        }
        toast.success(`Employee ${action === 'create' ? 'created' : 'edited'} successfully`);
        reset();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-initial mt-5 w-full max-w-xl">
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-600 text-sm">
                    💾 Your progress is automatically saved every 30 seconds.
                </p>
            </div>

            <FieldInput 
                name="name"
                label="Full Name"
                register={register}
                error={errors.name?.message as string}
                isRequired
                placeholder="John Doe"
                id="name"
            />
            <div className="w-full flex-col gap-4">
                <FieldInput
                    label={'email'}
                    type="email"
                    id="email"
                    name="email"
                    error={errors.email?.message as string}
                    register={register}
                    rules={{
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                    }}
                    isRequired
                    placeholder="correo@empresa.com"
                />
                {isLoadingEmail ? (
                    <div className="flex gap-2 mt-2">
                        <LoadingOutlined className="text-xl" />
                        <p className="text-sm">Check email...</p>
                    </div>
                ) : dataEmail ? (
                    <p className="text-green-500 text-sm mt-1">
                        ✓ Email is available
                    </p>
                ) : null}
            </div>
            <FieldInput 
                label="Monthly Salary"
                type="number"
                name="monthlySalary"
                id="monthlySalary"
                placeholder="800 - 10,000"
                register={register}
                error={errors.monthlySalary?.message as string}
                isRequired
            />
            <Controller 
                name="entryDate"
                control={control}
                render={({ field }) => (
                    <FieldDatePicker 
                        label="Entry Date"
                        id="entryDate"
                        value={field.value}
                        error={errors.entryDate?.message as string}
                        field={field}
                    />
                )}
            />
            <Controller 
                name="country"
                control={control}
                render={({ field }) => (
                    <FieldSelect 
                        name="country"
                        label="Country"
                        id="country"
                        defaultValue={field.value}
                        options={countryOptions}
                        error={errors.country?.message as string}
                        isRequired
                        field={field}
                        isMultiple={false}
                    />
                )}
            />
            <Controller 
                name="department"
                control={control}
                render={({ field }) => (
                    <FieldSelect 
                        name="department"
                        label="Department"
                        id="department"
                        defaultValue={field.value}
                        options={departmentOptions}
                        error={errors.department?.message as string}
                        isRequired
                        field={field}
                        isMultiple={false}
                    />
                )}
            />

            <div className="w-full flex justify-center items-center">
                <ButtonPrimary disabled={!isValid} type="submit" loading={isLoading}>
                    <span className="capitalize">
                        {action} Employee
                    </span>
                </ButtonPrimary>
            </div>
        </form>
    );
};

export default EmployeeForm;