import ToastContext from "@/contexts/ToastContext";
import { useContext, useState } from "react";
import useField from "./useField";
import { createRoom, uploadProfileImage } from "@/services/RoomService";
import { useRouter } from "next/router";

export default function useCreateRoom() {
    const router = useRouter();
    const toastManager = useContext(ToastContext);

    const nameField = useField("");
    const bioField = useField("");
    const categoryField = useField("");
    const privacyField = useField("");
    const passwordField = useField("");
    const profileImageField = useField<File>(null);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function createRoomHandler(): Promise<void> {
        setIsLoading(true);
        setErrors({});

        let hasErrors = false;
        if (nameField.value.length == 0) {
            setErrors(state => ({ ...state, name: "Name field is required." }));
            hasErrors = true;
        }

        if (bioField.value.length == 0) {
            setErrors(state => ({ ...state, bio: "Bio field is required." }));
            hasErrors = true;
        }

        if (privacyField.value.length == 0) {
            setErrors(state => ({ ...state, privacy: "Privacy field is required." }));
            hasErrors = true;
        }

        if (privacyField.value == "private" && passwordField.value.length == 0) {
            setErrors(state => ({ ...state, password: "The room privacy is set to private so Password field is required." }));
            hasErrors = true;
        }

        if (categoryField.value.length == 0) {
            setErrors(state => ({ ...state, category: "Category field is required." }));
            hasErrors = true;
        }

        if (hasErrors) {
            setIsLoading(false);
            return;
        }

        const result = await createRoom(
            nameField.value,
            bioField.value,
            [{ _ref: categoryField.value, _type: "reference" }],
            privacyField.value as RoomPrivacy,
            passwordField.value,
        );
        if (result.isSuccess()) {
            const room = result.value;
            if (profileImageField.value) {
                await uploadProfileImage(room._id, profileImageField.value);
            }

            toastManager.alertSuccess("Room created successfully");
            router.push(`/room/${room._id}`);
        } else {
            setErrors(result.error);
        }

        setIsLoading(false);
    }

    return {
        fields: {
            name: nameField,
            bio: bioField,
            category: categoryField,
            privacy: privacyField,
            password: passwordField,
            profileImage: profileImageField,
        },
        createRoomHandler,
        isLoading,
        errors,
    };
}