import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Contact HealthCare+
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Get in touch for
              <span className="block text-cyan-300">appointments and support</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
              Reach out to our hospital team for appointments, patient assistance,
              medical guidance, or general inquiries. We are here to help you with
              quick and reliable support.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-6 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 flex items-center justify-center text-cyan-300">
                <FaPhoneAlt />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Phone</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Call us for quick assistance and appointments.
              </p>
              <p className="mt-3 text-white font-medium">+91 00000 00000</p>
            </div>

            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-6 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 flex items-center justify-center text-cyan-300">
                <FaEnvelope />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Email</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Send your queries to our support team.
              </p>
              <p className="mt-3 text-white font-medium">support@healthcareplus.com</p>
            </div>

            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-6 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 flex items-center justify-center text-cyan-300">
                <FaMapMarkerAlt />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Location</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Visit our hospital for consultation and care.
              </p>
              <p className="mt-3 text-white font-medium">123 Health Street, City, Country</p>
            </div>

            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-6 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 flex items-center justify-center text-cyan-300">
                <FaClock />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Working Hours</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Available for patient support and inquiries.
              </p>
              <p className="mt-3 text-white font-medium">24/7 Emergency Care</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;