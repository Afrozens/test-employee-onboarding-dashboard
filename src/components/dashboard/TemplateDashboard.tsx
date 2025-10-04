'use client';

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./Header";
import { User } from "@/models/user";

interface Props extends PropsWithChildren {
    user: User;
}

const TemplateDashboard = ({ children, user }: Props) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Header user={user} />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  )
}

export default TemplateDashboard
