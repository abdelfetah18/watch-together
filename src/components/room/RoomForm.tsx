import Navigation from "@/components/my_profile/Navigation"
import Room from "@/components/room/Room";
import { FaEye, FaTimes } from "react-icons/fa";
import useRoom from "@/hooks/useRoom";
import { useEffect, useRef } from "react";
import useRoomCategories from "@/hooks/useRoomCategories";
import { useRouter } from "next/router";

const initRoom: Room = { name: '', bio: '', profile_image: null, total_members: 37, categories: [], privacy: 'public', password: '' };

interface RoomFormProps {
    isEditState: boolean;
};

export default function RoomForm({ isEditState }: RoomFormProps) {
    const router = useRouter();
    const { room, setName, setBio, setPrivacy, setPassword, setSelectedCategory, addCategory, removeCategory, onSelectImage, createRoom, updateRoom, getRoomById } = useRoom(initRoom);
    const { roomCategories } = useRoomCategories();
    const roomImageRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (isEditState) {
            let room_id = router.query.room_id;
            if (room_id) {
                getRoomById(room_id.toString());
            }
        }
    }, [router.query]);

    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-row">
            <Navigation selected_label={"Create Room"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-11/12 flex-grow flex flex-col">
                    <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">Create Room</div>
                    <div className="w-full flex flex-row my-20">
                        <div className="w-2/3 flex flex-col">
                            <input onChange={(ev) => { onSelectImage(ev.target.files[0]); }} ref={roomImageRef} hidden type="file" accept="image/*" />
                            <div onClick={() => { if (roomImageRef.current) { roomImageRef.current.click() } }} className="h-40 w-11/12 border-gray-300 text-gray-300 border-2 border-dashed rounded-lg flex items-center justify-center mb-4 cursor-pointer">Click Or Drop your Profile Picture Here</div>
                            <input onChange={(ev) => setName(ev.target.value)} value={room.name} className="w-11/12 px-4 text-gray-900 dark:text-gray-50 placeholder:text-gray-300 dark:placeholder:text-gray-500 bg-gray-100 dark:bg-dark-gray-bg rounded-lg py-2 mb-4 outline-none" type="text" placeholder="Name" />
                            <input onChange={(ev) => setBio(ev.target.value)} value={room.bio} className="w-11/12 px-4 text-gray-900 dark:text-gray-50 placeholder:text-gray-300 dark:placeholder:text-gray-500 bg-gray-100 dark:bg-dark-gray-bg rounded-lg py-2 mb-4 outline-none" type="text" placeholder="Bio" />
                            <select onChange={(ev) => setPrivacy(ev.target.value as RoomPrivacy)} value={room.privacy} placeholder="Select Category" className="w-11/12 px-4 py-2 text-gray-900 dark:text-gray-50 placeholder:text-gray-300 bg-gray-100 dark:bg-dark-gray-bg rounded-lg outline-none mb-4">
                                <option disabled>Select Privacy</option>
                                <option value={'public'}>Public</option>
                                <option value={'private'}>Private</option>
                            </select>
                            {room.privacy == 'private' && (<PasswordInput password={room.password} setPassword={setPassword} />)}
                            <div className="w-11/12 flex items-center mb-4">
                                <select onChange={(ev) => { setSelectedCategory(roomCategories.find(value => value.name == ev.target.value)) }} placeholder="Select Category" className="flex-grow px-4 py-2 text-gray-900 dark:text-gray-50 placeholder:text-gray-300 bg-gray-100 dark:bg-dark-gray-bg rounded-lg outline-none">
                                    <option disabled>Select Category</option>
                                    {
                                        roomCategories.map((c, index) => {
                                            return (<option key={index}>{c.name}</option>)
                                        })
                                    }
                                </select>
                                <button onClick={addCategory} className="h-full px-12 ml-4 bg-green-800 text-gray-50 rounded-full">Add</button>
                            </div>
                            <div className="w-11/12 flex items-center flex-wrap mb-8">
                                {
                                    // NOTE: ALLOW ONLY 5 Categories for a room
                                    room.categories.map((category, index) => {
                                        const onClick = () => {
                                            removeCategory(category);
                                        }

                                        return (
                                            <div key={index} className="flex  items-center text-xs bg-gray-300 dark:bg-gray-600 text-gray-50 rounded-full px-2 mr-1 mb-1">{category.name} <FaTimes onClick={onClick} className="ml-2 cursor-pointer hover:text-gray-500" /></div>
                                        )
                                    })
                                }
                            </div>
                            <button onClick={isEditState ? updateRoom : createRoom} className="w-11/12 py-2 rounded-full text-gray-50 bg-primary-color">{isEditState ? "Update" : "Create new room"}</button>
                        </div>
                        <div className="w-1/3 flex flex-col">
                            <Room room={room} joinRoom={() => { }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PasswordInput = ({ setPassword, password }) => {
    const inputRef = useRef<HTMLInputElement>();

    const togglePassword = () => {
        if (inputRef.current.type == 'password') {
            inputRef.current.type = 'text';
        } else {
            inputRef.current.type = 'password';
        }
    }

    return (
        <div className="w-11/12 bg-gray-100 text-gray-900 dark:text-gray-50 flex items-center dark:bg-gray-800 rounded-lg px-4 mb-4">
            <input ref={inputRef} onChange={(ev) => setPassword(ev.target.value)} value={password} className="flex-grow bg-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 py-2 outline-none" type="password" placeholder="Password" />
            <FaEye className="cursor-pointer hover:text-gray-400 select-none" onClick={togglePassword} />
        </div>
    )
}