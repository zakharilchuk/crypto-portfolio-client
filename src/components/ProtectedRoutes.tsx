import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useMe } from "../hooks/useMe";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { type JSX } from "react";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const { data: user, isLoading, isError } = useMe();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isEmailVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  return element;
};

export default ProtectedRoute;
