import Navigation from "@/components/my_profile/Navigation"
import App from "@/components/Layout/App";
import CreateRoomForm from "@/components/CreateRoomForm";
import CreateRoomFormHeader from "@/components/CreateRoomFormHeader";
import CreateRoomFormFooter from "@/components/CreateRoomFormFooter";
import CreateRoomFormBody from "@/components/CreateRoomFormBody";

export default function CreateRoom() {
    return (
        <App title="create room">
            <Navigation selected_label={"Create Room"} />
            <div className="w-4/5 h-full flex flex-col items-center px-8 py-4 overflow-auto">
                <div className="w-full h-full flex flex-col gap-8">
                    <div className="w-full text-2xl font-medium text-gray-900 dark:text-gray-50">Create Room</div>
                    <CreateRoomForm>
                        <CreateRoomFormHeader />
                        <CreateRoomFormBody />
                        <CreateRoomFormFooter />
                    </CreateRoomForm>
                </div>
            </div>
        </App>
    )
}
