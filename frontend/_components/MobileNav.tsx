"use client"

import { useState } from "react"
import Link from "next/link"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const navItems = [
    { href: "/", label: "Home" },
    { href: "/transaction", label: "Transaction" },
    { href: "/category", label: "Category" },
    { href: "/summary", label: "Summary" },
    { href: "/settings", label: "Settings" },
]

export default function MobileNav({ user }: { user: string | null }) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setOpen(false)
    }, [pathname])
    return (
        <>
            {!user ? (
                <Link href="/login">
                    Login
                </Link>
            ) : (
                <>
                
                    <button onClick={() => setOpen(true)}>
                        ☰
                    </button>

                    {/* オーバーレイ */}
                    {open && (
                        <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setOpen(false)}
                        />
                    )}

                    {/* メニュー */}
                    <nav
                        className={`
                        fixed top-0 right-0 h-full w-64 bg-white z-50
                        transition-transform duration-300
                        ${open ? "translate-x-0" : "translate-x-full"}
                        `}
                    >
                        <button
                            className="p-4"
                            onClick={() => setOpen(false)}
                        >
                        ×
                        </button>
                        
                        <ul className="flex flex-col p-4 gap-4">
                            {navItems.map((item) => (
                                <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                >
                                {item.label}
                                </Link>
                            ))}
                        </ul>
                    </nav>
                </>
                )}
        </>
    )
}