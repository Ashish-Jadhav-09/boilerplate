import { lazy } from "react";
import { constants, routes } from "../config/constant";

const Login = lazy(() => import("../pages/login/login"));
const RegisterUser = lazy(() => import("../pages/registerUser/registerUser"));
const AdminDashboard = lazy(() =>
  import("../pages/admin/adminDashboard/adminDashboard")
);
const UserManagement = lazy(() =>
  import("../pages/admin/userManagement/userManagement")
);
const UserDashboard = lazy(() => import("../pages/dashboard/dashboard"));
const Profile = lazy(() => import("../pages/profile/profile"));
const NotFoundRoute = lazy(() =>
  import("../pages/notFoundRoute/notFoundRoute")
);

export const pages = [
  {
    path: routes.LOGIN,
    Component: Login,
    isPrivate: false,
    key: 1,
  },
  {
    path: routes.REGISTER_USER,
    Component: RegisterUser,
    isPrivate: false,
    key: 2,
  },
  {
    path: routes.ADMIN_DASHBOARD,
    Component: AdminDashboard,
    isPrivate: true,
    roles: [constants.admin],
    key: 3,
  },
  {
    path: routes.ADMIN_USER_MANAGEMENT,
    Component: UserManagement,
    isPrivate: true,
    roles: [constants.admin],
    key: 4,
  },
  {
    path: routes.USER_DASHBOARD,
    Component: UserDashboard,
    isPrivate: true,
    roles: [constants.general],
    key: 5,
  },
  {
    path: routes.PROFILE,
    Component: Profile,
    isPrivate: true,
    roles: [constants.admin, constants.general],
    key: 6,
  },
  {
    path: routes.NOT_FOUND_ROUTE,
    Component: NotFoundRoute,
    isPrivate: true,
    roles: [constants.admin, constants.general],
    key: 7,
  },
];
