import { ChatPage, LoginPage, RegisterPage } from "../pages";
import UsersList from "../pages/UsersList";
import { chatPath, loginPath, registerPath, userslistPath } from "./route.constant";

const routes = [
  {
    path: chatPath,
    component: ChatPage,
    exact: true,
  },
  {
    path: loginPath,
    component: LoginPage,
    exact: true,
  },
  {
    path: registerPath,
    component: RegisterPage,
    exact: true,
  },
  {
    path: userslistPath,
    component: UsersList,
    exact: true,
  },

];

export default routes;
