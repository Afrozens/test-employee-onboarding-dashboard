'use client';

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
                <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
