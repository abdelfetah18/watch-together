import { FaSignInAlt } from "react-icons/fa";

export default function Header() {
    // const { theme, toggleTheme } = useContext(ThemeContext);

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
            <div className="flex flex-row items-center gap-8">
                {/* <div onClick={toggleTheme} className={styles.navItem}>
                    {theme == 'light' && <FaMoon />}
                    {theme == 'dark' && <FaSun />}
                </div> */}
                <div onClick={scrollTo(1)} className={styles.navItem}>Features</div>
                {/* <div onClick={scrollTo(2)} className={styles.navItem}>FAQ</div> */}
                <a href="/user/sign_in" className="flex justify-center items-center gap-2 bg-primary-color text-white w-40 py-2 rounded-lg active:scale-110 duration-300">
                    <FaSignInAlt />
                    <div className="text-sm font-semibold">Sign In</div>
                </a>
            </div>
        </div>
    )
}

const styles = {
    navItem: 'dark:text-gray-100 text-gray-900 text-base font-semibold cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-600 hover:font-semibold duration-300 active:scale-110',
};