import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaHospital,
  FaCheckCircle,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { setCredentials } from "../redux/authSlice";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
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

    const { data } = await api.post("/verify/send-otp", {
      email: form.email,
      name: form.name,
      password: form.password,
    });

    if (data.success) {
      toast.success("OTP sent to your email");
      navigate("/otp-verify", {
        state: { email: form.email, name: form.name, password: form.password },
      });
    } else {
      toast.error("OTP could not be sent");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to send OTP");
  } finally {
    setLoading(false);
  }
};


  const sendEmail = async () => {
    try {

      const {data} = await api.post("/verify/send-otp");

      if(data.success){
        console.log(data);

      }

    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message);
      
    }
    
  }

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;
      if (!token) {
        toast.error("Invalid Google token");
        return;
      }

      setLoading(true);

      const { data } = await api.post(
        "/auth/google-login",
        { token },
        { withCredentials: true }
      );

   dispatch(
  setCredentials({
    user: data.user,
    token: data.token,
  })
);
      toast.success(data.message || "Registration successful!");
      navigate("/", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
              Join the Smart Healthcare Platform
              <br />
              Secure Digital Workspace
            </p>

            <div className="space-y-3 mt-8 text-sm">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-lg" /> Secure Medical Records
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-8 bg-white">
          <div className="w-full max-w-md flex flex-col justify-between h-full space-y-5">
            <div className="text-center">
              <div className="inline-flex p-3.5 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 shadow-md">
                <FaHospital className="text-white text-3xl" />
              </div>
              <h2 className="text-2xl font-bold mt-2 text-gray-800">
                Create Account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-3.5">
              <div>
                <label className="block mb-1 text-xs font-semibold text-gray-600">
                  Full Name
                </label>
                <div className="flex items-center px-3.5 border border-gray-300 rounded-xl bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition gap-2">
                  <FaUser className="text-gray-400 text-lg shrink-0" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full py-2.5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

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
                    placeholder="Min 6 characters"
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
  {loading ? "Registering..." : "Register"}
</button>


            </form>

            <div className="flex items-center my-1">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="mx-2 text-xs text-gray-400">Or setup with Google</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="h-9 overflow-hidden flex items-center justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleRegister}
                  onError={() => toast.error("Google registration failed")}
                />
              </div>

              <p className="text-center text-xs text-gray-600">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-1.5 text-blue-600 font-bold hover:text-cyan-600"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;