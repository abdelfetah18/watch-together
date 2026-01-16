import Navigation from "@/components/my_profile/Navigation"
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { search } from "@/services/RoomService";
import RoomsList from "@/components/room/RoomsList";
import RoomsListSkeleton from "@/components/room/RoomsListSkeleton";
import App from "@/components/Layout/App";

export default function Search() {
    const [isLoading, setIsLoading] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [query, setQuery] = useState("");

    function onSubmit(ev) {
        ev.preventDefault();
        searchRooms();
    }

    async function searchRooms() {
        setIsLoading(true);
        const result = await search(query);
        if (result.isSuccess()) {
            setRooms(result.value);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        searchRooms();
    }, []);

    return (
        <App title="search">
            <Navigation selected_label={"Search"} />
            <div className="w-4/5 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-11/12 h-full flex flex-col gap-8">
                    <div className="w-full text-xl font-medium text-gray-900 dark:text-gray-50">Search</div>
                    <form onSubmit={onSubmit} className="w-1/3 flex items-center py-2 px-4 rounded-lg bg-gray-100 dark:bg-dark-gray-bg">
                        <FaSearch className="text-gray-300 dark:text-gray-400 mr-4" />
                        <input
                            className="flex-grow text-sm bg-transparent text-gray-900 dark:text-gray-50 placeholder:text-gray-300 dark:placeholder:text-gray-400 outline-none"
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(ev) => setQuery(ev.target.value)}
                        />
                    </form>
                    <div className="w-full flex flex-row flex-wrap">
                        {!isLoading && rooms.length == 0 && (<div className="text-sm">No Room found</div>)}
                        {isLoading ? <RoomsListSkeleton /> : <RoomsList rooms={rooms} />}
                    </div>
                </div>
            </div>
        </App>
    )
}