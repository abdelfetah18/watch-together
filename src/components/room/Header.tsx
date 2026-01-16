import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    searchHandler: (query: string) => Promise<void>;
}

export default function SearchBar({ searchHandler }: SearchBarProps) {
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
        <div className="w-full flex-grow flex flex-row items-center justify-center py-4">
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    searchHandler(query);
                }}
                className="w-1/2 border dark:border-none bg-gray-100 dark:bg-dark-gray-bg rounded-full flex flex-row items-center flex-wrap cursor-pointer text-gray-900 py-2">
                <div className="text-gray-300 px-4"><FaSearch /></div>
                <input
                    value={query}
                    onChange={(evt) => { setQuery(evt.target.value); }}
                    className="text-sm bg-transparent flex-grow h-full py-3 focus-visible:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-gray-50"
                    type="text"
                    placeholder="Search or Paste a YOUTUBE URL and hit Enter"
                />
            </form>
        </div>
    );
}