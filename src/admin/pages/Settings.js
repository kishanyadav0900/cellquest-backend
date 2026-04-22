import React, { useState, useEffect } from "react";
import { api } from "../services/api";

function Settings() {
  const [current, setCurrent] = useState({ email: "", password: "" });
  const [form, setForm]     = useState({ email: "", password: "", confirmPassword: "" });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [step, setStep] = useState("verify"); // 'verify' | 'update'

  // Load current credentials on mount
  useEffect(() => {
    const fetchCreds = async () => {
      try {
        const { email } = await api.auth.getCredentials();
        setCurrent({ email, password: "hidden" }); // don't need real password
        setForm((f) => ({ ...f, email }));
      } catch (err) {
        console.error("Failed to load credentials");
      }
    };
    fetchCreds();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    setStep("update"); // Handled implicitly on update endpoint
    setStatus(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!form.email || !form.password) {
      return setStatus({ type: "error", message: "Email and password cannot be empty." });
    }
    if (form.password.length < 8) {
      return setStatus({ type: "error", message: "Password must be at least 8 characters." });
    }
    if (form.password !== form.confirmPassword) {
      return setStatus({ type: "error", message: "New password and confirm password do not match." });
    }

    try {
      await api.auth.updateCredentials({
        currentPassword: verifyPassword,
        email: form.email.trim(),
        newPassword: form.password
      });

      setCurrent({ ...current, email: form.email.trim() });
      setStatus({ type: "success", message: "✅ Admin credentials updated successfully! Use the new credentials on next login." });
      setStep("verify");
      setVerifyPassword("");
      setForm((f) => ({ ...f, password: "", confirmPassword: "" }));
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to update credentials." });
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">⚙️ Settings</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>

        {/* ─── Credential Management Card ─── */}
        <div className="admin-card">
          <div className="admin-chart-title">🔐 Change Admin Credentials</div>
          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px", lineHeight: 1.6 }}>
            This is the only place where Admin login credentials can be changed.
            Current email: <strong style={{ color: "#a5b4fc" }}>{current.email}</strong>
          </p>

          {status && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                marginBottom: "18px",
                fontSize: "13px",
                fontWeight: 500,
                background: status.type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                border: `1px solid ${status.type === "success" ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
                color: status.type === "success" ? "#34d399" : "#fca5a5",
              }}
            >
              {status.message}
            </div>
          )}

          {/* Step 1: Verify current password */}
          {step === "verify" && (
            <form onSubmit={handleVerify}>
              <div className="sf-field">
                <label>Current Password *</label>
                <div className="password-wrapper">
                  <input
                    className="admin-input"
                    type={showVerify ? "text" : "password"}
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    placeholder="Enter current password to proceed"
                    required
                  />
                  <button type="button" className="toggle-password" onClick={() => setShowVerify((v) => !v)} aria-label="Toggle">
                    {showVerify ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary" style={{ marginTop: "16px", width: "100%" }}>
                Verify & Continue →
              </button>
            </form>
          )}

          {/* Step 2: Update credentials */}
          {step === "update" && (
            <form onSubmit={handleUpdate}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="sf-field">
                  <label>New Email Address *</label>
                  <input
                    className="admin-input"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="new@email.com"
                    required
                  />
                </div>
                <div className="sf-field">
                  <label>New Password *</label>
                  <div className="password-wrapper">
                    <input
                      className="admin-input"
                      type={showNew ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Min 8 characters"
                      required
                    />
                    <button type="button" className="toggle-password" onClick={() => setShowNew((v) => !v)} aria-label="Toggle">
                      {showNew ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {form.password && (
                    <PasswordStrength password={form.password} />
                  )}
                </div>
                <div className="sf-field">
                  <label>Confirm New Password *</label>
                  <div className="password-wrapper">
                    <input
                      className="admin-input"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      placeholder="Repeat new password"
                      required
                    />
                    <button type="button" className="toggle-password" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle">
                      {showConfirm ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" className="admin-btn admin-btn-primary" style={{ flex: 1 }}>
                    Update Credentials
                  </button>
                  <button type="button" className="admin-btn admin-btn-danger" onClick={() => { setStep("verify"); setStatus(null); setVerifyPassword(""); }}>
                    Back
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* ─── Info Card ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="admin-card">
            <div className="admin-chart-title">ℹ️ How Credentials Work</div>
            <ul style={{ color: "#64748b", fontSize: "13px", lineHeight: 2, paddingLeft: "18px" }}>
              <li>Admin credentials are stored securely in the browser.</li>
              <li>Only someone already logged in can change credentials.</li>
              <li>Default login: <code style={{ color: "#a5b4fc" }}>admin@cellquestindia.com</code></li>
              <li>Default password: <code style={{ color: "#a5b4fc" }}>Admin@2024</code></li>
              <li>Change the defaults immediately after first login.</li>
              <li>A real database backend can be connected to this Settings page.</li>
            </ul>
          </div>

          <div className="admin-card">
            <div className="admin-chart-title">🔒 Security Tips</div>
            <ul style={{ color: "#64748b", fontSize: "13px", lineHeight: 2, paddingLeft: "18px" }}>
              <li>Use a strong password (8+ chars, mixed case, numbers)</li>
              <li>Never share your admin credentials</li>
              <li>Log out when done — top-right Logout button</li>
              <li>Change credentials periodically</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .sf-field { display: flex; flex-direction: column; gap: 7px; }
        .sf-field label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.7px; }
        .password-wrapper { position: relative; }
        .toggle-password { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; opacity: 0.7; }
        .toggle-password:hover { opacity: 1; }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Password strength indicator ───
function PasswordStrength({ password }) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const label = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"][score];
  const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4"];
  const color = colors[score];

  return (
    <div style={{ marginTop: "6px" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[0,1,2,3].map((i) => (
          <div key={i} style={{ flex: 1, height: "3px", borderRadius: "3px", background: i < score ? color : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ fontSize: "11px", color, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

export default Settings;
