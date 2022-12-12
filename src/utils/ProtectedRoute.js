import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({component: Component, loggedIn, path, ...props }) => {
  const location = useLocation()
  console.log(location)
  return loggedIn ? <Component {...props} /> : <Navigate to="/" />;
};
