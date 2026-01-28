import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAdminUser, useAuth } from "./AuthContext";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAdmin;
