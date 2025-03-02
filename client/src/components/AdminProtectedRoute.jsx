import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    toast.error("Please login to access this page", {
      position: "top-center",
      theme: "dark",
    });
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    toast.error("Access denied. Only admins can access this page", {
      position: "top-center",
      theme: "dark",
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoute;
