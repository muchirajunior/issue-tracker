'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

export default function NavBar(){
    const pathName = usePathname();
    console.log(pathName);

    return(
        <nav className="flex space-x-6 px-6 h-14 border-b border-gray-200 items-center mb-3">
            <Link href='/' className="flex items-center font-bold text-lg"> <AiFillBug className="me-3" /> Issue Tracker </Link>
        </nav>
    );
}