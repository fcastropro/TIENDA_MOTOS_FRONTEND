import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ADMIN_RESOURCES } from "./resources";
import { useAuth } from "./AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-theme">
      <div className={`admin-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)}></div>
      <div className="admin-container">
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="admin-brand">
            <span>Aros y Llantas Metamorfosis</span>
          </div>
          <nav className="admin-nav">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa fa-dashboard"></i>
              Dashboard
            </NavLink>
            {ADMIN_RESOURCES.map((resource) => (
              <NavLink
                key={resource.key}
                to={`/admin/${resource.key}`}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <i className="fa fa-folder"></i>
                {resource.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="admin-main">
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <button
                className="admin-icon-btn"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                <i className="fa fa-bars"></i>
              </button>
            </div>
            <div className="admin-user">
              <span>{user?.email || user?.username || "admin"}</span>
              <button
                className="admin-action-btn"
                onClick={() => void logout()}
              >
                Salir
              </button>
            </div>
          </header>
          <div className="admin-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
