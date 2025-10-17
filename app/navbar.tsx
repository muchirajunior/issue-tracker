import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
export default function NavBar(){
    const links = [
        { label: 'Dashbaord', link:'/' },
        { label: 'Issues', link:'/issues' }
    ];
    return(
        <nav className="flex space-x-6 px-6 h-14 border-b border-gray-200 items-center">
            <Link href='/'> <AiFillBug /> </Link>
            <ul className="flex space-x-4">
                {
                    links.map((link)=> <li>
                        <Link 
                            href={link.link} 
                            className="text-zinc-500 hover:text-zinc-800 transition-colors "
                        > {link.label}</Link>
                    </li> )
                }
            </ul>
        </nav>
    );
}