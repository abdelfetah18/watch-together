import Navigation from "@/components/my_profile/Navigation"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Room from "@/components/room/Room";

export default function Search() {
    const [rooms, setRooms] = useState([]);
    const [query, setQuery] = useState("");

    async function Search() {
        let response = await axios.get("/api/search?query=" + query);
        if (response.data.status == "success") {
            setRooms(response.data.data);
        }
    }

    async function onPress(event) {
        if (event.code == "Enter") {
            Search();
        }
    }

    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-row">
            <Navigation selected_label={"Search"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-11/12 h-full flex flex-col">
                    <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">Search</div>
                    <div className="w-1/3 my-8 flex items-center py-2 px-4 rounded-lg bg-gray-100 dark:bg-dark-gray-bg">
                        <FaSearch className="text-gray-300 dark:text-gray-400 mr-4" />
                        <input className="flex-grow text-sm bg-transparent text-gray-900 placeholder:text-gray-300 dark:placeholder:text-gray-400 outline-none" type="text" placeholder="Search..." value={query} onChange={(ev) => setQuery(ev.target.value)} onKeyDown={onPress} />
                    </div>
                    <div className="w-full flex flex-row flex-wrap my-4">
                        {
                            rooms.map((room, index) => {
                                return (
                                    <div className="w-1/4 flex flex-col mb-4">
                                        <Room key={index} room={room} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}