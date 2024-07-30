import { HomePage, LoginPage, RegisterPage } from "../pages";
import { homePath, loginPath, registerPath } from "./route.constant";

const routes = [
  {
    path: homePath,
    component: HomePage,
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
];

export default routes;
