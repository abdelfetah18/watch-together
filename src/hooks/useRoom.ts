import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import useAxios from "./useAxios";
import ToastContext from "@/contexts/ToastContext";
import LoadingContext from "@/contexts/LoadingContext";

const placeholderRoom: Room = {
    bio: '',
    categories: [],
    name: '',
    privacy: 'public',
    profile_image: null,
    total_members: 0,
    admin: { _id: '', username: '', profile_image: null }
};

export interface useRoomReturn {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
    setName: (name: string) => void;
    setBio: (bio: string) => void;
    setPrivacy: (privacy: RoomPrivacy) => void;
    setPassword: (password: string) => void;
    addCategory: () => void;
    removeCategory: (category: RoomCategory) => void;
    selectedCategory: RoomCategory;
    setSelectedCategory: Dispatch<SetStateAction<RoomCategory>>;
    onSelectImage: (image: File) => void;
    createRoom: () => void;
    updateRoom: () => void;
    getRoomById: (room_id: string) => void;
    getInviteUrl: () => Promise<string>;
};

export default function useRoom(init?: Room,loading?: boolean) {
    const [isLoading, setIsLoading] = useState<boolean>(loading == undefined ? false : true);
    const toastManager = useContext(ToastContext);
    const { show, hide } = useContext(LoadingContext);
    const axios = useAxios();
    const [room, setRoom] = useState<Room>(init || placeholderRoom);
    const [selectedCategory, setSelectedCategory] = useState<RoomCategory>(null);
    const profileImageFile = useRef<File>(null);

    const setName = (name: string): void => { setRoom(state => ({ ...state, name })); }

    const setBio = (bio: string) => { setRoom(state => ({ ...state, bio })); }

    const setPrivacy = (privacy: RoomPrivacy) => { setRoom(state => ({ ...state, privacy })); }

    const setPassword = (password: string) => { setRoom(state => ({ ...state, password })); }

    const addCategory = () => {
        if (selectedCategory) {
            setRoom(state => {
                let array = [...state.categories];
                if (!array.includes(selectedCategory)) {
                    return {
                        ...state, categories: [...array, selectedCategory]
                    }
                }
                return state;
            });
        }
    }

    const removeCategory = (category: RoomCategory) => { setRoom(state => ({ ...state, categories: state.categories.filter(c => c != category) })); }

    const createRoom = () => {
        show();
        axios.post<HttpResponseData<Room>, Room>('/api/room/create', room).then(response => {
            if (response.status == 'success') {
                if (profileImageFile.current) {
                    // Upload profile image
                    uploadProfileImage(response.data._id);
                } else {
                    hide();
                    toastManager.alertSuccess('Room created successfuly');
                    location.pathname = `/room/${response.data._id}`;
                }
            } else {
                hide();
                let errors = response.data;
                let time = 0;
                for (let error of errors) {
                    setTimeout(() => {
                        toastManager.alertError(error);
                    }, time);
                    time += 300;
                }
            }
        });
    }

    const updateRoom = () => {
        show();
        axios.post<HttpResponseData<Room>, Room>('/api/room/edit', room).then(response => {
            if (response.status == 'success') {
                if (profileImageFile.current) {
                    // Upload profile image
                    uploadProfileImage(room._id);
                } else {
                    hide();
                    toastManager.alertSuccess('Room created successfuly');
                    location.pathname = `/room/${response.data._id}`;
                }
            } else {
                hide();
                let errors = response.data;
                let time = 0;
                for (let error of errors) {
                    setTimeout(() => {
                        toastManager.alertError(error);
                    }, time);
                    time += 300;
                }
            }
        });
    }


    function uploadProfileImage(room_id: string) {
        let form = new FormData();
        form.append("room_id", room_id);
        form.append("profile_image", profileImageFile.current);
        axios.post<HttpResponseData<Asset>, FormData>("/api/room/upload_profile_image", form).then(() => {
            hide();
            toastManager.alertSuccess('Room created successfuly');
            location.pathname = `/room/${room_id}`;
        });
    }

    const onSelectImage = (image: File) => {
        profileImageFile.current = image;
        let image_url = URL.createObjectURL(image);
        setRoom(state => ({ ...state, profile_image: { url: image_url } }));
    }

    const getRoomById = (room_id: string) => {
        axios.get<HttpResponseData<Room>>(`/api/room/${room_id}`).then(response => {
            if (response.status == 'success') {
                setRoom(response.data);
                setIsLoading(false);
            }
        });
    }

    const getInviteUrl = async (): Promise<string> => {
        const response = await axios.post<HttpResponseData<string>, { room_id: string }>("/api/room/invite_url", { room_id: room._id });
        if (response.status == 'success') {
            navigator.clipboard.writeText(response.data);
            toastManager.alertSuccess("Invite url copied.");
            return response.data;
        }

        return '';
    }

    return {
        room,
        setRoom,
        setName,
        setBio,
        setPrivacy,
        setPassword,
        addCategory,
        removeCategory,
        selectedCategory,
        setSelectedCategory,
        onSelectImage,
        createRoom,
        updateRoom,
        getRoomById,
        getInviteUrl,
        isLoading
    };
}