import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import { server } from "../../Utils/server";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted", { username, password });
    try {
      setLoading(true);
      const res = await axios.post(
        `${server}/api/v1/admin/login`,
        { username, password },
        { withCredentials: true }
      );
      if (res.data.status) {
        localStorage.setItem('accessToken', res.data.accessToken)
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error logging in", error);
      setError(
        error?.response?.data?.message || "Error while logging in. Try Later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue via-darkComponet to-darkPrimary flex items-center justify-center p-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="text-white text-2xl font-bold flex items-center flex-col justify-center"><Loader /> Signing In...</div>
      </div>
      )}
      <img
        src="/dailySaleImage.svg"
        className="absolute w-72 right-10 top-0 translate-y-[-50px] animate-fadeInDown"
      />
      <div className="bg-gray-900 border border-gray-400 bg-opacity-50 p-8 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm relative overflow-hidden">
        <div className="bg-[#1a77d2] -z-20 p-2 rounded-full w-48 h-48 absolute -top-28 -right-0 opacity-0 translate-y-[-50px] animate-fadeInDown" />
        <div className="bg-[#1565c0] -z-20 p-2 rounded-full w-48 h-48 absolute -top-12 -right-20 opacity-0 translate-y-[50px] animate-fadeInUp" />
        <h2 className="text-5xl font-bold text-white text-center mb-6">
          Sign In
        </h2>
        <div className="flex items-center justify-center mb-6">
          <img src="/BproBusiness.png" className="w-48" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-lightPrimary"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Username Here"
              required
            />
          </div>
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-lightPrimary"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base uppercase font-medium text-white bg-[#1a77d2] hover:bg-[#1565c0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Signing In..." : "Sign in"}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-sm text-lightPrimary cursor-pointer hover:underline">
              {error}
            </span>
          </div>
        </form>
      </div>
      <img
        src="/rotated.svg"
        className="absolute bottom-0 w-64 left-0 translate-y-[-50px] animate-fadeInDown"
      />
    </div>
  );
};

export default AdminLogin;
