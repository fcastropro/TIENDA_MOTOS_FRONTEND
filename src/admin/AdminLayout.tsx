import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ADMIN_RESOURCES } from "./resources";
import { useAuth } from "./AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <aside className="w-[260px] bg-[#070707] border-r border-[#1b1b1b] min-h-screen p-6">
          <div className="text-xl font-semibold uppercase mb-8">
            Admin Panel
          </div>
          <nav className="space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-[#ff5100]" : "hover:bg-[#1a1a1a]"
                }`
              }
            >
              Dashboard
            </NavLink>
            {ADMIN_RESOURCES.map((resource) => (
              <NavLink
                key={resource.key}
                to={`/admin/${resource.key}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive ? "bg-[#ff5100]" : "hover:bg-[#1a1a1a]"
                  }`
                }
              >
                {resource.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="flex items-center justify-between px-8 py-4 border-b border-[#1b1b1b] bg-[#0b0b0b]">
            <div className="text-lg font-semibold uppercase">
              Administracion
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#bdbdbd]">
                {user?.email || user?.username || "admin"}
              </span>
              <button
                className="px-4 py-2 border border-[#595959] rounded hover:bg-[#ff5100]"
                onClick={() => void logout()}
              >
                Salir
              </button>
            </div>
          </header>
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
