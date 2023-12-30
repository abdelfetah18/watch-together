import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        let theme = localStorage.getItem('theme');
        if (theme) {
            setTheme(theme);
            if (theme == 'dark') {
                toggleTheme();
            }
        }
    }, []);

    const toggleTheme = (): void => {
        let isDark = document.body.classList.toggle('dark');
        if (!isDark) {
            localStorage.setItem('theme','light');
            setTheme('light');
        } else {
            localStorage.setItem('theme','dark');
            setTheme('dark');
        }
    }

    return { theme, toggleTheme };
}