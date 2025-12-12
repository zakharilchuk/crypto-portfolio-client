import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import Portfolios from "./pages/Portfolios.tsx";
import Settings from "./pages/Settings.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";

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
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<DashboardPage />} />
  },
  {
    path: "/portfolios",
    element: <ProtectedRoute element={<Portfolios />} />
  },
  {
    path: "/settings",
    element: <ProtectedRoute element={<Settings />} />
  }
]);

export default router;
