import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import {  useNavigate } from "react-router-dom";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchAllDoctors = async () => {
    try {
      const { data } = await api.get("/doctor/getall");
      if (data.success) {
        setDoctors(data.getall);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to fetch doctors");
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
            Expert Medical Care
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            All Doctors
          </h1>
          <p className="mt-3 text-gray-600">
            Find the right specialist for your health needs.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <div
              key={d._id}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={d.image}
                  alt={d.fullName}
                  className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {d.specialization}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {d.fullName}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-indigo-600">
                      {d.about}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-gray-500">Experience</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {d.experience} yrs
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-gray-500">Fee</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      ₹{d.feesPerConsultation}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-gray-900">Address:</span>
                    <span>{d.address}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-gray-900">Timing:</span>
                    <span>{Array.isArray(d.timings) ? d.timings.join(" | ") : d.timings}</span>
                  </p>
                </div>

                <button
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-blue-700"
                  onClick={() => {navigate(`//${d._id}`)}}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;