import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";
import SubmitButtonForm from "../components/SubmitButtonForm";
import { useForm } from "react-hook-form";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    // Handle the signup logic here
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-24">
      <Link to="/" className="text-3xl">
        CoinView
      </Link>
      <p className="text-gray-500">
        Enter your details to create account and get started.
      </p>
      <p className="text-xl font-medium">Sign up</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 max-w-sm mx-auto w-full"
      >
        <InputForm
          type="text"
          placeholder="Name"
          register={register("name", {
            required: {
              value: true,
              message: "Name is required.",
            },
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long.",
            },
          })}
          error={errors.name?.message}
        />
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
                  'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character.',
              },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          })}
          error={errors.password?.message}
        />
        <InputForm
          type="password"
          placeholder="Confirm Password"
          register={register("confirmPassword", {
            required: {
              value: true,
              message: "Please confirm your password.",
            },
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match.",
          })}
          error={errors.confirmPassword?.message}
        />
        <SubmitButtonForm text="Sign up" />
      </form>
      <span>or</span>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-balance hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
