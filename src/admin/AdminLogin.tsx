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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#070707] border border-[#1b1b1b] p-8 rounded">
        <h1 className="text-2xl font-semibold uppercase text-white mb-6">
          Acceso administrador
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#bdbdbd] mb-2">
              Email
            </label>
            <input
              className="w-full bg-black border border-[#595959] text-white h-[48px] px-4 focus:outline-none"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#bdbdbd] mb-2">
              Password
            </label>
            <input
              className="w-full bg-black border border-[#595959] text-white h-[48px] px-4 focus:outline-none"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-sm text-white bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full h-[48px] bg-[#ff5100] text-white font-semibold uppercase"
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
