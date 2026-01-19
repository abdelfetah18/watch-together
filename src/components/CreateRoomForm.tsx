import CreateRoomContext from "@/contexts/CreateRoomContext";
import useCreateRoom from "@/hooks/useCreateRoom";
import { useState } from "react";
import LoadingComponent from "./LoadingComponent";

export enum CreateRoomStepState {
    Done,
    Disabled,
    Active,
}

export interface CreateRoomStep {
    title: string;
    description: string;
    state: CreateRoomStepState;
}

export default function CreateRoomForm({ children }) {
    const { fields, createRoomHandler, errors, isLoading } = useCreateRoom();

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [steps, setSteps] = useState<CreateRoomStep[]>([
        {
            title: "Basic Details",
            description: "Enter the main details of your room.",
            state: CreateRoomStepState.Active,
        },
        {
            title: "Description",
            description: "Explain what this space is for.",
            state: CreateRoomStepState.Disabled,
        },
        {
            title: "Category",
            description: "Help users find this space more easily.",
            state: CreateRoomStepState.Disabled,
        },
        {
            title: "Privacy & Access",
            description: "Decide who can join.",
            state: CreateRoomStepState.Disabled,
        },
    ]);

    const currentStep = steps[currentStepIndex];
    const isLastStep = currentStepIndex == steps.length - 1;
    const isFirstStep = currentStepIndex == 0;

    const next = (): void => {
        setCurrentStepIndex(state => {
            setSteps(steps => {
                steps[state].state = CreateRoomStepState.Done;

                if (state == steps.length - 1) {
                    return steps;
                }

                steps[state + 1].state = CreateRoomStepState.Active;

                return steps;
            });

            if (state == steps.length - 1) {
                return state;
            }
            return state + 1;
        });
    }

    const back = (): void => {
        setCurrentStepIndex(state => {
            setSteps(steps => {
                if (state == 0) {
                    return steps;
                }
                steps[state].state = CreateRoomStepState.Disabled;
                steps[state - 1].state = CreateRoomStepState.Active;
                return steps;
            });

            if (state == 0) {
                return state;
            }
            return state - 1;
        });
    }

    const create = createRoomHandler;

    const goToStep = (stepIndex: number): void => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setCurrentStepIndex(stepIndex);
            setSteps(state => {
                for (let i = 0; i < state.length; i++) {
                    let stepState = CreateRoomStepState.Disabled;

                    if (i == stepIndex) {
                        stepState = CreateRoomStepState.Active;
                    }

                    if (i < stepIndex) {
                        stepState = CreateRoomStepState.Done;
                    }

                    state[i].state = stepState;
                }

                return state;
            });
        }
    }

    return (
        <CreateRoomContext.Provider value={{
            currentStepIndex,
            isFirstStep, isLastStep,
            currentStep, goToStep, steps,
            next, back, create,
            fields, errors,
        }}>
            {isLoading && <LoadingComponent />}
            <div className="w-full flex-grow flex flex-col gap-16">
                {children}
            </div>
        </CreateRoomContext.Provider>
    )
}