import { cookies } from "next/headers";

import Header from "@/components/dashboard/Header";
import { User } from "@/models/user";
import UserService from "@/services/UserService";
import { AuthenticatedCookies } from "@/utils/auth";
import Custom404 from "@/components/general/404";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const userService = new UserService();
    const cookieStore = cookies();
    const token = cookieStore.get(AuthenticatedCookies.ACCESS)?.value
    let user: User | null = null

    const handleAuth = async () => {
        try {
            if (!token) throw new Error('token-not-found')
            const data = await userService.userMe(token)
            user = data
        } catch (error) {
            console.error('Auth error:', error);
            throw new Error(`Authentication failed - Server Error: ${error}`);
        }
    }

    await handleAuth();

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