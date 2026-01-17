import { FaKey, FaLaptop, FaUser } from "react-icons/fa";
import { useState } from "react";
import App from "@/components/Layout/App";
import PersonalInfoSettings from "@/components/PersonalInfoSettings";
import { IconType } from "react-icons";

type SettingTab = "Personal Info" | "Sessions"

export default function Settings() {
    const [selected, setSelected] = useState<SettingTab>("Personal Info");

    return (
        <App title="explore">
            <SettingsList useSelect={[selected, setSelected]} />
            <div className="w-4/5 h-full px-8 py-2 flex flex-col items-center overflow-auto">
                {selected == "Personal Info" && <PersonalInfoSettings />}
            </div>
        </App>
    );
}

const account_settings: Array<{ Icon: IconType; label: SettingTab; }> = [
    {
        Icon: FaUser,
        label: "Personal Info"
    },
    {
        Icon: FaLaptop,
        label: "Sessions"
    }
];

const security_settings = [
    {
        Icon: FaKey,
        label: "Change Password"
    }
];

const SettingsList = ({ useSelect }) => {
    return (
        <div className="w-1/5 h-full flex flex-col items-center relative border-r dark:border-r dark:border-[#2a2a2a] bg-zinc-950">
            <div className="w-full px-4 py-2 text-lg text-gray-50">Settings</div>
            <Menu key={0} useSelect={useSelect} title={"Account"} items={account_settings} />
            <Menu key={1} useSelect={useSelect} title={"Security"} items={security_settings} />
        </div>
    )
}

const Menu = ({ title, items, useSelect }) => {
    return (
        <div className="w-full flex flex-col items-center py-2">
            <div className="w-11/12 text-gray-900 dark:text-gray-400 text-sm py-2 px-2">{title}</div>
            {
                items.map(({ Icon, label }, index) => {
                    return <Label useSelect={useSelect} key={index} Icon={Icon} label={label} />
                })
            }
        </div>
    )
}

const Label = ({ label, Icon, useSelect }) => {
    const default_style = "px-2 py-2 w-11/12 flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg text-sm";
    const [selected, setSelected] = useSelect;

    function onClick() {
        setSelected(label);
    }

    return (
        <div onClick={onClick} className={`${default_style} ${selected == label ? "bg-zinc-800 dark:text-gray-50" : "text-gray-900 dark:text-gray-400"}`}>
            <Icon className="text-lg" />
            <div className="ml-2 font-medium text-sm">{label}</div>
        </div>
    )
}