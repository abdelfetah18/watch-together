import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    function scrollTo(index: number): () => void {
        return () => {
            if (window) {
                const screen_height = window.screen.height;
                window.scrollTo({ behavior: "smooth", top: screen_height * index });
            }
        }
    }

    return (
        <div className="flex flex-row items-center justify-between w-full py-2">
            <div className="flex items-center cursor-pointer">
                <img className="h-16" src="/logo.png" />
            </div>
            <div className="flex flex-row items-center">
                <div onClick={toggleTheme} className={styles.navItem}>
                    {theme == 'light' && <FaMoon />}
                    {theme == 'dark' && <FaSun />}
                </div>
                <div onClick={scrollTo(1)} className={styles.navItem}>Features</div>
                <div onClick={scrollTo(2)} className={styles.navItem}>FAQ</div>
                <a href="/user/sign_in" className={styles.navItem}>SIGN IN</a>
            </div>
        </div>
    )
}

const styles = {
    navItem: 'dark:text-gray-100 text-indigo-700 font-semibold text-sm ml-8 cursor-pointer hover:text-blue-600 hover:font-semibold duration-300 uppercase',
};