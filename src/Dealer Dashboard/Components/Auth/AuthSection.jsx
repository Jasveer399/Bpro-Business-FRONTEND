import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthSection() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <img src="auth-img.png" width={"70%"} />
      </div>
      <div>
        <h1 className="text-4xl font-semibold mt-6">
          {location.pathname === "/register"
            ? "Welcome to Business Pro"
            : "Create Your Account"}
        </h1>
      </div>
      <div>
        <p className="text-[#777777] text-lg text-center capitalize mt-8">
          To connect with us please sign up for a new account if you are <br />{" "}
          not having one already.
        </p>
      </div>
      <div className="mt-3">
        {location.pathname === "/register" ? (
          <button
            className="bg-[#191A1F] rounded-md text-white py-2 px-6 shadow-md hover:bg-[#EB6752] transform duration-300 ease-in-out font-semibold"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        ) : (
          <button
            className="bg-[#191A1F] rounded-md text-white py-2 px-6 shadow-md hover:bg-[#EB6752] transform duration-300 ease-in-out font-semibold"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        )}
      </div>
    </>
  );
}

export default AuthSection;
