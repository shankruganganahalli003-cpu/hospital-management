import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  if (location.pathname === "/login" || location.pathname === "/register") return null;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logged out");
    navigate("/login");
    setMenuOpen(false);
  };

const commonLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const doctorLinks = [
  { name: "Dashboard", path: "/doctor/dashboard" },
  { name: "Appointments", path: "/doctor/appointments" },
  
];

const patientLinks = [
  { name: "My Appointments", path: "/patient/appointments" },
  { name: "Doctors", path: "/allDoctors" },
];

const navLinks = [
  ...commonLinks,
  ...(user?.role === "doctor" ? doctorLinks : []),
  ...(user?.role === "patient" ? patientLinks : []),
];

  const linkClass = ({ isActive }) =>
    [
      "relative pb-1 text-sm font-medium transition duration-300",
      "hover:text-cyan-300 hover:after:w-full",
      "after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:transition-all after:duration-300 after:content-['']",
      isActive
        ? "text-cyan-300 after:w-full after:bg-cyan-300"
        : "text-slate-300 after:w-0 after:bg-cyan-300",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/15 bg-slate-950/80 backdrop-blur-2xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-white font-semibold text-lg">HealthCare+</h1>
              <p className="text-slate-400 text-xs">Hospital Management System</p>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-sm text-slate-200 capitalize">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition shadow-md shadow-rose-500/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition shadow-md shadow-blue-500/20"
              >
                Sign Up
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg bg-white/10 border border-white/10"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-3 border-t border-white/10">
                {user ? (
                  <>
                    <p className="text-sm text-slate-400 mb-3 capitalize">
                      Role: {user.role || "User"}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 rounded-xl bg-rose-500 text-white font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/register");
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;