import Login from '../Pages/Login'
import Signup from "../Pages/Signup";
import ForgotPassword from "../Pages/ForgotPassword";
import Dashboard from "../Pages/Dashboard";
import UpdatePassword from '../Pages/UpdatePassword';

export  const ROUTES = [
  {
    title: "Sign In",
    Component:Login,
    path: "/",
  },
  {
    title: "Sign Up",
    Component:Signup,
    path: "/signup",
  },
  {
    title: "Reset Password",
    Component:ForgotPassword,
    path: "/forgotPassword",
  },
  {
    title: "Reset Password",
    Component:UpdatePassword,
    path: "/resetPassword/:id/:token",
  },
];

export const PrivateRoutes=[
  {
    title: "Dashboard",
    Component: Dashboard,
    path: "/Dashboard",
  },
];

export default {ROUTES,PrivateRoutes};