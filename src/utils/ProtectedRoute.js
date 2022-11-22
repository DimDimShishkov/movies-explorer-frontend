import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props }) => {
  console.log(props.loggedIn)
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/signup" />;
};
