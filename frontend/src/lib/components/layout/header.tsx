"use client";

import Link from "next/link";
import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/shared/assets/logo.png";
import { FiMenu } from "react-icons/fi";

const Header = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setIsLogged(true);
    }, []);

    return (
        <header className="bg-[#080c11] dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-gray-100 dark:text-white"
                    >
                        <div
                            className="inline"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <Image
                                src={Logo}
                                width={150}
                                height={50}
                                alt="logo"
                                unoptimized={true}
                            />
                        </div>
                    </Link>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8 gap-8">
                            <li>
                                <Link
                                    href="/generate"
                                    className="text-gray-200 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white"
                                >
                                    Generate
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/all-memes"
                                    className="text-gray-200 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white"
                                >
                                    Memes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-200 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex justify-between items-center gap-2">
                    <Dropdown
                        showArrow
                        className="w-full bg-[#202f42] shadow-md p-0"
                    >
                        <DropdownTrigger className="cursor-pointer text-lg">
                            Account
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="User actions p-0"
                            className="p-0 w-[150px]"
                        >
                            <DropdownItem key="signin" className="p-0">
                                <Button className="hover:bg-[#16202e] w-full block m-0 p-0">Sign In</Button>
                            </DropdownItem>
                            <DropdownItem key="signup" className="p-0">
                                <Button className="hover:bg-[#16202e] w-full block m-0 p-0">Sign Up</Button>
                            </DropdownItem>
                            <DropdownItem key="logout" className="p-0">
                                <Button className="hover:bg-[#16202e] w-full block m-0 p-0">Log Out</Button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <button className="lg:hidden flex ml-[10px]">
                        <FiMenu size={25} />
                    </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
