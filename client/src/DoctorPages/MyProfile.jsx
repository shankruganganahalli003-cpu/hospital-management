import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setAppointmentId } from "../redux/authSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/appointment/getme/${appointmentId}`);
      dispatch(setAppointmentId(data.getme._id));
      setAppointment(data.getme);
      setDoctor(data.doctor);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appointmentId) fetchDoctorProfile();
  }, [appointmentId]);

  if (loading) {
    return <MyProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-3 py-4 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Appointment
          </h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Appointment and doctor details in one place.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-200">
          <div className="grid md:grid-cols-3">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-4 text-white md:col-span-1 sm:p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={doctor?.image || "/placeholder-doctor.jpg"}
                  alt={doctor?.fullName || "Doctor"}
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg sm:h-36 sm:w-36"
                />
                <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                  {doctor?.doctorId?.fullName || doctor?.fullName || "Doctor Name"}
                </h2>
                <p className="mt-1 text-xs text-indigo-100 sm:text-sm">
                  {doctor?.doctorId?.specialization ||
                    doctor?.specialization ||
                    "Specialist"}
                </p>

                <div className="mt-4 w-full rounded-2xl bg-white/10 p-3 backdrop-blur sm:p-4">
                  <p className="text-xs text-indigo-100 sm:text-sm">
                    Consultation Fee
                  </p>
                  <p className="text-xl font-bold sm:text-2xl">
                    ₹
                    {doctor?.doctorId?.feesPerConsultation ||
                      doctor?.feesPerConsultation ||
                      "0"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 md:col-span-2 sm:p-6">
              <h3 className="mb-3 text-xl font-bold text-gray-800 sm:mb-4 sm:text-2xl">
                Appointment Details
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <Info label="Appointment ID" value={appointment?._id} />
                <Info label="User ID" value={appointment?.userId} />
                <Info label="Doctor ID" value={appointment?.doctorId} />
                <Info
                  label="Duration"
                  value={appointment ? `${appointment.durationMinutes} mins` : ""}
                />
                <Info label="Morning Time" value={appointment?.morningTime} />
                <Info label="Evening Time" value={appointment?.eveningTime} />
                <Info label="Amount" value={appointment?.amount} />
                <Info label="Notes" value={appointment?.notes} />
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-gray-800 sm:text-base">
                  Available Days
                </p>
                <div className="flex flex-wrap gap-2">
                  {appointment?.availableDays?.map((day, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 sm:text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {doctor && (
                <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                  <h3 className="mb-3 text-base font-bold text-gray-800 sm:text-lg">
                    Doctor Details
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Info label="Name" value={doctor?.doctorId?.fullName || doctor?.fullName} />
                    <Info
                      label="Specialization"
                      value={doctor?.doctorId?.specialization || doctor?.specialization}
                    />
                    <Info
                      label="Fees"
                      value={doctor?.doctorId?.feesPerConsultation || doctor?.feesPerConsultation}
                    />
                    <Info
                      label="Experience"
                      value={doctor?.doctorId?.experience || doctor?.experience}
                    />
                    <Info
                      label="Address"
                      value={doctor?.doctorId?.address || doctor?.address}
                    />
                    <Info label="About" value={doctor?.doctorId?.about || doctor?.about} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:p-4">
    <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
    <p className="mt-1 break-words text-sm font-medium text-gray-900 sm:text-base">
      {value || "Not provided"}
    </p>
  </div>
);

const MyProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-3 py-4 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-4 text-center">
          <div className="mx-auto h-8 w-52 rounded bg-gray-200" />
          <div className="mx-auto mt-3 h-4 w-72 rounded bg-gray-200" />
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-200">
          <div className="grid md:grid-cols-3">
            <div className="bg-gray-100 p-4 md:col-span-1 sm:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-28 w-28 rounded-full bg-gray-300 sm:h-36 sm:w-36" />
                <div className="mt-4 h-6 w-36 rounded bg-gray-300" />
                <div className="mt-2 h-4 w-24 rounded bg-gray-300" />
                <div className="mt-4 w-full rounded-2xl bg-gray-200 p-3 sm:p-4">
                  <div className="h-4 w-28 rounded bg-gray-300" />
                  <div className="mt-3 h-7 w-20 rounded bg-gray-300" />
                </div>
              </div>
            </div>

            <div className="p-4 md:col-span-2 sm:p-6">
              <div className="mb-4 h-7 w-56 rounded bg-gray-200" />

              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:p-4"
                  >
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="mt-2 h-5 w-full rounded bg-gray-200" />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="mb-2 h-5 w-32 rounded bg-gray-200" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-8 w-20 rounded-full bg-gray-200"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                <div className="mb-3 h-5 w-36 rounded bg-gray-200" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:p-4"
                    >
                      <div className="h-4 w-20 rounded bg-gray-200" />
                      <div className="mt-2 h-5 w-full rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;