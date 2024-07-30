import { lazy } from "react";

const HomePage=lazy(()=>import("./Home.jsx"))
const LoginPage = lazy(() => import("./auth/Login.jsx"));
const RegisterPage= lazy(()=>import("./auth/Registration.jsx"))

export { HomePage,LoginPage,RegisterPage};