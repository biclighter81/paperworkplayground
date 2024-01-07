"use client"
import Image from "next/image";
import logo from "../../public/logo.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader({ version }: { version: string }) {
    const pathname = usePathname()
    const items = [{
        label: 'Storylib',
        href: '/'
    }, {
        label: 'Battlefields',
        href: '/battlefields'
    }]
    return (<>
        <div className="bg-white shadow-sm h-22 flex items-center px-12 py-4">
            <div className="relative h-12 w-32">
                <Image src={logo} priority fill alt="logo" />
            </div>
            <div className="flex-grow flex items-center justify-end space-x-8">
                {
                    items.map((i) => (
                        <Link key={i.href} href={i.href}><p className={`font-bold uppercase ${pathname == i.href ? 'border-b border-[#FFDF35] text-black' : 'text-[#787878]'}`}>{i.label}</p></Link>
                    ))
                }
                <p className="pl-12">v{version}</p>
            </div>
        </div>
    </>)
}