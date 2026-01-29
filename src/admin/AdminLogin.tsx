import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname || "/admin";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (loginError) {
      const message =
        loginError instanceof Error
          ? loginError.message
          : "Credenciales incorrectas o sin permisos.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-theme flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md admin-form-card shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <h1 className="text-2xl font-semibold uppercase text-white mb-2 tracking-wide">
          Acceso administrador
        </h1>
        <p className="text-sm text-slate-300 mb-6">
          Ingresa con tu correo y contrasena para administrar el sistema.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#bdbdbd] mb-2 uppercase tracking-wide">
              Email
            </label>
            <input
              className="admin-input focus:outline-none focus:border-[#2563eb]"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#bdbdbd] mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              className="admin-input focus:outline-none focus:border-[#2563eb]"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-sm text-white bg-[#111827] border border-[#1f2937] px-3 py-2 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full h-[50px] bg-[#2563eb] text-white font-semibold uppercase tracking-wide hover:opacity-90 transition-all duration-200 rounded"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
