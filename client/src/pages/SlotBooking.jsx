import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const SlotBooking = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/slot/create", form);

      toast.success(data.message);
      console.log(data);
      navigate("/slots");
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
<>

    




</>
  );
};

export default SlotBooking;