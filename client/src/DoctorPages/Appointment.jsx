import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

const Appointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    durationMinutes: "",
    availableDays: "",
    morningTime: "",
    eveningTime: "",
    amount: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        availableDays: form.availableDays.split(",").map((day) => day.trim()),
      };
      
      const { data } = await api.post(`/appointment/create/${doctorId}`, payload);

      if (data.success) {
        toast.success(data.message || "Appointment created successfully");
        console.log(data);
        navigate(`/myProfile/${data._id}`);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to create appointment");
    }
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="durationMinutes"
          value={form.durationMinutes}
          onChange={handleChange}
          placeholder="Duration Minutes"
          className="w-full rounded-xl border px-4 py-2"
        />

        <input
          type="text"
          name="availableDays"
          value={form.availableDays}
          onChange={handleChange}
          placeholder="Available Days (Monday,Wednesday,Friday)"
          className="w-full rounded-xl border px-4 py-2"
        />

        <input
          type="time"
          name="morningTime"
          value={form.morningTime}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
        />

        <input
          type="time"
          name="eveningTime"
          value={form.eveningTime}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
        />

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full rounded-xl border px-4 py-2"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="w-full rounded-xl border px-4 py-2"
        />

        <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2 text-white">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;