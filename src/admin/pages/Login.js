import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in, redirect to admin dashboard
  useEffect(() => {
    if (localStorage.getItem("admin-token")) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate a small delay for UX
    await new Promise((r) => setTimeout(r, 600));

    try {
      const { token } = await api.auth.login({ email: form.email.trim(), password: form.password });
      localStorage.setItem("admin-token", token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="login-bg-blur blur-1" />
      <div className="login-bg-blur blur-2" />

      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-icon">🧪</span>
          <div>
            <div className="login-brand-title">Cell Quest India</div>
            <div className="login-brand-sub">Admin Portal</div>
          </div>
        </div>

        <h2 className="login-heading">Welcome Back</h2>
        <p className="login-sub">Sign in to access the admin dashboard</p>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="login-field">
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@cellquestindia.com"
              required
              autoComplete="username"
              className="admin-input"
            />
          </div>

          <div className="login-field">
            <label htmlFor="admin-password">Password</label>
            <div className="password-wrapper">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="admin-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((p) => !p)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="login-spinner" />
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <p className="login-footer-note">
          Credentials are managed by the super admin via Settings panel.
        </p>
      </div>
    </div>
  );
}

export default Login;
