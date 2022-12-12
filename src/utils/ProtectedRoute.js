import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  loggedIn,
  path,
  ...props
}) => {

  return loggedIn ? <Component {...props} /> : <Navigate to="/" />;
};
