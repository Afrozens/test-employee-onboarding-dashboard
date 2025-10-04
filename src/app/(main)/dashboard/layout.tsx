import { cookies } from "next/headers";

import Header from "@/components/dashboard/Header";
import { User } from "@/models/user";
import UserService from "@/services/UserService";
import { AuthenticatedCookies } from "@/utils/auth";
import Custom404 from "@/components/general/404";
import { handleAuthUserMe } from "@/app/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const userService = new UserService();
    const cookieStore = cookies();
    const token = cookieStore.get(AuthenticatedCookies.ACCESS)?.value
    let user: User | null = null

    user = await handleAuthUserMe(token)

    return (
        <>
            {!user ? (
                <Custom404 />
            ) : (
            <>
                <Header user={user} />
                {children}
            </>
            )}
        </>
    );
}