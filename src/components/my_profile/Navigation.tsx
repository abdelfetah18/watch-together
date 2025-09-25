import ThemeContext from "@/contexts/ThemeContext";
// import UserSessionContext from "@/contexts/UserSessionContext";
import { useContext, useEffect } from "react";
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
    // const user = useContext(UserContext);

    return (
        <div className="w-1/6 h-full dark:bg-dark-gray-bg  flex flex-col items-center relative border-r dark:border-r-0">
            <div className="w-5/6 flex items-center py-4">
                <img className="w-8 h-8 rounded-full" src="/logo.png" />
                <div className="ml-2 font-medium text-gray-900 dark:text-gray-50 capitalize">Watch Together</div>
            </div>
            {/* <div className="w-5/6 flex items-center py-4">
                <img className="w-8 h-8 rounded-full" src="/profile_1_1.png" />
                <div className="ml-2 font-medium text-gray-900 dark:text-gray-50 capitalize">{userSession.username}</div>
            </div> */}



            <div className="w-5/6 flex flex-col flex-grow">
                <div className="w-full flex flex-col items-start mt-16">
                    {
                        navigations.map((nav_item, index) => {
                            useEffect(() => { console.log({ nav_item, selected_label }) }, [])
                            return (
                                <NavItem key={index} item={nav_item} selected={nav_item.label == selected_label} />
                            )
                        })
                    }
                </div>

                <div onClick={toggleTheme} className="w-full flex flex-row items-center text-start hover:text-indigo-800 cursor-pointer py-4 rounded-r-lg duration-300 active:scale-110 text-gray-900 dark:text-gray-50">
                    {theme == 'dark' && <FaMoon />}
                    {theme == 'light' && <FaSun />}
                    <div className="text-sm text-center ml-2 capitalize">{theme} Mode</div>
                </div>
            </div>

            <a href="/user/sign_out" className="w-5/6 py-8 text-gray-900 dark:text-gray-50 hover:text-sky-600 flex flex-row items-center duration-300 active:scale-110">
                <FaSignOutAlt />
                <div className="ml-2">Log out</div>
            </a>
        </div>
    )
}

interface NavItemProps {
    selected: boolean;
    item: NavItemType;
};

function NavItem({ selected, item: { path, label, Icon } }: NavItemProps) {
    const default_style = "w-full flex flex-row items-center text-start hover:text-indigo-800 cursor-pointer py-4 rounded-r-lg duration-300 active:scale-110";

    return (
        <a href={path} className={default_style + (selected ? " font-semibold text-primary-color " : " text-gray-900 dark:text-gray-50")}>
            <Icon />
            <div className="text-center ml-2">{label}</div>
        </a>
    )
}

const navigations: NavItemType[] = [
    { label: "Search", path: "/search", Icon: FaSearch },
    { label: "Explore", path: "/explore", Icon: FaCompass },
    { label: "Create Room", path: "/room/create", Icon: FaPlus },
    { label: "My Rooms", path: "/profile", Icon: FaUsers },
    { label: "Settings", path: "/settings", Icon: FaCog }
];