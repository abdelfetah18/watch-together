import { useRoomReturn } from "@/hooks/useRoom";
import { createContext } from "react";

export default createContext<useRoomReturn>({
    addCategory: () => { },
    createRoom: () => { },
    getInviteUrl: async () => { return ""; },
    getRoomById: (room_id) => { room_id; },
    onSelectImage: (image) => { image; },
    removeCategory: (category) => { category; },
    setBio: (bio) => { bio; },
    setName: (name) => { name; },
    setPassword: (password) => { password; },
    setPrivacy: (privacy) => { privacy; },
    updateRoom: () => { },
    room: { bio: '', categories: [], name: '', privacy: 'public', profile_image: null, total_members: 0 },
    selectedCategory: { name: '' },
    setRoom: () => { },
    setSelectedCategory: () => { },
});