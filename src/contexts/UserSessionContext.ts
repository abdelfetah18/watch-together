import { createContext } from "react";

export default createContext<UserSession>({ user_id: '', access_token: '', username: '' });