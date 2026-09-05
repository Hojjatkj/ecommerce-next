'use client'

import React, { useState } from "react"

interface ProductSearchptops {
    onSearch: (query: string) => void
    placeholder?: string
}

export default function ProductSearch({ onSearch, placeholder = "جستجوی محصولات " }: ProductSearchptops) {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full max-w-full sm:max-w-md lg:max-w-2xl xl:max-w-3xl px-4 py-3 text-base sm:text-xl bg-slate-200/10 backdrop-blur-md border border-slate-800/60 rounded-2xl placeholder-slate-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
        />
    )
}