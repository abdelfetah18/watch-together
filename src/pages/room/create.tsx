import Room from "@/components/room/Room";
import Navigation from "@/components/my_profile/Navigation"
import useRoomCategories from "@/hooks/useRoomCategories";

import { FaTimes } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { createRoom, uploadProfileImage } from "@/services/RoomService";
import ToastContext from "@/contexts/ToastContext";
import LoadingComponent from "@/components/LoadingComponent";
import InputWithError from "@/components/InputWithError";
import PasswordInput from "@/components/room/PasswordInput";
import App from "@/components/Layout/App";

export default function CreateRoom() {
    const router = useRouter();

    const toastManager = useContext(ToastContext);

    const [isLoading, setIsLoading] = useState(false);

    const { roomCategories } = useRoomCategories();
    const roomImageRef = useRef<HTMLInputElement>();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [bio, setBio] = useState("");
    const [bioError, setBioError] = useState("");

    const [privacy, setPrivacy] = useState("");
    const [privacyError, setPrivacyError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [category, setCategory] = useState<RoomCategory>({ _id: "", name: "" });
    const [categories, setCategories] = useState<RoomCategory[]>([]);
    const [categoriesError, setCategoriesError] = useState("");

    const [profileImage, setProfileImage] = useState<Asset>(null);
    const profileImageFile = useRef<File>(null);

    function onSelectImage(image: File) {
        profileImageFile.current = image;
        setProfileImage({ url: URL.createObjectURL(image) });
    }

    async function createRoomHandler(): Promise<void> {
        setIsLoading(true);

        setNameError("");
        setBioError("");
        setPrivacyError("");
        setPasswordError("");
        setCategoriesError("");

        let hasErrors = false;
        if (name.length == 0) {
            setNameError("Name field is required.");
            hasErrors = true;
        }

        if (bio.length == 0) {
            setBioError("Bio field is required.");
            hasErrors = true;
        }

        if (privacy.length == 0) {
            setPrivacyError("Privacy field is required.");
            hasErrors = true;
        }

        if (privacy == "private" && password.length == 0) {
            setPasswordError("The room privacy is set to private so Password field is required.");
            hasErrors = true;
        }

        if (categories.length == 0) {
            setCategoriesError("At least add one category.");
            hasErrors = true;
        }

        if (hasErrors) {
            setIsLoading(false);
            return;
        }

        const result = await createRoom(name, bio, categories.map(c => ({ _ref: c._id, _type: "reference" })), privacy as RoomPrivacy, password);
        if (result.isSuccess()) {
            const room = result.value;
            if (profileImageFile.current) {
                await uploadProfileImage(room._id, profileImageFile.current);
            }

            toastManager.alertSuccess("Room created successfully");
            router.push(`/room/${room._id}`);
        } else {
            const names = Object.keys(result.error);
            for (let name of names) {
                switch (name) {
                    case "name":
                        setNameError(result.error[name]);
                        break;
                    case "bio":
                        setBioError(result.error[name]);
                        break;
                    case "privacy":
                        setPrivacyError(result.error[name]);
                        break;
                    case "password":
                        setPasswordError(result.error[name]);
                        break;
                    case "categories":
                        setCategoriesError(result.error[name]);
                        break;
                }
            }
        }

        setIsLoading(false);
    }

    return (
        <App title="create room">
            {isLoading && <LoadingComponent />}
            <Navigation selected_label={"Create Room"} />
            <div className="w-4/5 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-full h-full flex flex-col p-8">
                    <div className="w-full h-full flex flex-col gap-10">
                        <div className="w-full text-2xl font-medium text-gray-900 dark:text-gray-50">Create Room</div>
                        <div className="w-full grid grid-cols-3 gap-8">
                            <div className="w-full flex flex-col col-span-2 gap-4">
                                <input
                                    ref={roomImageRef}
                                    onChange={(ev) => { onSelectImage(ev.target.files[0]); }}
                                    hidden
                                    type="file"
                                    accept="image/*"
                                />

                                <div onClick={() => { if (roomImageRef.current) { roomImageRef.current.click() } }} className="h-40 w-full border-gray-300 text-gray-300 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">Click Or Drop your Profile Picture Here</div>

                                <InputWithError placeholder="Name" value={name} setValue={setName} valueError={nameError} setValueError={setNameError} />
                                <InputWithError placeholder="Bio" value={bio} setValue={setBio} valueError={bioError} setValueError={setBioError} />

                                <div className="w-full flex flex-col items-center gap-2">
                                    <select
                                        onChange={(ev) => {
                                            setPrivacyError("");
                                            setPrivacy(ev.target.value);
                                        }}
                                        value={privacy}
                                        placeholder="Select Category"
                                        className={`w-full px-4 py-2 text-gray-900 dark:text-gray-50 placeholder:text-gray-300 bg-gray-100 dark:bg-dark-gray-bg rounded-lg outline-none ${privacyError.length > 0 ? "border border-red-500" : ""}`}
                                    >
                                        <option disabled value={""}>Select Privacy</option>
                                        <option value={'public'}>Public</option>
                                        <option value={'private'}>Private</option>
                                    </select>
                                    {privacyError.length > 0 && <div className="w-full text-xs text-red-500">{privacyError}</div>}
                                </div>

                                {
                                    privacy == "private" && (
                                        <div className="w-full flex flex-col items-center gap-2">
                                            <PasswordInput password={password} setPasswordError={setPasswordError} setPassword={setPassword} hasError={passwordError.length > 0} />
                                            {passwordError.length > 0 && <div className="w-full text-xs text-red-500">{passwordError}</div>}
                                        </div>
                                    )
                                }

                                <div className="w-full flex flex-col items-center gap-2">
                                    <div className="w-full flex items-center gap-2">
                                        <div className="flex-grow flex flex-col items-center gap-2">
                                            <select
                                                value={category._id}
                                                onChange={(ev) => {
                                                    setCategory(roomCategories.find(value => value._id == ev.target.value));
                                                }}
                                                placeholder="Select Category"
                                                className={`w-full px-4 py-2 text-gray-900 dark:text-gray-50 placeholder:text-gray-300 bg-gray-100 dark:bg-dark-gray-bg rounded-lg outline-none ${categoriesError.length > 0 ? "border border-red-500" : ""}`}
                                            >
                                                <option disabled value="">Select Category</option>
                                                {
                                                    roomCategories.map((c, index) => {
                                                        return (<option key={index} value={c._id}>{c.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <button onClick={() => {
                                            if (category._id) {
                                                setCategoriesError("");
                                                setCategories(state => [...state, category]);
                                                setCategory({ _id: "", name: "" });
                                            }
                                        }} className="h-full px-12 bg-green-800 text-gray-50 rounded-lg">Add</button>
                                    </div>
                                    {categoriesError.length > 0 && <div className="w-full text-xs text-red-500">{categoriesError}</div>}
                                </div>

                                <div className="w-full flex items-center flex-wrap">
                                    {
                                        // NOTE: ALLOW ONLY 5 Categories for a room
                                        categories.map((category, index) => {
                                            const onClick = () => {
                                                setCategories(state => state.filter(c => c._id != category._id));
                                            }

                                            return (
                                                <div key={index} className="flex items-center text-xs bg-gray-300 dark:bg-gray-600 text-gray-50 rounded-full px-2 mr-1 mb-1">{category.name} <FaTimes onClick={onClick} className="ml-2 cursor-pointer hover:text-gray-500" /></div>
                                            )
                                        })
                                    }
                                </div>
                                <button onClick={createRoomHandler} className="w-full py-2 rounded-full text-gray-50 bg-primary-color">{"Create new room"}</button>
                            </div>
                            <div className="w-full flex flex-col">
                                <Room
                                    room={{
                                        name: name,
                                        bio: bio,
                                        categories: categories,
                                        privacy: privacy as RoomPrivacy,
                                        total_members: 37,
                                        profile_image: profileImage,
                                    }}
                                    joinRoom={() => { }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
