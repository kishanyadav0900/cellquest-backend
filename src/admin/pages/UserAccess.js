import React, { useState, useEffect } from "react";
import { supabase } from "../services/api";

// Smart role resolution: if role not set (legacy session) but token exists → treat as admin
const getRole = () => {
  const stored = localStorage.getItem("admin-role");
  const hasToken = !!localStorage.getItem("admin-token");
  return stored || (hasToken ? "admin" : "viewer");
};

function UserAccess() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", role: "viewer" });
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [editingRole, setEditingRole] = useState(null); // id of user whose role is being changed

  const isAdmin = getRole() === "admin";

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id, email, role, created_at")
        .order("id", { ascending: true });
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    }
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("Only admins can create new users.");
    if (!form.email || !form.password) return setStatus({ type: "error", message: "Email and password are required." });
    if (form.password.length < 6) return setStatus({ type: "error", message: "Password must be at least 6 characters." });

    setSaving(true);
    setStatus(null);
    try {
      const { error } = await supabase
        .from("admin_users")
        .insert({ email: form.email.trim().toLowerCase(), password_hash: form.password, role: form.role });
      if (error) throw error;
      setStatus({ type: "success", message: `✅ User "${form.email}" created with ${form.role === "admin" ? "Admin (full edit)" : "Viewer (read-only)"} access.` });
      setForm({ email: "", password: "", role: "viewer" });
      setShowForm(false);
      await fetchUsers();
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to create user." });
    }
    setSaving(false);
  };

  const handleRoleChange = async (user, newRole) => {
    if (!isAdmin) return alert("Only admins can change roles.");
    try {
      const { error } = await supabase.from("admin_users").update({ role: newRole }).eq("id", user.id);
      if (error) throw error;
      setEditingRole(null);
      await fetchUsers();
      setStatus({ type: "success", message: `✅ "${user.email}" role updated to ${newRole}.` });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      alert("Failed to update role.");
    }
  };

  const handleDelete = async (user) => {
    if (!isAdmin) return alert("Only admins can remove users.");
    if (users.length <= 1) return alert("Cannot remove the last admin user!");
    if (!window.confirm(`Remove access for "${user.email}"? They will not be able to log in.`)) return;
    try {
      const { error } = await supabase.from("admin_users").delete().eq("id", user.id);
      if (error) throw error;
      await fetchUsers();
    } catch (err) {
      alert("Failed to remove user.");
    }
  };

  const getRoleBadge = (role) => {
    const isAdminRole = role === "admin";
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.5px",
        background: isAdminRole ? "rgba(248,113,84,0.15)" : "rgba(46,125,50,0.15)",
        color: isAdminRole ? "#fca5a5" : "#E7F1A8",
        border: `1px solid ${isAdminRole ? "rgba(248,113,84,0.3)" : "rgba(46,125,50,0.3)"}`,
      }}>
        {isAdminRole ? "🔑" : "👁️"} {isAdminRole ? "Admin" : "Viewer"}
      </span>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="admin-page-title">👥 User Access Management</h1>
          <p className="admin-page-subtitle">
            Create and manage who can access the admin panel. Choose between read-only (Viewer) or full edit (Admin) access.
          </p>
        </div>
        {isAdmin && (
          <button className="admin-btn admin-btn-primary" style={{ marginTop: "4px" }}
            onClick={() => { setShowForm(!showForm); setStatus(null); }}>
            {showForm ? "✕ Cancel" : "+ Add User"}
          </button>
        )}
      </div>

      {/* Access Level Info Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.2)", borderRadius: "14px", padding: "18px" }}>
          <div style={{ fontSize: "20px", marginBottom: "8px" }}>👁️ Viewer Access</div>
          <div style={{ fontWeight: 600, color: "#E7F1A8", marginBottom: "8px" }}>Read-Only</div>
          <ul style={{ color: "#64748b", fontSize: "13px", lineHeight: 2, paddingLeft: "18px", margin: 0 }}>
            <li>View all appointments, patients, doctors</li>
            <li>View the test catalog and prices</li>
            <li>Send email notifications to patients/doctors</li>
            <li>❌ Cannot add, edit, or delete any data</li>
          </ul>
        </div>
        <div style={{ background: "rgba(248,113,84,0.08)", border: "1px solid rgba(248,113,84,0.2)", borderRadius: "14px", padding: "18px" }}>
          <div style={{ fontSize: "20px", marginBottom: "8px" }}>🔑 Admin Access</div>
          <div style={{ fontWeight: 600, color: "#fca5a5", marginBottom: "8px" }}>Full Control</div>
          <ul style={{ color: "#64748b", fontSize: "13px", lineHeight: 2, paddingLeft: "18px", margin: 0 }}>
            <li>Everything a Viewer can do</li>
            <li>Add, edit, and delete all data</li>
            <li>Manage tests, packages, and prices</li>
            <li>✅ Create and manage other user accounts</li>
          </ul>
        </div>
      </div>

      {/* Status banner */}
      {status && (
        <div style={{
          padding: "12px 18px", borderRadius: "10px", marginBottom: "18px", fontSize: "13px", fontWeight: 500,
          background: status.type === "success" ? "rgba(46,125,50,0.12)" : "rgba(239,68,68,0.12)",
          border: `1px solid ${status.type === "success" ? "rgba(46,125,50,0.25)" : "rgba(239,68,68,0.25)"}`,
          color: status.type === "success" ? "#E7F1A8" : "#fca5a5",
        }}>
          {status.message}
        </div>
      )}

      {/* Create User Form */}
      {showForm && isAdmin && (
        <div className="admin-card" style={{ marginBottom: "24px", border: "1px solid rgba(90,138,26,0.25)" }}>
          <div className="admin-chart-title">➕ Create New Admin User</div>
          <form onSubmit={handleCreate}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div className="sf-field">
                <label>Email Address *</label>
                <input className="admin-input" type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="colleague@example.com" required />
              </div>
              <div className="sf-field">
                <label>Password *</label>
                <div style={{ position: "relative" }}>
                  <input className="admin-input" type={showPw ? "text" : "password"} value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 6 characters" required />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px", opacity: 0.7 }}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div className="sf-field">
                <label>Access Level *</label>
                <select className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="viewer">👁️ Viewer (Read-only)</option>
                  <option value="admin">🔑 Admin (Full Edit)</option>
                </select>
              </div>
            </div>

            {/* Permission preview */}
            <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", marginBottom: "16px", fontSize: "13px" }}>
              {form.role === "viewer" ? (
                <span style={{ color: "#E7F1A8" }}>👁️ This user will be able to <strong>view</strong> all data and send emails, but <strong>cannot edit</strong> anything.</span>
              ) : (
                <span style={{ color: "#fca5a5" }}>🔑 This user will have <strong>full admin access</strong> — they can add, edit, delete data and manage other users.</span>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ minWidth: "160px" }}>
                {saving ? "Creating..." : "Create User Account"}
              </button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={() => { setShowForm(false); setStatus(null); }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div className="admin-chart-title" style={{ marginBottom: 0 }}>Active Users ({users.length})</div>
        </div>

        {loading ? (
          <div className="admin-loading">Loading users…</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {users.map((user, i) => (
              <div key={user.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 18px", borderRadius: "12px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                {/* Avatar + Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${i === 0 ? "#F87154,#fa8a6a" : "#5a8a1a,#6a9a2a"})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px", fontWeight: 700, color: "#fff"
                  }}>
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: "14px" }}>{user.email}</div>
                    <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>
                      {i === 0 ? "Primary account" : "Team member"}
                      {user.created_at && ` · Added ${new Date(user.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
                    </div>
                  </div>
                </div>

                {/* Role + Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {editingRole === user.id && isAdmin ? (
                    <>
                      <select className="admin-input" style={{ width: "auto", padding: "6px 12px", fontSize: "12px" }}
                        defaultValue={user.role}
                        onChange={e => handleRoleChange(user, e.target.value)}
                      >
                        <option value="viewer">👁️ Viewer</option>
                        <option value="admin">🔑 Admin</option>
                      </select>
                      <button onClick={() => setEditingRole(null)}
                        style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "13px" }}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {getRoleBadge(user.role)}
                      {isAdmin && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => setEditingRole(user.id)}
                            style={{ background: "rgba(46,125,50,0.12)", color: "#E7F1A8", border: "1px solid rgba(46,125,50,0.25)", padding: "4px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                            Change Role
                          </button>
                          {users.length > 1 && (
                            <button onClick={() => handleDelete(user)}
                              style={{ background: "rgba(198,40,40,0.1)", color: "#fca5a5", border: "1px solid rgba(198,40,40,0.2)", padding: "4px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                              Remove
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .sf-field { display: flex; flex-direction: column; gap: 7px; }
        .sf-field label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.7px; }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 2fr 1fr"],
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default UserAccess;
