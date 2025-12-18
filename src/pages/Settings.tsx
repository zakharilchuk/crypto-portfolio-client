import MainLayout from "../layouts/MainLayout";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../services/userService";
import { useMe } from "../hooks/useMe";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";
import { deleteUserAccount } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface FormData {
  name: string;
  email: string;
}

export default function Settings() {
  const { data: user, isLoading } = useMe();
  const queryClient = useQueryClient();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "success" });

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const deleteMutation = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      logout();
      navigate("/signup", { replace: true });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    values: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async () => {
      setSnackbar({
        open: true,
        message:
          "Profile updated. If you changed your email, please verify it again.",
        severity: "success",
      });

      await queryClient.invalidateQueries({ queryKey: ["me"] });
      reset(undefined, { keepValues: true });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  if (isLoading || !user) {
    return <div className="ml-64 py-10">Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="ml-64 py-10 px-25 max-w-xl">
        <h1 className="text-2xl mb-2">Settings</h1>

        <p className="text-gray-400 mb-6">
          Manage your personal details. Changing email requires verification.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Changing your email will log you out from protected pages until
            verification.
          </p>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isDirty || isPending}
            className="bg-black text-white px-4 py-2 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </form>
        <button
          className="hover:text-red-500 hover:cursor-pointer hover:underline mt-6"
          onClick={() => setDeleteOpen(true)}
        >
          Delete account
        </button>
        <DeleteAccountModal
          isOpen={isDeleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={() => deleteMutation.mutate()}
          isLoading={deleteMutation.isPending}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </MainLayout>
  );
}
