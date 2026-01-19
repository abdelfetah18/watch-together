import CreateRoomContext from "@/contexts/CreateRoomContext";
import { ReactNode, useContext } from "react";

type CreateRoomStepProps = {
    index: number;
    children: ReactNode;
};

export default function CreateRoomStep({ index, children }: CreateRoomStepProps) {
    const { currentStepIndex } = useContext(CreateRoomContext);

    if (currentStepIndex !== index) return null;

    return <>{children}</>;
}