import { User } from "@/models/user";
import MenuAuth from "./MenuAuth";

interface Props {
    user: User
}

const Header = ({ user }: Props) => {
    return (
    <header className="w-full">
        <nav className="bg-gray-50 border border-gray-200 px-4 lg:px-6 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="https://flowbite.com" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap ">Employees</span>
                </a>
                <div className="flex items-center lg:order-2">
                    <MenuAuth user={user} />
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
