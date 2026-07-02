import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { setCredentials } from "../redux/authSlice";

const Login = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

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

      setLoading(true);

      const { data } = await api.post(
        "/auth/google-login",
        {
          token,
          role,
        },
        {
          withCredentials: true, // IMPORTANT for cookies
        }
      );

      dispatch(setCredentials({ user: data.user }));

      toast.success(data.message || "Login Successful");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Google Login
        </h1>

        {/* Role Selection */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
          </select>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline"
            >
              Register
            </a>
          </p>
        </div>

        {loading && (
          <p className="text-center mt-4 text-gray-500">
            Logging in...
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;