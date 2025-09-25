import { createContext } from "react";

export default createContext<User>({
    _id: "",
    profile_image: {
        url: "",
    },
    username: "",
});