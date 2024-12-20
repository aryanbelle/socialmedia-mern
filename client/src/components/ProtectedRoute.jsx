import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("mytoken"); // Check if token exists

  if (token === null) {
    // If no token, redirect to signin page
    return <Navigate to="/signin" replace />;
  }

  // If token exists, render the element (protected route content)
  return element;
};

export default ProtectedRoute;
