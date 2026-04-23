import React, { useState, useEffect } from "react";
import { api, supabase } from "../services/api";

function Settings() {
  const [current, setCurrent] = useState({ email: "", password: "" });
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [status, setStatus] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [step, setStep] = useState("verify");

  // ─── User Management State ───
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const [showUserForm, setShowUserForm] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const [showUserPw, setShowUserPw] = useState(false);

  // Load current credentials & users on mount
  useEffect(() => {
    const fetchCreds = async () => {
      try {
        const { email } = await api.auth.getCredentials();
        setCurrent({ email, password: "hidden" });
        setForm((f) => ({ ...f, email }));
      } catch (err) {
        console.error("Failed to load credentials");
      }
    };
    fetchCreds();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id, email")
        .order("id", { ascending: true });
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setStep("update");
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
        newPassword: form.password,
      });

      setCurrent({ ...current, email: form.email.trim() });
      setStatus({ type: "success", message: "✅ Admin credentials updated! Use new credentials on next login." });
      setStep("verify");
      setVerifyPassword("");
      setForm((f) => ({ ...f, password: "", confirmPassword: "" }));
      fetchUsers();
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to update credentials." });
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setUserStatus(null);

    if (!userForm.email || !userForm.password) {
      return setUserStatus({ type: "error", message: "Email and password are required." });
    }
    if (userForm.password.length < 6) {
      return setUserStatus({ type: "error", message: "Password must be at least 6 characters." });
    }

    try {
      const { error } = await supabase
        .from("admin_users")
        .insert({ email: userForm.email.trim(), password_hash: userForm.password });
      if (error) throw error;

      setUserStatus({ type: "success", message: `✅ User ${userForm.email} added successfully!` });
      setUserForm({ email: "", password: "" });
      setShowUserForm(false);
      fetchUsers();
    } catch (err) {
      setUserStatus({ type: "error", message: err.message || "Failed to add user." });
    }
  };

  const handleDeleteUser = async (user) => {
    if (users.length <= 1) {
      return alert("Cannot delete the last admin user!");
    }
    if (!window.confirm(`Remove ${user.email} from admin access?`)) return;

    try {
      const { error } = await supabase.from("admin_users").delete().eq("id", user.id);
      if (error) throw error;
      fetchUsers();
    } catch (err) {
      alert("Failed to remove user");
    }
  };

  const statusBox = (st) =>
    st && (
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          marginBottom: "18px",
          fontSize: "13px",
          fontWeight: 500,
          background: st.type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
          border: `1px solid ${st.type === "success" ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
          color: st.type === "success" ? "#34d399" : "#fca5a5",
        }}
      >
        {st.message}
      </div>
    );

  return (
    <div>
      <h1 className="admin-page-title">⚙️ Settings</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
        {/* ─── Credential Management Card ─── */}
        <div className="admin-card">
          <div className="admin-chart-title">🔐 Change Your Password</div>
          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px", lineHeight: 1.6 }}>
            Current email: <strong style={{ color: "#a5b4fc" }}>{current.email}</strong>
          </p>

          {statusBox(status)}

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
                  {form.password && <PasswordStrength password={form.password} />}
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
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    onClick={() => { setStep("verify"); setStatus(null); setVerifyPassword(""); }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* ─── User Management Card ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div className="admin-chart-title" style={{ marginBottom: 0 }}>👥 Admin Users</div>
              <button
                className="admin-btn admin-btn-primary"
                style={{ fontSize: "12px", padding: "6px 14px" }}
                onClick={() => { setShowUserForm(!showUserForm); setUserStatus(null); }}
              >
                {showUserForm ? "✕ Cancel" : "+ Add User"}
              </button>
            </div>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px", lineHeight: 1.6 }}>
              Create login accounts for your employees. Each user can log in to the admin panel with their own email and password.
            </p>

            {statusBox(userStatus)}

            {/* Add User Form */}
            {showUserForm && (
              <form onSubmit={handleAddUser} style={{ marginBottom: "18px" }}>
                <div style={{
                  background: "rgba(99, 102, 241, 0.06)",
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  borderRadius: "12px",
                  padding: "16px",
                }}>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                    <div className="sf-field" style={{ flex: "1", minWidth: "180px" }}>
                      <label>Employee Email *</label>
                      <input
                        className="admin-input"
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        placeholder="employee@gmail.com"
                        required
                      />
                    </div>
                    <div className="sf-field" style={{ flex: "1", minWidth: "180px" }}>
                      <label>Password *</label>
                      <div className="password-wrapper">
                        <input
                          className="admin-input"
                          type={showUserPw ? "text" : "password"}
                          value={userForm.password}
                          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                          placeholder="Min 6 characters"
                          required
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowUserPw((v) => !v)} aria-label="Toggle">
                          {showUserPw ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-confirm"
                    style={{ width: "100%" }}
                  >
                    ✓ Create User Account
                  </button>
                </div>
              </form>
            )}

            {/* Users List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {users.map((u, i) => (
                <div
                  key={u.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4"][i % 6]}, ${["#818cf8","#34d399","#fbbf24","#f87171","#a78bfa","#22d3ee"][i % 6]})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {u.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#e2e8f0" }}>
                        {u.email}
                      </div>
                      <div style={{ fontSize: "11px", color: "#4a5568" }}>
                        {i === 0 ? "Primary Admin" : "Employee"}
                      </div>
                    </div>
                  </div>
                  {users.length > 1 && (
                    <button
                      onClick={() => handleDeleteUser(u)}
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        color: "#fca5a5",
                        border: "1px solid rgba(239,68,68,0.2)",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => { e.target.style.background = "rgba(239,68,68,0.25)"; e.target.style.color = "#fff"; }}
                      onMouseOut={(e) => { e.target.style.background = "rgba(239,68,68,0.1)"; e.target.style.color = "#fca5a5"; }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security Tips */}
          <div className="admin-card">
            <div className="admin-chart-title">🔒 Security Tips</div>
            <ul style={{ color: "#64748b", fontSize: "13px", lineHeight: 2, paddingLeft: "18px" }}>
              <li>Use strong passwords (8+ chars, mixed case, numbers)</li>
              <li>Never share admin credentials with outsiders</li>
              <li>Remove employees who no longer need access</li>
              <li>Log out when done — top-right Logout button</li>
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
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: "3px", borderRadius: "3px", background: i < score ? color : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ fontSize: "11px", color, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

export default Settings;
