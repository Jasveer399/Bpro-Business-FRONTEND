import React from "react";
import { useForm } from "react-hook-form";
import AuthInput from "../../ui/AuthInput";
import { Link } from "react-router-dom";

function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div>
        <img src="BproBusiness.png" className="w-[100%]" />
      </div>
      <div className="text-center">
        <h1 className="font-semibold text-4xl mt-6">Sign In</h1>
        <p className="text-[#777] text-lg mt-2 mb-4">
          Sign in with this accoss the following sites.
        </p>
      </div>
      <div className="space-y-6">
        <AuthInput
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
          width="w-96"
        />
        <AuthInput
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors.password?.message}
          width="w-96"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#EB6752] rounded-md text-white py-2 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
          >
            Sign In
          </button>
        </div>
        <div className="flex justify-center">
          <p>
            <Link
            //   to="/register"
              className="font-semibold text-[#EB6752] cursor-pointer hover:underline"
            >
              Forgot Password
            </Link>{" "}
            or follow here to{" "}
            <Link
              to="/register"
              className="font-semibold text-[#EB6752] cursor-pointer hover:underline"
            >
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
