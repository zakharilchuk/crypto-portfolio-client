import { useSearchParams, Navigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmail } from "../services/userService";
import { useEffect } from "react";

function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  useEffect(() => {
    if (token) mutate(token);
  }, [token]);

  if (!token) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isSuccess) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isError) {
    return <div>Verification failed</div>;
  }

  return <div>Verifying...</div>;
}

export default VerifyEmail;
