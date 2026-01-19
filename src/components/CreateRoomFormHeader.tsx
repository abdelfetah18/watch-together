import CreateRoomContext from "@/contexts/CreateRoomContext";
import { useContext } from "react";
import { CreateRoomStepState } from "./CreateRoomForm";

export default function CreateRoomFormHeader() {
    const { currentStep, steps } = useContext(CreateRoomContext);

    return (
        <div className="flex flex-col gap-2">
            <div className="w-fit flex items-center">
                {
                    steps.map((step, index) => {
                        const isLast = index == steps.length - 1;
                        return (
                            <>
                                <CreateRoomStep index={index + 1} title={step.title} state={step.state} />
                                {!isLast && step.state == CreateRoomStepState.Done && (<div className="w-4 h-1 bg-primary-color"></div>)}
                                {!isLast && (step.state == CreateRoomStepState.Active || step.state == CreateRoomStepState.Disabled) && (<div className="w-4 h-1 bg-zinc-800"></div>)}
                            </>
                        )
                    })
                }
            </div>
            <div className="text-sm text-gray-500">{currentStep.description}</div>
        </div>
    );
}


function CreateRoomStep({ index, title, state }) {
    if (state == CreateRoomStepState.Done) {
        return (
            <div className="w-4 h-4 bg-primary-color rounded-full z-0"></div>
        );
    }

    if (state == CreateRoomStepState.Disabled) {
        return (
            <div className="w-4 h-4 bg-zinc-800 rounded-full z-0"></div>
        );
    }

    return (
        <div className="flex items-center gap-2 bg-primary-color rounded-full p-1 pr-4 z-0">
            <div className="text-black bg-gray-50 rounded-full h-6 w-6 text-center">{index}</div>
            <div className="text-gray-50">{title}</div>
        </div>
    );
}