import UserContext from "@/contexts/UserContext";
import { updateUserProfile, updateUserProfilePicture } from "@/services/UserService";
import { ChangeEventHandler, useContext, useRef, useState } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";
import LoadingComponent from "./LoadingComponent";

export default function PersonalInfoSettings() {
    const user = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [profilePictureURL, setProfilePictureURL] = useState(user.profile_image?.url);
    const [errors, setErrors] = useState({});

    const profileImageRef = useRef<HTMLInputElement>(null);
    const isDraft = username != user.username || profilePictureURL != user.profile_image?.url;

    const resetFieldsHandler = (): void => {
        setUsername(user.username);
        setProfilePictureURL(user.profile_image?.url);
        setErrors({});
        profileImageRef.current.value = "";
    }

    const onSelectFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files.length == 0) {
            return;
        }

        setProfilePictureURL(URL.createObjectURL(event.target.files[0]));
    }

    const saveHandler = async (): Promise<void> => {
        setIsLoading(true);
        if (username.length == 0) {
            setErrors(state => ({ ...state, username: "username field is required." }));
        }

        let assetId = "";
        if (profilePictureURL != user.profile_image?.url && profilePictureURL?.length > 0) {
            const result = await updateUserProfilePicture(profileImageRef.current.files[0]);
            if (result.isFailure()) {
                setErrors(state => ({ ...state, profile_image: result.error }));
            } else {
                assetId = result.value.profile_image._id;
                setProfilePictureURL(result.value.profile_image.url);
            }
        }

        const result = await updateUserProfile({
            username,
            profile_image: (profilePictureURL && profilePictureURL != user.profile_image?.url) ? {
                _type: "image",
                asset: {
                    _ref: assetId,
                    _type: "reference",
                }
            } : null,
        });

        if (result.isFailure()) {
            setErrors(state => ({ ...state, api: result.error }));
        }

        setIsLoading(false);

        if (Object.keys(errors).length == 0) {
            window.location.reload();
        }
    }

    return (
        <div className="w-full h-full p-4 flex flex-col overflow-auto">
            {isLoading && <LoadingComponent />}
            <div className="w-full flex-grow overflow-auto flex flex-col gap-8">
                <div className="w-full flex flex-col">
                    <div className="w-full text-lg font-medium text-gray-900 dark:text-gray-50">Personal Info</div>
                    <div className="text-gray-500 text-sm">Manage your personal information and profile details.</div>
                </div>
                <div className="w-full h-px bg-zinc-800"></div>
                <div className="w-full flex flex-row gap-8">
                    <div className="w-16 h-16 object-cover rounded-full border border-zinc-800">
                        <img className="h-full w-full rounded-full object-cover" src={profilePictureURL || "/profile_1_1.png"} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-gray-50">Profile Image</div>
                        <div className="text-gray-500 text-sm">We support PNGs, JPEGs and GIFs</div>
                        <div className="flex flex-row items-center gap-2">
                            <input ref={profileImageRef} type="file" accept="image/*" onChange={onSelectFile} hidden />
                            <div onClick={() => profileImageRef.current.click()} className="px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-full cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-sm">
                                <FaCamera className="text-white text-sm" />
                                <div className="text-white">Upload new photo</div>
                            </div>
                            <div onClick={() => setProfilePictureURL("")} className="px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-full cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-sm">
                                <FaTrash className="text-white text-sm" />
                                <div className="text-white">Remove</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-px bg-zinc-800"></div>
                <div className="w-full flex flex-col gap-2">
                    <div className="text-gray-50">Username:</div>
                    <input
                        className={`w-full py-2 px-4 rounded-full text-sm outline-none bg-transparent border
                            ${errors["username"] ? "border-red-600 text-red-500" : "border-zinc-700 text-gray-50"}`}
                        type="text" placeholder="Username" value={username} onChange={(ev) => setUsername(ev.target.value)}
                    />
                    {errors["username"] && (<div className="text-red-600 text-sm capitalize">{errors["username"]}</div>)}
                </div>
                {isDraft && (<div className="w-full flex flex-row items-center justify-end gap-2">
                    <div onClick={resetFieldsHandler} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-800 hover:border-zinc-700 text-gray-50 text-sm w-40 text-center py-2 rounded-lg cursor-pointer">Cancel</div>
                    <div onClick={saveHandler} className="bg-primary-color hover:bg-indigo-600 border border-primary-color hover:border-indigo-600 text-gray-50 text-sm w-40 text-center py-2 rounded-lg cursor-pointer">Save</div>
                </div>)}
            </div>
        </div>
    )
}