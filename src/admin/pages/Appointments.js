// src/admin/pages/Appointments.js
import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const TIMES = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
               "12:00 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"];

const statusClass = { "Completed": "badge-success", "In Progress": "badge-warning", "Pending": "badge-info", "Cancelled": "badge-danger" };

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: "", phone: "", test: "", doctor: "", date: "", time: TIMES[0], status: "Pending" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await api.appointments.getAll();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    };
    fetchAppointments();
  }, []);

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.test.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        const updated = await api.appointments.update({ ...form, id: editId });
        setAppointments(appointments.map((a) => (a.id === editId ? updated : a)));
        setEditId(null);
      } else {
        const created = await api.appointments.create(form);
        setAppointments([...appointments, created]);
      }
      setForm({ patient: "", phone: "", test: "", doctor: "", date: "", time: TIMES[0], status: "Pending" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save appointment", err);
      alert("Failed to save appointment");
    }
  };

  const handleEdit = (apt) => {
    setForm({ patient: apt.patient, phone: apt.phone, test: apt.test, doctor: apt.doctor, date: apt.date, time: apt.time, status: apt.status });
    setEditId(apt.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this appointment?")) {
      try {
        await api.appointments.delete(id);
        setAppointments(appointments.filter((a) => a.id !== id));
      } catch (err) {
        console.error("Failed to delete appointment", err);
        alert("Failed to delete appointment");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const apt = appointments.find(a => a.id === id);
    if (!apt) return;
    try {
      const updated = await api.appointments.update({ ...apt, status: newStatus });
      setAppointments(appointments.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">📅 Appointments</h1>

      {/* Summary Bar */}
      <div className="admin-stats-grid" style={{ marginBottom: "20px" }}>
        {["Pending", "In Progress", "Completed", "Cancelled"].map((s) => {
          const count = appointments.filter((a) => a.status === s).length;
          const icons = { Pending: "⏳", "In Progress": "🔄", Completed: "✅", Cancelled: "❌" };
          const colors = { Pending: "blue", "In Progress": "orange", Completed: "green", Cancelled: "red" };
          return (
            <div className="stat-card" key={s} style={{ cursor: "pointer" }} onClick={() => setFilterStatus(s)}>
              <div className={`stat-icon ${colors[s]}`}>{icons[s]}</div>
              <div className="stat-info">
                <div className="stat-number">{count}</div>
                <div className="stat-label">{s}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-search-bar">
        <input
          className="admin-input"
          type="text"
          placeholder="🔍  Search patient, test, doctor…"
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
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { setShowForm(true); setEditId(null); setForm({ patient: "", phone: "", test: "", doctor: "", date: "", time: TIMES[0] }); }}
        >
          + Book Appointment
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: "22px" }}>
          <div className="admin-chart-title">{editId ? "✏️ Edit Appointment" : "➕ Book New Appointment"}</div>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <div className="af"><label>Patient Name *</label><input className="admin-input" required value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} placeholder="Full name" /></div>
            <div className="af"><label>Phone *</label><input className="admin-input" required value={form.phone}   onChange={(e) => setForm({ ...form, phone: e.target.value })}   placeholder="+91 XXXXX XXXXX" /></div>
            <div className="af"><label>Test Name *</label><input className="admin-input" required value={form.test}    onChange={(e) => setForm({ ...form, test: e.target.value })}    placeholder="e.g. Blood Count" /></div>
            <div className="af"><label>Doctor *</label><input className="admin-input" required value={form.doctor}  onChange={(e) => setForm({ ...form, doctor: e.target.value })}  placeholder="Dr. Name" /></div>
            <div className="af">
              <label>Date *</label>
              <input className="admin-input" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="af">
              <label>Time Slot *</label>
              <select className="admin-input" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                {TIMES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "1/-1", display: "flex", gap: "12px" }}>
              <button type="submit" className="admin-btn admin-btn-primary">{editId ? "Update" : "Book Appointment"}</button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: "12px", color: "#64748b", fontSize: "13px" }}>
        Showing {filtered.length} of {appointments.length} appointments
        {filterStatus !== "All" && (
          <button style={{ marginLeft: "10px", background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: "13px" }} onClick={() => setFilterStatus("All")}>
            Clear filter ×
          </button>
        )}
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>#</th><th>Patient</th><th>Phone</th><th>Test</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="9" style={{ textAlign: "center", color: "#475569", padding: "30px" }}>No appointments found.</td></tr>
            ) : (
              filtered.map((a, i) => (
                <tr key={a.id}>
                  <td style={{ color: "#475569" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600, color: "#e2e8f0" }}>{a.patient}</td>
                  <td>{a.phone}</td>
                  <td>{a.test}</td>
                  <td>{a.doctor}</td>
                  <td style={{ color: "#64748b" }}>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <select
                      className={`admin-badge ${statusClass[a.status]}`}
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600 }}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="admin-btn admin-btn-primary" style={{ padding: "5px 12px", fontSize: "12px" }} onClick={() => handleEdit(a)}>Edit</button>
                      <button className="admin-btn admin-btn-danger"  style={{ padding: "5px 12px", fontSize: "12px" }} onClick={() => handleDelete(a.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .af { display: flex; flex-direction: column; gap: 6px; }
        .af label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.7px; }
        @media (max-width: 768px) {
          form[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Appointments;
