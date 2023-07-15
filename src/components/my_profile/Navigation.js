import { FaUsers } from "react-icons/fa";

const navigations = [
    {
        label: "CREATE ROOM",
        path: "/room/create",
    },
    {
        label: "MY ROOMS",
        path: "/profile",
    },
    {
        label: "EXPLORE",
        path: "/explore",
    },
    {
        label: "SETTINGS",
        path: "/settings",
    }
];

export default function Navigation({ user, selected_label }){
    return (
        <div className="w-1/6 h-full bg-gray-800 flex flex-col relative">
            <div className="px-4 w-full flex flex-col items-center py-10">
                <img className="w-16 h-16 rounded-full" src="/profile_1_1.png" />
                <div className="text-lg text-gray-200 font-semibold mt-2">{user.username}</div>
            </div>
            <div className="w-full flex flex-col">
                {
                    navigations.map((nav_item, index) => {
                        return (
                            <NavItem key={index} label={nav_item.label} path={nav_item.path} selected={nav_item.label == selected_label} />
                        )
                    })
                }
            </div>
            <a href="/user/sign_out"  className="absolute bottom-0 w-full text-center font-semibold py-4 text-sm text-white">Logout</a>
        </div>
    )
}

const NavItem = ({ selected, path, label }) => {
    const default_style = "hover:bg-sky-800 cursor-pointer px-10 py-2 text-gray-100 font-semibold text-sm text-center rounded-r-lg duration-300";
    
    return(
        <a href={path} className={default_style + (selected ? " bg-sky-700" : "")}>{label}</a>
    )
}