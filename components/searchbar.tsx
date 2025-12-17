"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    // Debounce the URL update
    useEffect(() => {
        if (!searchQuery) {
            const params = new URLSearchParams(searchParams);
            params.delete("search");
            router.replace(`${pathName}?${params.toString()}`);
            return;
        }

        // Debounce for non-empty search queries
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            params.set("search", searchQuery);
            router.replace(`${pathName}?${params.toString()}`);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <div className="w-full bg-white sticky top-16 z-20">
            <div className="w-full max-w-4xl mx-auto px-5 py-3 bg-white">
                <div className="relative">
                    <motion.input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileFocus={{
                            scale: 1.03,
                            boxShadow: "0px 0px 0px 2px rgba(79, 57, 246 ,1)",
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="w-full px-6 py-3 pr-14 text-sm sm:text-base rounded-full bg-white border border-gray-200 text-gray-800 placeholder-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
            </div>
        </div>
    );
}