// src/admin/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Checks localStorage for admin-token.
 * If not authenticated, redirects to /admin/login.
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin-token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
