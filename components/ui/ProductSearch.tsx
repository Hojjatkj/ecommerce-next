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
className="w-full max-w-full sm:max-w-xl lg:max-w-3xl xl:max-w-4xl px-4 py-3 text-base sm:text-xl bg-card-bg/40 backdrop-blur-md border border-border-main rounded-2xl text-card-text placeholder:text-muted-text shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-primary/20 transition-all duration-300"        />
    )
}