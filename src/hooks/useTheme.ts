import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function useTheme() {
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        setIsLoading(true);
        const theme = localStorage.getItem("theme");
        if (theme) {
            setTheme(theme as Theme);
            initTheme(theme as Theme);
        }
        setIsLoading(false);
    }, []);

    const initTheme = (theme: Theme): void => {
        if (theme == "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }

    const toggleTheme = (): void => {
        let isDark = document.body.classList.toggle("dark");
        if (!isDark) {
            localStorage.setItem("theme", "light");
            setTheme("light");
        } else {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    }

    return { isLoading, theme, toggleTheme };
}