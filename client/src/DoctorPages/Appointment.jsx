import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setAppointmentId } from "../redux/authSlice";

const Appointment = () => {
  const { doctorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);

  const [form, setForm] = useState({
    durationMinutes: "",
    availableDays: "",
    morningTime: "",
    eveningTime: "",
    amount: "",
    notes: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoadingDoctor(true);
        const { data } = await api.get("/doctor/getall");
        if (data.success) {
          const foundDoctor = data.getall.find((d) => d._id === doctorId);
          setDoctor(foundDoctor || null);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch doctor details");
      } finally {
        setLoadingDoctor(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        availableDays: form.availableDays
          .split(",")
          .map((day) => day.trim())
          .filter(Boolean),
      };

      const { data } = await api.post(`/appointment/create/${doctorId}`, payload);

      if (data.success) {
        toast.success(data.message || "Appointment created successfully");
        dispatch(setAppointmentId(data.createAppointment._id));
        navigate(`/myProfile/${data.createAppointment._id}`);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create appointment");
    }
  };

  const inputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_60%,_#0f766e_120%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-8 text-white shadow-[0_25px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="relative">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/15 px-4 py-1 text-xs font-bold tracking-wider text-cyan-200">
              APPOINTMENT SETUP
            </span>

            <div className="mt-5 flex items-start gap-5">
              {loadingDoctor ? (
                <div className="h-28 w-28 animate-pulse rounded-[1.5rem] bg-white/15" />
              ) : doctor ? (
                <img
                  src={doctor.image}
                  alt={doctor.fullName}
                  className="h-28 w-28 rounded-[1.5rem] object-cover ring-4 ring-white/15"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-[1.5rem] bg-white/15 text-sm text-slate-200">
                  No Image
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {loadingDoctor
                    ? "Loading doctor details..."
                    : doctor?.fullName || "Doctor Schedule"}
                </h1>
                <p className="mt-2 text-cyan-200">
                  {loadingDoctor ? "Fetching profile..." : doctor?.specialization || "Specialist"}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                  {loadingDoctor
                    ? "Please wait while we load the doctor profile."
                    : doctor?.about ||
                      "Set the consultation timing, days, duration, and fee in one place."}
                </p>
              </div>
            </div>

            {!loadingDoctor && doctor && (
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-xs text-cyan-200">Experience</p>
                  <p className="mt-1 text-lg font-semibold text-white">{doctor.experience} yrs</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-xs text-cyan-200">Fee</p>
                  <p className="mt-1 text-lg font-semibold text-white">₹{doctor.feesPerConsultation}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-xs text-cyan-200">Address</p>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-white">
                    {doctor.address || "Not provided"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_25px_100px_rgba(15,23,42,0.15)]">
          <div className="mb-8">
            <span className="inline-flex rounded-full bg-cyan-100 px-4 py-1 text-xs font-bold tracking-wider text-cyan-700">
              BOOK APPOINTMENT
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">Appointment Form</h2>
            <p className="mt-2 text-sm text-slate-600">
              Fill in the schedule details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Duration Minutes</label>
                <input
                  type="number"
                  name="durationMinutes"
                  value={form.durationMinutes}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Available Days</label>
              <input
                type="text"
                name="availableDays"
                value={form.availableDays}
                onChange={handleChange}
                placeholder="Monday, Wednesday, Friday"
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Morning Time</label>
                <input
                  type="time"
                  name="morningTime"
                  value={form.morningTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Evening Time</label>
                <input
                  type="time"
                  name="eveningTime"
                  value={form.eveningTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add important notes for patients..."
                rows="5"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;