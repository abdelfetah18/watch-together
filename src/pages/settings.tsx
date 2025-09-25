import Navigation from "@/components/my_profile/Navigation"
import { FaCamera, FaKey, FaLaptop, FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/contexts/UserContext";


export default function Settings() {
    const user = useContext(UserContext);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        console.log({ user }, "Settings");
    }, []);

    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-row">
            <Navigation selected_label={"Settings"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4">
                <div className="w-11/12 flex-grow overflow-auto flex flex-col">
                    <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">Settings</div>
                    <div className="w-full my-4 flex flex-row flex-grow">
                        <SettingsList useSelect={[selected, setSelected]} />
                        {
                            // selected == "Edit Profile" && <EditProfile user={user} />
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

// @ts-ignore
const EditProfile = ({ user }) => {
    const [username, setUsername] = useState(user.username);

    useEffect(() => {
        console.log({ user }, "Edit Profile");
    }, []);

    return (
        <div className="border rounded-lg flex-grow pt-12 flex flex-col items-center">
            <div className="relative w-40 h-40 bg-gray-100 rounded-full">
                <img className="rounded-full object-cover" src={user.profile_image ? user.profile_image.url : "/profile_1_1.png"} />
                <div className="absolute bottom-2 right-2 rounded-full p-2 bg-blue-600">
                    <FaCamera className="text-white text-lg" />
                </div>
            </div>
            <div className="w-full flex flex-col items-center my-4">
                <input className="text-center px-4 rounded-lg text-gray-50 outline-none bg-transparent" type="text" placeholder="Username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
            </div>
        </div>
    )
}

const account_settings = [
    {
        Icon: FaUser,
        label: "Edit Profile"
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
        <div className="w-1/5 rounded-lg py-12 flex flex-col">
            <Menu key={0} useSelect={useSelect} title={"Account"} items={account_settings} />
            <Menu key={1} useSelect={useSelect} title={"Security"} items={security_settings} />
        </div>
    )
}

const Menu = ({ title, items, useSelect }) => {
    return (
        <div className="w-full flex flex-col mb-8">
            <div className="text-gray-900 dark:text-gray-50 font-semibold text-lg mb-4">{title}</div>
            {
                items.map(({ Icon, label }, index) => {
                    return <Label useSelect={useSelect} key={index} Icon={Icon} label={label} />
                })
            }
        </div>
    )
}

const Label = ({ label, Icon, useSelect }) => {
    const [selected, setSelected] = useSelect;

    function onClick() {
        setSelected(label);
    }

    return (
        <div onClick={onClick} className={"w-full flex flex-row items-center py-2  my-px hover:text-primary-color dark:hover:text-primary-color cursor-pointer duration-300 text-gray-900 dark:text-gray-50/80 rounded-md " + (label == selected ? "text-primary-color" : "")}>
            <Icon className="text-lg" />
            <div className="ml-2 font-medium text-sm">{label}</div>
        </div>
    )
}