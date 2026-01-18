import UserContext from "@/contexts/UserContext";
import Link from "next/link";
import { useContext } from "react";
import { IconType } from "react-icons";
import {
    FaCog,
    FaCompass,
    FaPlus,
    FaSearch,
} from "react-icons/fa";

interface NavItemType {
    label: string;
    path: string;
    Icon: IconType;
};

interface NavigationProps {
    selected_label: string;
};

export default function Navigation({ selected_label }: NavigationProps) {
    const user = useContext(UserContext);

    return (
        <div className="w-1/5 h-full  flex flex-col items-center relative border-r dark:border-r dark:border-[#2a2a2a] bg-zinc-950">
            <div className="w-full flex flex-col gap-1 px-2 py-2">
                {
                    navigations.map((item, index) => {
                        return (
                            <NavItem key={index} item={item} selected={item.label == selected_label} />
                        )
                    })
                }
            </div>

            <div className="absolute bottom-0 left-0 w-full p-2">
                <div className="w-full bg-zinc-900 rounded-lg flex flex-row items-center justify-between py-2 px-4">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src={user.profile_image?.url || "/profile_4_3.png"}
                            alt="profile picture"
                            className="w-8 aspect-square object-cover rounded-full"
                        />
                        <div className="text-base text-gray-50">{user.username}</div>
                    </div>
                    <Link href={"/settings"} className="flex flex-row items-center gap-2 text-white">
                        <FaCog />
                    </Link>
                </div>
            </div>
        </div>
    )
}

interface NavItemProps {
    selected: boolean;
    item: NavItemType;
};

function NavItem({ selected, item: { path, label, Icon } }: NavItemProps) {
    const default_style = "px-2 py-2 w-full flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg text-sm";

    return (
        <Link href={path} className={`${default_style} ${selected ? "bg-zinc-800 dark:text-gray-50" : "text-gray-900 dark:text-gray-400"}`}>
            <Icon />
            <div className="capitalize">{label}</div>
        </Link>
    )
}

const navigations = [
    { label: "Search", path: "/search", Icon: FaSearch },
    { label: "Explore", path: "/explore", Icon: FaCompass },
    { label: "Create Room", path: "/room/create", Icon: FaPlus },
] as const;
