import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaNotesMedical,
  FaRegUser,
  FaHospital,
} from "react-icons/fa";
import { MdOutlineSchedule, MdLocationOn } from "react-icons/md";

const PatientAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/doctor/getone/${doctorId}`);
      console.log(JSON.stringify(data, null, 2));

      if (data.success && data.getone?.length > 0) {
        setDoctor(data.getone[0]);
        setAppointment(data.getone[0]?.appointment || null);
      } else {
        setError("Doctor not found");
      }
    } catch (err) {
      console.log(err.message);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) fetchDoctor();
  }, [doctorId]);

  const handleGoToAppointment = () => {
    if (appointment?._id) {
      navigate(`/appointment/${appointment._id}`);
    }
  };

  const card =
    "rounded-[2rem] border border-slate-200/60 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl";

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700 shadow-sm ring-1 ring-cyan-200">
            <FaHospital className="text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Doctor Appointment Details
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Clean profile view with gentle colors.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5 }}
            className={card}
          >
            {loading ? (
              <DoctorSkeleton />
            ) : error ? (
              <EmptyState text={error} />
            ) : doctor ? (
              <>
                <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-white">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-emerald-300/10 blur-2xl" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                        <FaUserMd className="text-xl" />
                      </div>

                      <div>
                        <p className="inline-flex rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-50">
                          Doctor Profile
                        </p>
                        <h2 className="mt-2 text-xl font-bold leading-tight">
                          {doctor.fullName}
                        </h2>
                        <p className="mt-1 text-sm text-cyan-50/90">
                          {doctor.specialization}
                        </p>
                        <p className="mt-2 max-w-xl text-xs leading-5 text-cyan-50/90">
                          {doctor.about}
                        </p>
                      </div>
                    </div>

                    <div className="max-w-[180px] rounded-2xl bg-white/15 px-3 py-2 ring-1 ring-white/20">
                      <div className="flex items-center gap-2 text-cyan-50">
                        <MdLocationOn className="text-sm" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                          Address
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-white">
                        {doctor.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoBox
                    icon={<FaRegUser className="text-sm" />}
                    label="Experience"
                    value={`${doctor.experience} yrs`}
                    color="text-cyan-700"
                    bg="bg-cyan-50"
                  />
                  <InfoBox
                    icon={<FaMoneyBillWave className="text-sm" />}
                    label="Consultation Fee"
                    value={`₹${doctor.feesPerConsultation}`}
                    color="text-emerald-700"
                    bg="bg-emerald-50"
                  />
                </div>
              </>
            ) : (
              <EmptyState text="No doctor found." />
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.1 }}
            className={card}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 ring-1 ring-emerald-200">
                <MdOutlineSchedule className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Appointment Details
                </h2>
                <p className="text-sm text-slate-500">
                  Schedule and consultation information
                </p>
              </div>
            </div>

            {loading ? (
              <AppointmentSkeleton />
            ) : error ? (
              <EmptyState text={error} />
            ) : appointment ? (
              <div className="space-y-3">
                <CompactRow
                  label="Duration Minutes"
                  value={appointment?.durationMinutes}
                />
                <CompactRow
                  label="Available Days"
                  value={
                    Array.isArray(appointment?.availableDays)
                      ? appointment.availableDays.join(", ")
                      : appointment?.availableDays
                  }
                />
                <CompactRow
                  label="Morning Time"
                  value={appointment?.morningTime}
                />
                <CompactRow
                  label="Evening Time"
                  value={appointment?.eveningTime}
                />
                <CompactRow
                  label="Amount"
                  value={`₹${appointment?.amount}`}
                />

                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="mb-2 flex items-center gap-2 text-emerald-700">
                    <FaNotesMedical className="text-sm" />
                    <span className="text-xs font-semibold">Notes</span>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">
                    {appointment?.notes || "No notes added."}
                  </p>
                </div>

                <button
                  onClick={handleGoToAppointment}
                  className="mt-3 w-full rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-cyan-700"
                >
                  Open Appointment
                </button>
              </div>
            ) : (
              <EmptyState text="No appointment found." />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CompactRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="break-words text-right text-sm font-semibold text-slate-900">
        {value || "—"}
      </p>
    </div>
  );
};

const DoctorSkeleton = () => {
  return (
    <div className="animate-pulse space-y-5">
      <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-cyan-50 p-4">
        <div className="h-4 w-28 rounded-full bg-slate-200" />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-6 w-40 rounded-xl bg-slate-200" />
              <div className="h-3 w-24 rounded-xl bg-slate-200" />
              <div className="h-3 w-64 rounded-xl bg-slate-200" />
            </div>
          </div>
          <div className="h-16 w-36 rounded-2xl bg-slate-200" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-16 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
        <div className="h-16 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
      </div>
    </div>
  );
};

const AppointmentSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-12 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
      <div className="h-12 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
      <div className="h-12 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
      <div className="h-12 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
      <div className="h-12 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
      <div className="h-16 rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
    </div>
  );
};

const EmptyState = ({ text }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
      {text}
    </div>
  );
};

const InfoBox = ({ icon, label, value, color, bg }) => {
  return (
    <div className={`rounded-2xl p-3 ring-1 ring-slate-200 ${bg}`}>
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className={`mt-1 text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default PatientAppointment;