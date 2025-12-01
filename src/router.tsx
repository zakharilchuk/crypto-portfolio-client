import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;
