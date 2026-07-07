import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

    if(user.role === "patient") return <Navigate to="/" replace />

  return <Outlet />;
};

export default ProtectedRoute;