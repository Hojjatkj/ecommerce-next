'use client'

import React, { useState } from "react"
import { Input } from "./input";

interface ProductSearchptops {
    onSearch: (query: string) => void
    placeholder?: string
}

export default function ProductSearch({ onSearch, placeholder }: ProductSearchptops) {
    const [query, setQuery] = useState('');

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
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
        />
    )
}