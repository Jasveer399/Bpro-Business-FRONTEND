import React, { useEffect } from "react";
import AuthInput from "../../ui/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import SelectInput from "../../../../ui/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkerIdAndNameAsync } from "../../../../Redux/Features/workersSlice";
import { addDealerAsync } from "../../../../Redux/Features/dealersSlice";
import Loader from "../../../../ui/Loader";

function CreateAccountForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { status, workers } = useSelector((state) => state.workers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkerIdAndNameAsync());
    }
  }, [status, dispatch]);

  const registerDealer = async (data) => {
    const res = await dispatch(addDealerAsync(data));

    if (addDealerAsync.fulfilled.match(res)) {
      navigate("/login")
    }
  };

  return (
    <>
      <div>
        <img src="BproBusiness.png" className="w-[100%]" />
      </div>
      <div className="text-center">
        <h1 className="font-semibold text-4xl mt-6">Create Account</h1>
        <p className="text-[#777] text-lg mt-2 mb-4">Sign in with this accoss the following sites.</p>
      </div>
      <form onSubmit={handleSubmit(registerDealer)} className="space-y-6">
        <AuthInput
          label="Username"
          type="text"
          {...register("username", {
            required: "Username is required",
          })}
          error={errors.name?.message}
          width="w-96"
        />
        <AuthInput
          label="Mobile Number"
          type="tel"
          {...register("mobileNo", {
            required: "Mobile Number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Mobile Number must be exactly 10 digits"
            },
            validate: (value) => {
              const cleanedValue = value.replace(/\D/g, '');
              return cleanedValue.length === 10 || "Mobile Number must be 10 digits"
            }
          })}
          error={errors.mobileNo?.message}
          width="w-96"
          maxLength={10}
          onChange={(e) => {
            // Only allow digits
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
          }}
        />
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
        <Controller
          name="workerId"
          control={control}
          rules={{ required: "Select Worker" }}
          render={({ field, fieldState: { error } }) => (
            <SelectInput
              label="Select Worker"
              options={workers}
              onChange={(option) => {
                field.onChange(option.value);
                // handlePartyChange(option);
              }}
              error={error?.message}
              width="w-full"
              value={field.value}
            />
          )}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#EB6752] rounded-md text-white py-2 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
          >
            {status === "loading" ? <Loader /> : "Sign Up"}
          </button>
        </div>
        <div className="flex justify-center">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#EB6752] cursor-pointer hover:underline"
            >
              Login
            </Link>{" "}
            Here...
          </p>
        </div>
      </form>
    </>
  );
}

export default CreateAccountForm;
