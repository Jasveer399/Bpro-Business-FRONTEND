import React, { useEffect, useState } from "react";
import AuthInput from "../../ui/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import SelectInput from "../../../../ui/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkerIdAndNameAsync } from "../../../../Redux/Features/workersSlice";
import { addDealerAsync } from "../../../../Redux/Features/dealersSlice";
import Loader from "../../../../ui/Loader";
import Snackbars from "../../../../ui/Snackbars";

function CreateAccountForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { status, workers } = useSelector((state) => state.workers);
  const { status: dealerStatus } = useSelector((state) => state.dealers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkerIdAndNameAsync());
    }
  }, [status, dispatch]);

  const registerDealer = async (data) => {
    const response = await dispatch(addDealerAsync(data));

    console.log("response", response);

    if (response.payload.success) {
      setSnackbar({
        open: true,
        type: "success",
        text: response.payload.message,
      });
      setTimeout(() => {
        navigate("/editProfile", {
          state: {
            data: {
              email: getValues("email"),
              mobileNo: getValues("mobileNo"),
            },
          },
        });
      }, 500);
    } else {
      setSnackbar({
        open: true,
        type: "error",
        text: response.payload || response.error.message || "Error creating account",
      });
    }
  };

  return (
    <>
      {/* <div>
        <img src="BproBusiness.png" className="w-[100%]" />
      </div> */}
      <div className="bg-[#2E3192] flex justify-center items-center w-full h-60 font-montserrat">
        <h1 className=" md:text-6xl text-4xl text-white font-montserrat">
          Signup
        </h1>
      </div>
      <div className="max-w-lg mx-auto font-montserrat px-5">
        <div className="text-center">
          <h1 className="font-semibold text-4xl my-6">Create Account</h1>
          {/* <p className="text-[#777] text-lg mt-2 mb-4">
            Sign in with this accoss the following sites.
          </p> */}
        </div>
        <form onSubmit={handleSubmit(registerDealer)} className="space-y-6">
          <AuthInput
            label="Username"
            type="text"
            {...register("username", {
              required: "Username is required",
            })}
            error={errors.name?.message}
            // width="w-96"
          />
          <AuthInput
            label="Mobile Number"
            type="tel"
            {...register("mobileNo", {
              required: "Mobile Number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Mobile Number must be exactly 10 digits",
              },
              validate: (value) => {
                const cleanedValue = value.replace(/\D/g, "");
                return (
                  cleanedValue.length === 10 ||
                  "Mobile Number must be 10 digits"
                );
              },
            })}
            error={errors.mobileNo?.message}
            // width="w-96"
            maxLength={10}
            onChange={(e) => {
              // Only allow digits
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
            }}
          />
          <AuthInput
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
            // width="w-96"
          />
          <AuthInput
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
            // width="w-96"
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
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="bg-secondary w-full flex items-center justify-center rounded-md text-white py-3 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
            >
              {dealerStatus === "loading" ? <Loader /> : "Signup"}
            </button>
          </div>
          <div className="flex justify-center text-[#2E3192] font-bold">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-secondary cursor-pointer underline"
              >
                Login
              </Link>{" "}
              Here...
            </p>
          </div>
        </form>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default CreateAccountForm;
