import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  

  const navigate = useNavigate();
const { user, appointmentId,doctorId } = useSelector((state) => state.auth);
      const role = user?.role;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(2, 6, 23, 0.38), rgba(2, 6, 23, 0.72)), url('https://images.unsplash.com/photo-1580281657527-47f249e8f7f4?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.20),transparent_32%)]"></div>

      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-2xl mb-6 shadow-lg shadow-cyan-500/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">
                Online Doctor Appointment Booking
              </span>

              
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Welcome to
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                HealthCare+
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-100/95 max-w-2xl leading-relaxed">
              A smart hospital portal where patients can view doctors, book
              appointments online, and manage visits easily. It helps reduce
              waiting time, improves hospital efficiency, and gives patients a
              simple digital healthcare experience.
            </p>

            <p className="mt-4 text-base text-slate-200/90 max-w-2xl leading-relaxed">
              Patients can check available doctors, choose a convenient time
              slot, and visit the hospital without unnecessary crowding or long
              queues.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              { role ==="patient"? (
   <button 
                onClick={() =>  navigate("/allDoctors")}
                className="px-7 py-3.5 rounded-2xl bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition shadow-xl shadow-cyan-500/25 hover:scale-[1.02]"
              >
                Get Started
              </button>
              ):null}




               {!doctorId && role=="doctor" ?  (
    <button
      onClick={() => navigate("/createDoctor")}
      className="px-7 py-3.5 cursor-pointer rounded-2xl bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition shadow-xl shadow-cyan-500/25 hover:scale-[1.02]"
    >
      Create Doctor
    </button>
  ) : !appointmentId && role=="doctor" ?(
    <button
      onClick={() => navigate(`/appointmentForm/${doctorId}`)}
      className="px-10 py-3.5 cursor-pointer rounded-2xl bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition shadow-xl shadow-cyan-500/25 hover:scale-[1.02]"
    >
      Appointements
    </button>
  ):null}

  {appointmentId && role=="doctor" ?(
      <button onClick={()=>{navigate("/myPatients")}} className="px-10 py-3.5 cursor-pointer rounded-2xl bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition shadow-xl shadow-cyan-500/25 hover:scale-[1.02]">Patients </button>
  ):null}

                
        
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                ["Doctors", "Available specialists"],
                ["Appointments", "Easy online booking"],
                ["Waiting Time", "Reduced crowding"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-2xl p-5 shadow-lg shadow-black/10 hover:bg-white/15 transition"
                >
                  <p className="text-sm text-slate-200/80">{title}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;  