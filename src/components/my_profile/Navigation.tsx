import ThemeContext from "@/contexts/ThemeContext";
import UserSessionContext from "@/contexts/UserSessionContext";
import { useContext } from "react";
import { IconType } from "react-icons";
import { FaCog, FaCompass, FaMoon, FaPlus, FaSearch, FaSignOutAlt, FaSun, FaUsers } from "react-icons/fa";

interface NavItemType {
    label: string;
    path: string;
    Icon: IconType;
};

interface NavigationProps {
    selected_label: string;
};

export default function Navigation({ selected_label }: NavigationProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const userSession = useContext(UserSessionContext);

    return (
        <div className="w-1/6 h-full dark:bg-gray-800 bg-indigo-700 flex flex-col relative">
            <div className="px-4 w-full flex flex-col items-center py-10">
                <img className="w-16 h-16 rounded-full" src="/profile_1_1.png" />
                <div className="text-lg text-gray-200 font-semibold mt-2">{userSession.username}</div>
            </div>
            <div className="w-full flex flex-col items-center">
                {
                    navigations.map((nav_item, index) => {
                        return (
                            <NavItem key={index} item={nav_item} selected={nav_item.label == selected_label} />
                        )
                    })
                }
            </div>
            
            <div onClick={toggleTheme} className="w-full flex flex-row items-center px-12 text-start hover:bg-indigo-800 dark:hover:bg-sky-800 cursor-pointer py-2 text-gray-100 rounded-r-lg duration-300">
                    {theme == 'dark' && <FaMoon />}
                    {theme == 'light' && <FaSun />}
                    <div className="font-semibold text-sm text-center ml-2 uppercase">{theme}</div>
                </div>

            <a href="/user/sign_out" className="absolute bottom-0 w-full py-4 text-gray-100 hover:text-sky-600 flex flex-row items-center justify-center">
                <FaSignOutAlt />
                <div className="font-semibold text-sm ml-2">Logout</div>
            </a>
        </div>
    )
}

interface NavItemProps {
    selected: boolean;
    item: NavItemType;
};

function NavItem({ selected, item: { path, label, Icon } }: NavItemProps){
    const default_style = "w-full flex flex-row items-center px-12 text-start dark:hover:bg-sky-800 hover:bg-indigo-800 cursor-pointer py-2 text-gray-100 rounded-r-lg duration-300";

    return (
        <a href={path} className={default_style + (selected ? " dark:bg-sky-700 bg-indigo-600" : "")}>
            <Icon />
            <div className="font-semibold text-sm text-center ml-2">{label}</div>
        </a>
    )
}

const navigations: NavItemType[] = [
    { label: "SEARCH", path: "/search", Icon: FaSearch },
    { label: "EXPLORE", path: "/explore", Icon: FaCompass },
    { label: "CREATE ROOM", path: "/room/create", Icon: FaPlus },
    { label: "MY ROOMS", path: "/profile", Icon: FaUsers },
    { label: "SETTINGS", path: "/settings", Icon: FaCog }
];