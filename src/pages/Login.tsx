import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import SubmitButtonForm from "../components/SubmitButtonForm";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | undefined>();
  const { setAccessToken } = useAuthStore();
  const { mutate } = useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      setAccessToken(data.accessToken);
      navigate("/dashboard");
    },
    onError: (error: { message: string }) => {
      setApiError(error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-24">
      <Link to="/" className="text-3xl">
        CoinView
      </Link>
      <p className="text-gray-500">
        Enter your email and password to access your account.
      </p>
      <p className="text-xl font-medium">Login</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 max-w-sm mx-auto w-full"
      >
        <InputForm
          type="email"
          placeholder="Email"
          register={register("email", {
            required: {
              value: true,
              message: "Email is required.",
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email address.",
            },
          })}
          error={errors.email?.message}
        />
        <InputForm
          type="password"
          placeholder="Password"
          register={register("password", {
            required: {
              value: true,
              message: "Password is required.",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              message:
                "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character.",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          })}
          error={errors.password?.message}
        />
        <div className="w-full">
          {apiError && <span className="text-red-500 text-sm">{apiError}</span>}
        </div>
        <SubmitButtonForm text="Login" />
      </form>
      <span>or</span>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-balance hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
