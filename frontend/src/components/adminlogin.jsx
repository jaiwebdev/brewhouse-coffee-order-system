import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Save JWT token
        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        // Save admin details
        localStorage.setItem(
          "admin",
          JSON.stringify(response.data.admin)
        );

        // Go to dashboard
        navigate("/admin/orders");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
            BrewHouse
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900">
            Admin Login
          </h1>

          <p className="mt-2 text-stone-500">
            Login to manage customer orders
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block font-semibold text-stone-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@brewhouse.com"
              required
              className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-semibold text-stone-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-600"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </section>
  );
}