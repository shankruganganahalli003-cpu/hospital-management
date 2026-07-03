import React from "react";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(2, 6, 23, 0.38), rgba(2, 6, 23, 0.72)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.20),transparent_32%)]"></div>

      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-2xl mb-6 shadow-lg shadow-cyan-500/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">
                Hospital Management System
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Welcome to
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                HealthCare+
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-100/95 max-w-2xl leading-relaxed">
              A modern hospital management portal designed for patient care,
              appointments, records, billing, and staff coordination — with a
              clean, trusted, and professional experience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-7 py-3.5 rounded-2xl bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition shadow-xl shadow-cyan-500/25 hover:scale-[1.02]">
                Get Started
              </button>
              <button className="px-7 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition backdrop-blur-2xl">
                Learn More
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                ["Patient Care", "24/7 support"],
                ["Appointments", "Easy booking"],
                ["Records", "Secure access"],
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