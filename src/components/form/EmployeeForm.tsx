'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import ButtonPrimary from "../commons/buttons/ButtonPrimary";
import FieldInput from "../commons/field/FieldInput";
import { Schema, schema } from "@/models/schemas/employee";
import useSubmit from "@/hooks/useSubmit";
import FieldSelect from "../commons/field/FieldSelect";
import { countryOptions, departmentOptions } from "@/stub/data";

interface Props {
    onClose: () => void;
    action: 'create' | 'edit'
}

const EmployeeForm = ({ action, onClose}: Props) => {
    const { handleSubmit, control, formState: { errors, isValid }, register} = useForm<Schema>({
        mode: 'onChange',
        resolver: zodResolver(schema),
    });
    const { isLoading, doSubmit } = useSubmit();
    const onSubmit: SubmitHandler<Schema> = data => {

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
      <FieldInput 
        label="Monthly Salary"
        type="number"
        name="monthlySalary"
        id="monthlySalary"
        register={register}
        error={errors.monthlySalary?.message as string}
        isRequired
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
