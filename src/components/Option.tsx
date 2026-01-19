import SelectContext from "@/contexts/SelectContext"
import { useContext } from "react"

export default function Option({ id, value }) {
    const { currentSelectedItem, showAll, select } = useContext(SelectContext);


    if (showAll) {
        return (
            <div
                onClick={() => { select({ id, value }); }}
                className={`
                    w-full hover:bg-zinc-700 cursor-pointer px-4 py-2 text-gray-50
                    ${currentSelectedItem.id == id ? "bg-zinc-700" : ""}
                    `}
            >{value}</div>
        );
    }

    return null;
}