"use client";

import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { BarChart, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarLoader } from "react-spinners";

const navItems = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: BarChart,
    },
    {
        href: "/events",
        label: "Events",
        icon: Calendar,
    },
    {
        href: "/meetings",
        label: "Meetings",
        icon: Users,
    },
    {
        href: "/availability",
        label: "Availability",
        icon: Clock,
    },
];

const AppLayout = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    const pathname = usePathname();
    return (
        <>
            {isSignedIn || (isLoaded && <BarLoader width={"100%"} color="#36d7b7" />)}

            <div className="flex flex-col h-screen bg-blue-50 md:flex-row">
                <aside className="hidden md:block w-64 bg-white">
                    <nav className="mt-8">
                        <ul>
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={clsx(
                                            "flex items-center px-4 py-4 text-gray-700 hover:bg-gray-100",
                                            pathname === item.href && "bg-blue-100"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className=" flex-1 overflow-y-auto p-4 md:p-8">
                    <header className="flex justify-between items-center mb-4">
                        <h2 className="text-5xl md:text-6xl gradient-title pt-2 md:pt-0 text-center md:text-left">
                            {navItems.find((item) => item.href === pathname).label || "Dashboard"}
                        </h2>
                    </header>
                    {children}
                </main>
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
                    <ul className="flex items-center justify-around">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "flex flex-col items-center px-4 py-4",
                                        pathname === item.href ? "bg-blue-500" : "text-gray-600"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AppLayout;