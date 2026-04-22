import React, { useState, useEffect } from "react";
import { api } from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", specialty: "", phone: "", email: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.doctors.getAll();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to load doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        const updated = await api.doctors.update({ ...form, id: editId });
        setDoctors(doctors.map((d) => (d.id === editId ? updated : d)));
        setEditId(null);
      } else {
        const created = await api.doctors.create(form);
        setDoctors([...doctors, created]);
      }
      setForm({ name: "", specialty: "", phone: "", email: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save doctor", err);
      alert("Failed to save doctor");
    }
  };

  const handleEdit = (doc) => {
    setForm({ name: doc.name, specialty: doc.specialty, phone: doc.phone, email: doc.email });
    setEditId(doc.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this doctor?")) {
      try {
        await api.doctors.delete(id);
        setDoctors(doctors.filter((d) => d.id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Failed to delete doctor");
      }
    }
  };

  const statusClass = { Active: "badge-success", "On Leave": "badge-warning", Inactive: "badge-danger" };

  return (
    <div>
      <h1 className="admin-page-title">👨‍⚕️ Doctors</h1>

      <div className="admin-search-bar">
        <input
          className="admin-input"
          type="text"
          placeholder="🔍  Search by name or specialty…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", specialty: "", phone: "", email: "" }); }}
        >
          + Add Doctor
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom: "22px" }}>
          <div className="admin-chart-title">{editId ? "✏️ Edit Doctor" : "➕ Add New Doctor"}</div>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div className="login-field">
              <label>Full Name *</label>
              <input className="admin-input" required value={form.name}      onChange={(e) => setForm({ ...form, name: e.target.value })}      placeholder="Dr. Full Name" />
            </div>
            <div className="login-field">
              <label>Specialty *</label>
              <input className="admin-input" required value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} placeholder="e.g. Pathology" />
            </div>
            <div className="login-field">
              <label>Phone *</label>
              <input className="admin-input" required value={form.phone}     onChange={(e) => setForm({ ...form, phone: e.target.value })}     placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="login-field">
              <label>Email *</label>
              <input className="admin-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="doctor@cellquest.in" />
            </div>
            <div style={{ gridColumn: "1/-1", display: "flex", gap: "12px" }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                {editId ? "Update Doctor" : "Save Doctor"}
              </button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={() => { setShowForm(false); setEditId(null); }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Specialty</th><th>Phone</th><th>Email</th><th>Status</th><th>Joined</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: "center", color: "#475569", padding: "30px" }}>No doctors found.</td></tr>
            ) : (
              filtered.map((doc, i) => (
                <tr key={doc.id}>
                  <td style={{ color: "#475569" }}>{i + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{doc.name}</div>
                  </td>
                  <td>{doc.specialty}</td>
                  <td>{doc.phone}</td>
                  <td style={{ color: "#64748b" }}>{doc.email}</td>
                  <td><span className={`admin-badge ${statusClass[doc.status]}`}>{doc.status}</span></td>
                  <td>{doc.joined}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="admin-btn admin-btn-primary" style={{ padding: "5px 12px", fontSize: "12px" }} onClick={() => handleEdit(doc)}>Edit</button>
                      <button className="admin-btn admin-btn-danger"  style={{ padding: "5px 12px", fontSize: "12px" }} onClick={() => handleDelete(doc.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .login-field { display: flex; flex-direction: column; gap: 6px; }
        .login-field label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.7px; }
        @media (max-width: 600px) {
          form[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Doctors;
