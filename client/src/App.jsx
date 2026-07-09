import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./components/Home";
import Otpvarify from "./components/Otpvarify";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AllDoctors from "./pages/AllDoctors";
import SlotBooking from "./pages/SlotBooking";
import CreateDoctor from "./DoctorPages/CreateDoctor";
import Appointment from "./DoctorPages/Appointment";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<Otpvarify />} />
         <Route path="/" element={<Home />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/about" element={<About/>}/>
         

        {/* Protected Routes */}   
        <Route element={<ProtectedRoute allowedRoles={["patient"]}/>} >
         <Route path="/slot/:id" element={<SlotBooking/>} />
         <Route path="/allDoctors" element={<AllDoctors/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["doctor"]}/>} >
        <Route path="/createDoctor" element={<CreateDoctor/>}/>
        <Route path="/appointmentForm/:doctorId" element={<Appointment/>}/>
        

        </Route>


      </Routes>
    </>
  );
};

export default App;