import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { setCredentials } from "../redux/authSlice";

const Login = () => {
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (credentialResponse) => {
    try {
      if (!role) {
        toast.error("Please select a role");
        return;
      }

      const token = credentialResponse?.credential;

      if (!token) {
        toast.error("Invalid Google token");
        return;
      }


      const { data } = await api.post(
        "/auth/google-login",
        {
          token,
          role,
        },
        
      );

      dispatch(setCredentials({ user: data.user }));

      toast.success(data.message || "Login Successful");
      console.log(data);

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login Failed"
      );
    } 
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-6">
          Google Login
        </h1>

        <div className="mb-5 items-center justify-center flex flex-col">
          <label className="block mb-2 font-semibold">
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-100 border rounded-lg p-3"
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
          </select>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>

        <div className="text-xl font-bold w-full flex items-center justify-center">
          <h1 className="">If you don't have an account then <span className="text-blue-600 hover:underline"><a href="/register">Register</a></span></h1>
        </div>

     
      </div>
    </div>
  );
};

export default Login;