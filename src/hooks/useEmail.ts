import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "./useDebounce";
import EmployeeService from "@/services/EmployeeService";

const useEmail = (email: string, errorEmail: string | undefined) => {
    const employeeService = new EmployeeService();
    const lazyValueEmail = useDebounce(email);
    const hasEmailValidationError = useMemo(() => !!errorEmail, [errorEmail]);
    const isEmailValidForCheck = useMemo(() => 
        !!lazyValueEmail && lazyValueEmail.length > 5 && !hasEmailValidationError,
        [lazyValueEmail, hasEmailValidationError]
    );

    const { data: dataEmail, isLoading: isLoadingEmail } = useQuery({
            queryKey: ['verify-email', lazyValueEmail],
            queryFn: async () =>  await employeeService.employeeEmailVerifiy(lazyValueEmail),
            enabled: isEmailValidForCheck,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 60 * 1000,
            gcTime: 60 * 1000,
    });
    
    return {
        dataEmail,
        isLoadingEmail        
    }
}

export default useEmail;
