import { useMe } from "../hooks/useMe";
import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmail } from "../services/userService";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { logout } from "../services/authService";

export default function EmailVerification() {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useMe();
  const { logout: userLogout } = useUserStore();
  const { logout: authLogout } = useAuthStore();

  const [cooldown, setCooldown] = useState(0);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogout = async () => {
    await logout();
    userLogout();
    authLogout();
    navigate("/login", { replace: true });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => sendVerificationEmail(user!.email),
    onSuccess: () => {
      setCooldown(30);
      setSnackbar({
        open: true,
        message:
          "Verification email sent. Please check your inbox and spam folder.",
        severity: "success",
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Failed to send verification email",
        severity: "error",
      });
    },
  });

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbar((s) => ({ ...s, open: false }));
  };

  if (isLoading) {
    return <div className="mt-24 text-center">Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isEmailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center mt-24 max-w-md mx-auto">
        <h1 className="text-xl font-medium">Verify your email</h1>
        <p className="text-gray-400 text-center">
          In order to access the system, please verify your email address. Press
          button below to send the verification email.
        </p>
        <p className="text-center">
          You will have 5 minutes to verify your email after receiving the
          email.
        </p>
        <p className="text-gray-600 text-center">{user.email}</p>

        <button
          disabled={cooldown > 0 || isPending}
          onClick={() => mutate()}
          className="px-4 py-2 rounded-none bg-black text-white disabled:opacity-50"
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : isPending
            ? "Sending..."
            : "Send verification email"}
        </button>

        <button className="hover:underline hover:cursor-pointer" onClick={handleLogout}>
          Log out
        </button>

        {cooldown > 0 && (
          <p className="text-xs text-gray-500">
            You can request another email after the timer ends
          </p>
        )}
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
