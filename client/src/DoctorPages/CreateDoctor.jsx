import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setDoctorId } from "../redux/authSlice";

const CreateDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: "",
    specialization: "",
    experience: "",
    feesPerConsultation: "",
    about: "",
    address: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/doctor/create", form);
      if (data.success) {
        console.log(data);
        toast.success(data.message);
   dispatch(setDoctorId({ doctorId: data.doctor._id }));
navigate(`/appointmentForm/${data.doctor._id}`);

      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to create doctor");
    }
  };

  const inputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700">
            Doctor Management
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
            Create Doctor
          </h1>
          <p className="mt-2 text-slate-600">
            Fill in the doctor details below to add a new profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Dr. John Doe"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Cardiologist"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="5 years"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Fees Per Consultation
              </label>
              <input
                type="number"
                name="feesPerConsultation"
                value={form.feesPerConsultation}
                onChange={handleChange}
                placeholder="500"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Hospital address"
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                About
              </label>
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="Short description about the doctor..."
                rows="5"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] hover:from-cyan-600 hover:to-blue-700"
            >
              Create Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctor;