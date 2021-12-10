// src/components/IsPrivate.js

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin({ children }) {
  const { isLoggedIn, isAdmin, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsAdmin;
