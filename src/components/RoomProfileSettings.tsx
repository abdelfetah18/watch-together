import { ChangeEventHandler, useRef, useState } from "react";
import { updateRoom, uploadProfileImage } from "@/services/RoomService";
import { FaCamera, FaTrash } from "react-icons/fa";
import useField from "@/hooks/useField";
import Input from "./Input";
import TextArea from "./TextArea";
import LoadingComponent from "./LoadingComponent";

interface RoomProfileSettingsProps {
    room: Room;
}

export default function RoomProfileSettings({ room }: RoomProfileSettingsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const nameField = useField(room.name);
    const bioField = useField(room.bio);
    const [profilePictureURL, setProfilePictureURL] = useState(room.profile_image?.url);
    const [errors, setErrors] = useState({});

    const profileImageRef = useRef<HTMLInputElement>(null);
    const isDraft = nameField.value != room.name || bioField.value != room.bio || profilePictureURL != room.profile_image?.url;

    const resetFieldsHandler = (): void => {
        nameField.onChange(room.name);
        bioField.onChange(room.bio);
        setProfilePictureURL(room.profile_image?.url);
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

        if (nameField.value.length == 0) {
            setErrors(state => ({ ...state, name: "name field is required." }));
        }

        if (bioField.value.length == 0) {
            setErrors(state => ({ ...state, username: "bio field is required." }));
        }

        let assetId = "";
        if (profilePictureURL != room.profile_image?.url && profilePictureURL?.length > 0) {
            const result = await uploadProfileImage(room._id, profileImageRef.current.files[0]);
            if (result.isFailure()) {
                setErrors(state => ({ ...state, profile_image: result.error }));
            } else {
                assetId = result.value._id;
                setProfilePictureURL(result.value.url);
            }
        }

        const result = await updateRoom(room._id, {
            name: nameField.value,
            bio: bioField.value,
            profile_image: (profilePictureURL && profilePictureURL != room.profile_image?.url) ? {
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
        <div className="w-full flex flex-col p-4">
            {isLoading && <LoadingComponent />}
            <div className="w-full flex-grow flex flex-col gap-8">
                <div className="w-full flex flex-col">
                    <div className="w-full text-lg font-medium text-gray-900 dark:text-gray-50">Profile:</div>
                    <div className="text-gray-500 text-sm">Manage your room profile details.</div>
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
                    <div className="text-gray-50">Name:</div>
                    <Input bind={nameField} type="text" placeholder="Name..." errorMessage={errors["name"]} />
                    {errors["name"] && (<div className="text-red-600 text-sm capitalize">{errors["name"]}</div>)}
                </div>
                <div className="w-full h-px bg-zinc-800"></div>
                <div className="w-full flex flex-col gap-2">
                    <div className="text-gray-50">Bio:</div>
                    <TextArea bind={bioField} errorMessage={errors["bio"]} rows={6} placeholder="Bio..." />
                </div>

                {isDraft && (<div className="w-full flex flex-row items-center justify-end gap-2">
                    <div onClick={resetFieldsHandler} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-800 hover:border-zinc-700 text-gray-50 text-sm w-40 text-center py-2 rounded-lg cursor-pointer">Cancel</div>
                    <div onClick={saveHandler} className="bg-primary-color hover:bg-indigo-600 border border-primary-color hover:border-indigo-600 text-gray-50 text-sm w-40 text-center py-2 rounded-lg cursor-pointer">Save</div>
                </div>)}
            </div>
        </div>
    )
}