import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./user/HeroSection";
import MainLayout from "./Layout/MainLayout";
import Profile from "./user/Profile";
import Dashboard from "./user/Dashboard";
import SearchPOI from "./user/SearchPOI";
import Decrypt from "./user/Decrypt";
import History from "./user/History";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/searchpoi",
        element: <SearchPOI />,
      },
      {
        path: "/decrypt",
        element: <Decrypt />,
      },
      {
        path: "/history",
        element: <History />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);
function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
