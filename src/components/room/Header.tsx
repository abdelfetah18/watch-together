import ThemeContext from "@/contexts/ThemeContext";
import UserContext from "@/contexts/UserContext";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";

interface HeaderProps {
    searchHandler: (query: string) => Promise<void>;
}

export default function Header({ searchHandler }: HeaderProps) {
    const user = useContext(UserContext);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const [query, setQuery] = useState("");

    const menuRef = useRef<HTMLDivElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const callback = (event: PointerEvent) => {
            if (menuRef.current && menuRef.current.contains(event.target as Node)) {
                return;
            }
            setShowMenu(false);
        };

        if (showMenu) {
            document.addEventListener("click", callback);
        } else {
            document.removeEventListener("click", callback);
        }
    }, [showMenu]);

    return (
        <div className="w-full flex flex-row items-center justify-between gap-4 py-1 px-8">
            <Link href={"/profile"}>
                <div className="text-white font-bold text-xl cursor-pointer"><img className="h-12" src="/logo.png" /></div>
            </Link>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    searchHandler(query);
                }}
                className="w-[640px] border dark:border-none bg-gray-100 dark:bg-dark-gray-bg rounded-full flex flex-row items-center flex-wrap cursor-pointer text-gray-900">
                <div className="text-gray-300 px-4"><FaSearch /></div>
                <input
                    value={query}
                    onChange={(evt) => { setQuery(evt.target.value); }}
                    className="text-sm bg-transparent flex-grow h-full py-3 focus-visible:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-gray-50"
                    type="text"
                    placeholder="Search or Paste a YOUTUBE URL and hit Enter"
                />
            </form>
            <div className="flex items-center">
                <div ref={menuRef} className="relative w-10 h-10 rounded-full">
                    <img onClick={() => setShowMenu(state => !state)} className={`w-full h-full rounded-full cursor-pointer border-gray-200 dark:border-zinc-700 ${showMenu ? "border" : "border-none"}`} src={user.profile_image?.url || "/profile_1_1.png"} />
                    {
                        showMenu && (
                            <div className="absolute w-60 right-0 top-full mt-2 bg-gray-200 dark:bg-dark-gray-bg rounded-lg py-2 border border-gray-200 dark:border-zinc-700 z-10">
                                <div onClick={toggleTheme} className="w-full hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-2 dark:text-gray-100 text-gray-900 text-sm font-semibold py-2 cursor-pointer select-none px-8">
                                    {theme == 'dark' && (<FaMoon />)}
                                    {theme == 'light' && (<FaSun />)}
                                    <div className="capitalize">{theme} Mode</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}