import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./components/Home";
import Otpvarify from "./components/Otpvarify";

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
        {/* Protected Routes */}   
        <Route element={<ProtectedRoute />}>
         
        </Route>
      </Routes>
    </>
  );
};

export default App;