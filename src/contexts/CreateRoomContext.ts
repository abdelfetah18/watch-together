import { CreateRoomStep } from "@/components/CreateRoomForm";
import { FieldBind } from "@/hooks/useField";
import { createContext } from "react";

type CreateRoomContextType = {
    currentStepIndex: number;
    currentStep: CreateRoomStep;
    steps: CreateRoomStep[];
    isFirstStep: boolean;
    isLastStep: boolean;
    next: () => void;
    back: () => void;
    create: () => Promise<void>;
    goToStep: (stepIndex: number) => void;
    fields: {
        name: FieldBind<string>;
        bio: FieldBind<string>;
        category: FieldBind<string>;
        privacy: FieldBind<string>;
        password: FieldBind<string>;
        profileImage: FieldBind<File | null>;
    };
    errors: {
        name?: string;
        bio?: string;
        category?: string;
        privacy?: string;
        password?: string;
    };
};

export default createContext<CreateRoomContextType | null>(null);