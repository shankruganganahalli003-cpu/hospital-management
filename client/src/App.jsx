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
        <Route element={<ProtectedRoute />}>
         
        </Route>
      </Routes>
    </>
  );
};

export default App;