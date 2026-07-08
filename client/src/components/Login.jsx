import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock, FaHospital, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { setCredentials } from "../redux/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await api.post("/api/auth/login", form, {
        withCredentials: true,
      });
if (data?.user) {
  dispatch(setCredentials({ user: data.user }));
}
      toast.success(data.message || "Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;
      if (!token) {
        toast.error("Invalid Google token");
        return;
      }

      setLoading(true);

      const { data } = await api.post(
        "/api/auth/google-login",
        { token },
        { withCredentials: true }
      );

      dispatch(setCredentials({ user: data.user }));
      toast.success(data.message || "Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-200 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2 min-h-[620px]">
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-cyan-500 text-white p-10 relative overflow-hidden">
          <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl -top-24 -left-20"></div>
          <div className="absolute w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl bottom-0 right-0"></div>

          <div className="relative z-10">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
              <FaHospital className="text-blue-700 text-4xl" />
            </div>

            <h1 className="text-4xl font-bold mt-6">Hospital Management</h1>
            <p className="mt-4 text-base opacity-90 leading-relaxed">
              Welcome back
              <br />
              Secure Digital Workspace
            </p>

            <div className="space-y-3 mt-8 text-sm">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-lg" /> Secure Access
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-lg" /> Patient Portal
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-lg" /> Doctor Dashboard
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-lg" /> Nurse Workspace
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-8 bg-white">
          <div className="w-full max-w-md flex flex-col justify-between h-full space-y-5">
            <div className="text-center">
              <div className="inline-flex p-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
                <FaHospital className="text-white text-3xl" />
              </div>
              <h2 className="text-2xl font-bold mt-2 text-gray-800">Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-3.5">
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-600">
                  Email Address
                </label>
                <div className="flex items-center px-3.5 border border-gray-300 rounded-xl bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition gap-2">
                  <FaEnvelope className="text-gray-400 text-lg shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full py-2.5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-600">
                  Password
                </label>
                <div className="flex items-center px-3.5 border border-gray-300 rounded-xl bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition gap-2">
                  <FaLock className="text-gray-400 text-lg shrink-0" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full py-2.5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-2 text-sm font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex items-center my-1">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="mx-2 text-xs text-gray-400">
                Or continue with Google
              </span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google login failed")}
              />

              <p className="text-center text-xs text-gray-600">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-1.5 text-blue-600 font-bold hover:text-cyan-600"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;