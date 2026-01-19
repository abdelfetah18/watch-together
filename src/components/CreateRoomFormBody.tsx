import CreateRoomContext from "@/contexts/CreateRoomContext";
import { useContext, useEffect } from "react";
import CreateRoomStep from "./CreateRoomStep";
import Select from "./Select";
import Option from "./Option";
import Input from "./Input";
import TextArea from "./TextArea";
import useRoomCategories from "@/hooks/useRoomCategories";
import ImageUpload from "./ImageUpload";

export default function CreateRoomFormBody() {
    const { roomCategories } = useRoomCategories();
    const { fields, errors, goToStep } = useContext(CreateRoomContext);

    useEffect(() => {
        if (errors["name"]) {
            goToStep(0);
            return;
        }

        if (errors["bio"]) {
            goToStep(1);
            return;
        }

        if (errors["category"]) {
            goToStep(2);
            return;
        }

        if (errors["privacy"] || errors["password"]) {
            goToStep(3);
            return;
        }
    }, [errors]);

    return (
        <div className="w-full flex-grow flex flex-col">
            <CreateRoomStep index={0}>
                <div className="w-full grid grid-cols-4 gap-y-8 gap-x-4">
                    <div className="col-span-1">
                        <div className="text-gray-50">Profile Picture</div>
                        <div className="text-gray-400 text-xs">{"An image to help users quickly recognize the room."}</div>
                    </div>
                    <div className="col-span-3">
                        <ImageUpload bind={fields.profileImage} defaultImageURL="/profile_4_3.png" />
                    </div>
                    <div className="col-span-1">
                        <div className="text-gray-50">Name</div>
                        <div className="text-gray-400 text-xs">{"A unique name that tells users what the room is about."}</div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-2">
                        <Input bind={fields.name} type="text" placeholder="Enter a name" errorMessage={errors["name"]} />
                    </div>
                </div>
            </CreateRoomStep>

            <CreateRoomStep index={1}>
                <div className="w-full grid grid-cols-4 gap-y-8 gap-x-4">
                    <div className="col-span-1">
                        <div className="text-gray-50">Bio</div>
                        <div className="text-gray-400 text-xs">{"A short explanation of the content or purpose."}</div>
                    </div>
                    <div className="col-span-3">
                        <TextArea bind={fields.bio} rows={6} placeholder="Enter a bio" errorMessage={errors["bio"]} />
                    </div>
                </div>
            </CreateRoomStep>

            <CreateRoomStep index={2}>
                <div className="w-full grid grid-cols-4 gap-y-8 gap-x-4">
                    <div className="col-span-1">
                        <div className="text-gray-50">Category</div>
                        <div className="text-gray-400 text-xs">{"Choose one of the available categories."}</div>
                    </div>
                    <div className="col-span-3">
                        <div>
                            <Select bind={fields.category} errorMessage={errors["category"]}>
                                {
                                    roomCategories.map((category, index) => {
                                        return (
                                            <Option key={index} id={category._id} value={category.name} />
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                </div>
            </CreateRoomStep>

            <CreateRoomStep index={3}>
                <div className="w-full grid grid-cols-4 gap-y-8 gap-x-4">
                    <div className="col-span-1">
                        <div className="text-gray-50">Visibility</div>
                        <div className="text-gray-400 text-xs">{"Public is open to everyone. private is restricted."}</div>
                    </div>
                    <div className="col-span-3">
                        <Select bind={fields.privacy} errorMessage={errors["privacy"]}>
                            <Option id={"public"} value={"public"} />
                            <Option id={"private"} value={"private"} />
                        </Select>
                    </div>
                    {fields.privacy.value == "private" && (
                        <>
                            <div className="col-span-1">
                                <div className="text-gray-50">Password</div>
                                <div className="text-gray-400 text-xs">{"Required to join the room."}</div>
                            </div>
                            <div className="col-span-3">
                                <Input bind={fields.password} type="password" placeholder="Enter a password" errorMessage={errors["password"]} />
                            </div>
                        </>
                    )}
                </div>
            </CreateRoomStep>
        </div>
    );
}