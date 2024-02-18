"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarProps {
    logo: {
        src: string
        height: number
        width: number
        blueWidth: number
        blueHeight: number
    }
    links: {
        name: string
        href: string
        current: boolean
    }[]
}

const Navbar: React.FC<NavbarProps> = ({ logo, links }) => {
    const pathName = usePathname()

    return (
        <nav className="bg-white shadow-md flex">
            <div className="container mx-auto px-4 py-3 flex flex-row justify-between">
                <div className="inline-block">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logo.src}
                            alt="toDo logo"
                            className="inline"
                            width={20}
                            height={20}
                        />
                    </Link>
                </div>
                <ul className="flex flex-row justify-between gap-3">
                    {links.map((siteRoute) => (
                        <li key={siteRoute.href} className={pathName === siteRoute.href ? '' : `text-zinc-300`}>
                            <Link
                                href={siteRoute.href}
                            >
                                {siteRoute.name}
                            </Link>

                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
