import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/doctor/getall");
      if (data.success) {
        setDoctors(data.getall || []);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[2rem] bg-white/70 p-8 text-center shadow-xl ring-1 ring-white/60 backdrop-blur">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
            Expert Medical Care
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            All Doctors
          </h1>
          <p className="mt-3 text-gray-600">
            Find the right specialist for your health needs.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[520px] animate-pulse rounded-3xl bg-white shadow-lg ring-1 ring-gray-200"
              />
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg ring-1 ring-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">No doctors available</h2>
            <p className="mt-2 text-gray-600">Please check back later.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <div
                key={d._id}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.fullName}
                    className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {d.specialization}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white">{d.fullName}</h2>
                    <p className="mt-1 text-sm text-white/90 line-clamp-2">{d.about}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-indigo-50 p-3">
                      <p className="text-gray-500">Experience</p>
                      <p className="mt-1 font-semibold text-gray-900">{d.experience} yrs</p>
                    </div>

                    <div className="rounded-2xl bg-cyan-50 p-3">
                      <p className="text-gray-500">Fee</p>
                      <p className="mt-1 font-semibold text-gray-900">₹{d.feesPerConsultation}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <p className="flex items-start gap-2">
                      <span className="font-semibold text-gray-900">Address:</span>
                      <span>{d.address}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-semibold text-gray-900">Timing:</span>
                      <span>{Array.isArray(d.timings) ? d.timings.join(" | ") : d.timings || "Not set"}</span>
                    </p>
                  </div>

                  <button
                    className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-blue-700"
                    onClick={() => navigate(`/appointmentForm/${d._id}`)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctors;