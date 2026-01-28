import React from "react";
import { ADMIN_RESOURCES } from "./resources";

const AdminDashboard = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold uppercase mb-4">
        Panel de administracion
      </h2>
      <p className="text-[#bdbdbd] mb-6">
        Selecciona una seccion para administrar catalogos, compras, usuarios y
        contactos.
      </p>
      <div className="grid grid-cols-12 gap-4">
        {ADMIN_RESOURCES.map((resource) => (
          <div
            key={resource.key}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#070707] border border-[#1b1b1b] p-4 rounded"
          >
            <div className="text-lg font-semibold">{resource.label}</div>
            <div className="text-sm text-[#8f8f8f]">{resource.endpoint}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
