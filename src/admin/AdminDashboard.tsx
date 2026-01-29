import React from "react";
import { ADMIN_RESOURCES } from "./resources";

const AdminDashboard = () => {
  return (
    <div className="text-white">
      <div className="admin-page-header">
        <h2 className="text-2xl font-semibold uppercase mb-2 tracking-wide">
        Panel de administracion
        </h2>
        <p className="text-slate-300">
          Administra catalogos, compras, usuarios y contactos desde este panel.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {ADMIN_RESOURCES.map((resource) => (
          <div
            key={resource.key}
            className="col-span-12 md:col-span-6 lg:col-span-4 admin-section-card"
          >
            <div className="text-lg font-semibold uppercase tracking-wide">
              {resource.label}
            </div>
            <div className="text-sm text-slate-400 mt-2">
              {resource.endpoint}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
