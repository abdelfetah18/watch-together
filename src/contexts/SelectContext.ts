import { createContext } from "react";

interface Item {
    id: string;
    value: string;
}

type CreateRoomContextType = {
    currentSelectedItem: Item;
    showAll: boolean;
    select: (item: Item) => void;
};

export default createContext<CreateRoomContextType | null>(null);