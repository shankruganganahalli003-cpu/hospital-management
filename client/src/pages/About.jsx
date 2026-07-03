import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    src: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/d2ec14d40ef1a6f9c5c314eb5ee8b1703807ae3e.jpg",
    title: "Certificate",
    desc: "Official medical and clinical documentation.",
  },
  {
    src: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/0e2e6efc5d9120390700fdfb99aa6b402b96ec01.jpg",
    title: "Nurse Care",
    desc: "Compassionate support from trained healthcare staff.",
  },
  {
    src: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/573a347f3bae6235915c4a16db4b07d419fd945d.jpg",
    title: "Surgeries",
    desc: "Safe and modern surgical procedures with expert teams.",
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80",
    title: "Hospital",
    desc: "Modern structure with advanced facilities.",
  },
];

 

const About = () => {
   const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeImage = () => setSelectedImage(null);

  const nextImage = (e) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % images.length;
    setCurrentIndex(next);
    setSelectedImage(images[next]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prev);
    setSelectedImage(images[prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]"></div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                About HealthCare+
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Care you can trust,
                <span className="block text-cyan-300">healthcare you can rely on</span>
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
                HealthCare+ is a multispeciality hospital designed to deliver complete
                healthcare under one roof. We combine consultation, diagnosis,
                treatment, surgery support, nursing care, and medical documentation in
                one seamless patient experience.
              </p>

              <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-2xl">
                Our approach is built around compassion, safety, and clarity. From the
                first visit to recovery and follow-up, we ensure patients feel informed,
                supported, and cared for at every step.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20">
                  Book Appointment
                </button>
              <button
  onClick={() => navigate("/contact")}
  className="px-6 py-3 hover:cursor-pointer w-50 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition"
>
  Contact us
</button>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80"
                alt="Hospital"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  Multispeciality support
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  Modern facilities
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  Skilled nurses
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  Safe procedures
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((item, index) => (
              <button
                key={item.title}
                onClick={() => openImage(index)}
                className="group text-left rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-4 shadow-lg hover:-translate-y-2 hover:shadow-cyan-500/20 transition duration-300"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-56 object-cover rounded-2xl group-hover:scale-110 transition duration-500"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-300 text-sm">{item.desc}</p>
              </button>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-white">What we offer</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="font-semibold text-white">Multispeciality care</p>
                <p className="mt-2 text-slate-300 text-sm">
                  Multiple departments working together for complete treatment.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="font-semibold text-white">Skilled professionals</p>
                <p className="mt-2 text-slate-300 text-sm">
                  Doctors, surgeons, nurses, and support teams focused on patient care.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="font-semibold text-white">Reliable support</p>
                <p className="mt-2 text-slate-300 text-sm">
                  Treatment guidance, records, certificates, and recovery support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center px-4"
          onClick={closeImage}
        >
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              <div className="bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-[320px] md:h-[540px] object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedImage.title}
                  </h2>
                  <p className="mt-4 text-slate-300 leading-relaxed">
                    {selectedImage.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    onClick={prevImage}
                    className="px-5 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextImage}
                    className="px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;