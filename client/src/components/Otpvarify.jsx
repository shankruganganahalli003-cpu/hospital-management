import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import { setCredentials } from "../redux/authSlice";

const Otpvarify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email missing");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/verify/verify-otp", {
        email,
        otp,
      });

      if (data.success) {
        dispatch(setCredentials({ user: data.user }));
        toast.success(data.message || "OTP verified");
        navigate("/");
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleVerify} className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center">Enter the OTP sent to {email}</p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border rounded-xl px-4 py-2 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default Otpvarify;