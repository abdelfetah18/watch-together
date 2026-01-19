import CreateRoomContext from "@/contexts/CreateRoomContext";
import { useContext } from "react";

export default function CreateRoomFormFooter() {
    const { next, back, create, isFirstStep, isLastStep } = useContext(CreateRoomContext);

    return (
        <div className="w-full flex items-center gap-2 justify-end">
            {!isFirstStep && (
                <div onClick={back} className="bg-zinc-700 hover:bg-zinc-600 cursor-pointer text-gray-50 rounded-lg w-40 py-2 text-center">Back</div>
            )}
            {!isLastStep && (
                <div onClick={next} className="bg-primary-color hover:bg-indigo-600 cursor-pointer text-gray-50 rounded-lg w-40 py-2 text-center">Next</div>
            )}
            {isLastStep && (
                <div onClick={create} className="bg-primary-color hover:bg-indigo-600 cursor-pointer text-gray-50 rounded-lg w-40 py-2 text-center">Create</div>
            )}
        </div>
    );
}