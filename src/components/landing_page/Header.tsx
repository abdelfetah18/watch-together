import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";
import { FaMoon, FaSignInAlt, FaSun } from "react-icons/fa";

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
                {/* <div onClick={scrollTo(2)} className={styles.navItem}>FAQ</div> */}
                <a href="/user/sign_in" className="flex items-center m-8 text-gray-900 dark:text-gray-50 hover:text-indigo-600 dark:hover:text-indigo-600 active:scale-110 duration-300">
                    <FaSignInAlt />
                    <div className="text-sm font-semibold ml-2">Sign In</div>
                </a>
            </div>
        </div>
    )
}

const styles = {
    navItem: 'dark:text-gray-100 text-gray-900 text-sm font-semibold ml-8 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-600 hover:font-semibold duration-300 active:scale-110',
};