import { FaCog, FaCompass, FaPlus, FaSignOutAlt, FaUsers } from "react-icons/fa";

const navigations = [
    {
        label: "CREATE ROOM",
        path: "/room/create",
        Icon: FaPlus
    },
    {
        label: "MY ROOMS",
        path: "/profile",
        Icon: FaUsers
    },
    {
        label: "EXPLORE",
        path: "/explore",
        Icon: FaCompass
    },
    {
        label: "SETTINGS",
        path: "/settings",
        Icon: FaCog
    }
];

export default function Navigation({ user, selected_label }){
    return (
        <div className="w-1/6 h-full bg-gray-800 flex flex-col relative">
            <div className="px-4 w-full flex flex-col items-center py-10">
                <img className="w-16 h-16 rounded-full" src="/profile_1_1.png" />
                <div className="text-lg text-gray-200 font-semibold mt-2">{user.username}</div>
            </div>
            <div className="w-full flex flex-col items-center">
                {
                    navigations.map((nav_item, index) => {
                        return (
                            <NavItem key={index} Icon={nav_item.Icon} label={nav_item.label} path={nav_item.path} selected={nav_item.label == selected_label} />
                        )
                    })
                }
            </div>
            <a href="/user/sign_out"  className="absolute bottom-0 w-full py-4 text-gray-100 hover:text-sky-600 flex flex-row items-center justify-center">
                <FaSignOutAlt />
                <div className="font-semibold text-sm ml-2">Logout</div>
            </a>
        </div>
    )
}

const NavItem = ({ selected, path, label, Icon }) => {
    const default_style = "w-full flex flex-row items-center px-12 text-start hover:bg-sky-800 cursor-pointer py-2 text-gray-100 rounded-r-lg duration-300";
    
    return(
        <a href={path} className={default_style + (selected ? " bg-sky-700" : "")}>
            <Icon />
            <div className="font-semibold text-sm text-center ml-2">{label}</div>
        </a>
    )
}