'use client';

import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import EmployeeService from "@/services/EmployeeService";
import Custom404 from "../general/404";
import Loader from "../general/Loader";
import ButtonPrimary from "../commons/buttons/ButtonPrimary";
import useOpen from "@/hooks/useOpen";
import StructuredModal from "../general/StructureModal";
import EmployeeForm from "../form/EmployeeForm";
import AvatarGenerate from "./AvatarGenerate";

interface Props {
    id: string;
}

const ContainerEmployee = ({ id }: Props) => {
    const employeeService = new EmployeeService();
    const { isOpen, onClose, onOpen} = useOpen();
    const { data, status, error } = useQuery({
        queryKey: ['employee', id],
        queryFn: async () => await employeeService.getEmployee(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });
    const router = useRouter();

    if (status === 'pending') return <Loader />
    if (error) return <Custom404 />

    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Employee Details</h1>
                    <div className="flex gap-3">
                        <ButtonPrimary onClick={() => router.back()} type="button">
                            Back
                    </ButtonPrimary>
    
                        <ButtonPrimary onClick={onOpen} type="button"
                        >
                            Edit Employee
                        </ButtonPrimary>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                            <AvatarGenerate name={data.name} size={80} />
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">{data.name}</h2>
                                <p className="text-gray-600 mt-1">{data.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {data.department}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {data.country}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Full Name</span>
                                        <span className="text-gray-900 font-semibold">{data.name}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Email</span>
                                        <span className="text-gray-900 font-semibold">{data.email}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Country</span>
                                        <span className="text-gray-900 font-semibold capitalize">{data.country}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Work Information</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Department</span>
                                        <span className="text-gray-900 font-semibold">{data.department}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Monthly Salary</span>
                                        <span className="text-gray-900 font-semibold">
                                            ${typeof data.monthlySalary === 'number' 
                                                ? data.monthlySalary.toLocaleString() 
                                                : data.monthlySalary}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Entry Date</span>
                                        <span className="text-gray-900 font-semibold">
                                            {data.entryDate instanceof Date 
                                                ? data.entryDate.toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : new Date(data.entryDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">data ID</span>
                                <span className="text-gray-500 text-sm font-mono">{data.id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-6 left-6 right-6 md:hidden">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                        <div className="flex gap-3">
                            <Button 
                                block 
                                size="large"
                                className="border-gray-300 text-gray-700"
                            >
                                Back
                            </Button>
                            <Button 
                                block 
                                type="primary" 
                                size="large"
                                className="bg-[#FF5A5F] hover:bg-[#E14B50] border-none"
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <StructuredModal classAditional="max-w-none xl:w-96" onClose={onClose} show={isOpen}>
                <EmployeeForm
                    onClose={onClose}
                    action='edit'
                    record={data}
                />
            </StructuredModal>
        </>
    )
}

export default ContainerEmployee