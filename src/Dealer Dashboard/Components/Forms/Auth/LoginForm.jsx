import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthInput from "../../ui/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginDealerAsync } from "../../../../Redux/Features/dealersSlice";
import { storeDealerAccessToken } from "../../../../Utils/Helper";
import Snackbars from "../../../../ui/Snackbars";
import Loader from "../../../../ui/Loader";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const { status, dealers } = useSelector((state) => state.dealers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginDealer = async (data) => {
    const res = await dispatch(loginDealerAsync(data));
    console.log("res", res);
    if (loginDealerAsync.fulfilled.match(res) || res.payload.success) {
      storeDealerAccessToken(res.payload.data.accessToken);
      setSnackbar({
        open: true,
        type: "success",
        text: res.payload.message,
      });
      setTimeout(() => {
        navigate("/my-dashboard/listing");
      }, 500);
    } else {
      if (
        res.payload.message ===
        "Please complete your profile first. Redirecting...."
      ) {
        sessionStorage.setItem("dealerId", res.payload.data.id);
        sessionStorage.setItem("email", res.payload.data.email);
        sessionStorage.setItem(
          "locationCount",
          res.payload.data.Plan.locationCount
        );
        sessionStorage.setItem("mobileNo", res.payload.data.mobileNo);
        sessionStorage.setItem(
          "planDiscount",
          res.payload.data.Plan.planDiscount
        );
        setTimeout(() => {
          navigate("/editProfile", {
            state: { data: { email: getValues("email") } },
          });
        }, 800);
      }
      setSnackbar({
        open: true,
        type: "error",
        text: res.payload.message,
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
          Login
        </h1>
      </div>
      <div className="max-w-lg mx-auto font-montserrat px-5">
        <div className="text-center">
          <h1 className="font-semibold text-4xl my-6">Login</h1>
          {/* <p className="text-[#777] text-lg mt-2 mb-4">
          Sign in with this accoss the following sites.
        </p> */}
        </div>
        <form onSubmit={handleSubmit(loginDealer)} className="space-y-6">
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
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="bg-secondary rounded-md text-white py-3 w-full px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md flex justify-center items-center"
            >
              {status === "loading" ? <Loader /> : "Sign In"}
            </button>
          </div>
          <div className="flex justify-center text-[#2E3192] font-bold">
            <p>
              <Link
                //   to="/register"
                className="font-semibold text-secondary cursor-pointer hover:underline"
              >
                Forgot Password
              </Link>{" "}
              or follow here to{" "}
              <Link
                to="/register"
                className="font-semibold text-secondary cursor-pointer underline"
              >
                Create New Account
              </Link>
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

export default LoginForm;
