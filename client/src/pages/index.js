import { lazy } from "react";

const ChatPage=lazy(()=>import("./chat-page/ChatScreen.jsx"))
const LoginPage = lazy(() => import("./auth/Login.jsx"));
const RegisterPage= lazy(()=>import("./auth/Registration.jsx"))

export { ChatPage,LoginPage,RegisterPage};