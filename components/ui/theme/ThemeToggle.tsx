"use client"

import { useState } from "react";

const getInitialDark = () => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme === "dark" || (!savedTheme && systemDark);
};

const ThemeToggle = () => {
    // مقدار اولیه رو مستقیم از localStorage/سیستم می\u200cخونیم تا نیازی به
    // setState داخل effect نباشه (جلوگیری از cascading render).
    const [isDark, setIsDark] = useState(getInitialDark);

    const applyTheme = (dark: boolean) => {
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    };

    const toggleTheme = () => {
        applyTheme(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative top-0 right-2 z-50 
        p-3 rounded-full 
        transition-all duration-300 
        hover:scale-110 active:scale-95
        shadow-lg m-2
        ${isDark
                    ? "bg-[#1a0c2e] text-yellow-400 hover:bg-[#2a1a3e]"
                    : "bg-white text-purple-700 hover:bg-purple-50"
                }
        border ${isDark ? "border-purple-500/30" : "border-purple-200"}
      `}
            aria-label="تغییر تم"
        >
            {isDark ? (
                // آیکون خورشید (لایت مود)
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
            ) : (
                // آیکون ماه (دارک مود)
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            )}
        </button>
    );

};

export default ThemeToggle;