import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { JSX } from "react";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
