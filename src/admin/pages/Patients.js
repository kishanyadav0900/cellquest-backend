import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const statusClass = { "Completed": "badge-success", "In Progress": "badge-warning", "Pending": "badge-info" };

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", gender: "Male", phone: "", test: "", doctor: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await api.patients.getAll();
        setPatients(data);
      } catch (err) {
        console.error("Failed to load patients", err);
      }
    };
    fetchPatients();
  }, []);

  const filtered = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search);
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        const updated = await api.patients.update({ ...form, id: editId });
        setPatients(patients.map((p) => (p.id === editId ? updated : p)));
        setEditId(null);
      } else {
        const created = await api.patients.create(form);
        setPatients([...patients, created]);
      }
      setForm({ name: "", age: "", gender: "Male", phone: "", test: "", doctor: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save patient", err);
      alert("Failed to save patient");
    }
  };

  const handleEdit = (pat) => {
    setForm({ name: pat.name, age: pat.age, gender: pat.gender, phone: pat.phone, test: pat.test, doctor: pat.doctor });
    setEditId(pat.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this patient?")) {
      try {
        await api.patients.delete(id);
        setPatients(patients.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Failed to delete patient", err);
        alert("Failed to delete patient");
      }
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">🧑‍🤝‍🧑 Patients</h1>

      <div className="admin-search-bar">
        <input
          className="admin-input"
          type="text"
          placeholder="🔍  Search by name or test…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="admin-input"
          style={{ maxWidth: "160px" }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", age: "", gender: "Male", phone: "", test: "", doctor: "" }); }}
        >
          + Add Patient
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: "22px" }}>
          <div className="admin-chart-title">{editId ? "✏️ Edit Patient" : "➕ Add New Patient"}</div>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <div className="pf"><label>Full Name *</label><input className="admin-input" required value={form.name}   onChange={(e) => setForm({ ...form, name: e.target.value })}   placeholder="Patient name" /></div>
            <div className="pf"><label>Age *</label><input className="admin-input" type="number" required value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" /></div>
            <div className="pf">
              <label>Gender</label>
              <select className="admin-input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div className="pf"><label>Phone *</label><input className="admin-input" required value={form.phone}  onChange={(e) => setForm({ ...form, phone: e.target.value })}  placeholder="+91 XXXXX XXXXX" /></div>
            <div className="pf"><label>Test Name *</label><input className="admin-input" required value={form.test}   onChange={(e) => setForm({ ...form, test: e.target.value })}   placeholder="e.g. Blood Count" /></div>
            <div className="pf"><label>Referring Doctor *</label><input className="admin-input" required value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} placeholder="Dr. Name" /></div>
            <div style={{ gridColumn: "1/-1", display: "flex", gap: "12px" }}>
              <button type="submit" className="admin-btn admin-btn-primary">{editId ? "Update" : "Save Patient"}</button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: "12px", color: "#64748b", fontSize: "13px" }}>
        Showing {filtered.length} of {patients.length} records
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>#</th><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Test</th><th>Doctor</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="10" style={{ textAlign: "center", color: "#475569", padding: "30px" }}>No patients found.</td></tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: "#475569" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600, color: "#e2e8f0" }}>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.phone}</td>
                  <td>{p.test}</td>
                  <td>{p.doctor}</td>
                  <td style={{ color: "#64748b" }}>{p.date}</td>
                  <td><span className={`admin-badge ${statusClass[p.status]}`}>{p.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="admin-btn admin-btn-primary" style={{ padding: "5px 12px", fontSize: "12px" }} onClick={() => handleEdit(p)}>Edit</button>
                      <button className="admin-btn admin-btn-danger"  style={{ padding: "5px 12px", fontSize: "12px" }} onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.7px; }
        @media (max-width: 768px) {
          form[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Patients;
