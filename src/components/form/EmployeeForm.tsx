'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

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
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    onClose: () => void;
    action: 'create' | 'edit'
    id?: string;
}

const EmployeeForm = ({ action, onClose, id }: Props) => {
    const employeeService = new EmployeeService();
    const { handleSubmit, control, watch, setError, clearErrors, formState: { errors, isValid }, register} = useForm<Schema>({
        mode: 'onChange',
        resolver: zodResolver(schema),
    });
    const queryClient = useQueryClient();
    const { dataEmail, isLoadingEmail } = useEmail(watch('email'), errors.email?.message);
    const { isLoading, doSubmit } = useSubmit<Partial<Employee>, void>();
    const saveService = action === 'create' ? employeeService.createEmployee : employeeService.editEmployee

    useEffect(() => {
          if (typeof dataEmail === 'boolean') {
            if (!dataEmail) {
              setError('email', {
                    type: 'manual',
                    message: 'Email is already in use. Please choose a different one.'
              });
            } else {
              clearErrors('email')
            }
          }
    }, [dataEmail])
    
    const onSubmit: SubmitHandler<Schema> = async data => {
      clearErrors();
      onClose();
      await doSubmit({data, callback: saveService, id})
      await queryClient.invalidateQueries({ queryKey: ['paginate-employees'] });
      toast.success(`Employee ${action === 'create' ? 'created' : 'edited'} successfully`)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-initial mt-5 w-full max-w-xl">
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
        placeholder="Correo@example.com"
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
    )
}

export default EmployeeForm
