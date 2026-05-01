// src/admin/pages/Appointments.js
import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const TIMES = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
               "12:00 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"];

const statusClass = { "Completed": "badge-success", "In Progress": "badge-warning", "Pending": "badge-info", "Cancelled": "badge-danger" };

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: "", phone: "", email: "", test: "", doctor: "", date: "", time: TIMES[0], status: "Pending" });
  const [editId, setEditId] = useState(null);
  const _sr = localStorage.getItem("admin-role");
  const currentRole = _sr || (localStorage.getItem("admin-token") ? "admin" : "viewer");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.appointments.getAll();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
      try {
        const docs = await api.doctors.getAll();
        setDoctors(docs);
      } catch (err) {
        console.error("Failed to load doctors", err);
      }
    };
    fetchData();
  }, []);

  const filtered = appointments.filter((a) => {
    const matchSearch =
      (a.patient || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.test || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.doctor || "").toLowerCase().includes(search.toLowerCase());
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
      setForm({ patient: "", phone: "", email: "", test: "", doctor: "", date: "", time: TIMES[0], status: "Pending" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save appointment", err);
      alert("Failed to save appointment");
    }
  };

  const handleEdit = (apt) => {
    setForm({
      patient: apt.patient, phone: apt.phone, email: apt.email || "",
      test: apt.test, doctor: apt.doctor, date: apt.date, time: apt.time, status: apt.status
    });
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

  // ── Assign doctor inline from table dropdown ──
  const handleDoctorAssign = async (id, doctorName) => {
    const apt = appointments.find(a => a.id === id);
    if (!apt) return;
    try {
      const updated = await api.appointments.update({ ...apt, doctor: doctorName });
      setAppointments(appointments.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      console.error("Failed to assign doctor", err);
      alert("Failed to assign doctor");
    }
  };

  // ── Send confirmation via Gmail compose (works reliably) ──
  const handleSendConfirmation = (apt) => {
    const email = apt.email;
    if (!email) {
      alert("No email address found for this patient.\n\nPlease click 'Edit' and add the patient's email first, then try again.");
      return;
    }
    if (!apt.doctor || apt.doctor === "To be assigned") {
      alert("Please assign a doctor to this appointment first before sending confirmation.");
      return;
    }

    const subject = `Appointment Confirmed – Cell Quest India | ${apt.test}`;
    const body =
`Dear ${apt.patient},

Thank you for booking your test with Cell Quest India! We are pleased to confirm your appointment.

Here are your appointment details:

🔬 Test: ${apt.test}
👨‍⚕️ Assigned Doctor: ${apt.doctor}
📅 Date: ${apt.date}
🕐 Time: ${apt.time}

📋 Important Instructions:
• Please arrive 15 minutes before your scheduled time
• Carry a valid photo ID and any previous medical reports
• Follow any fasting instructions as applicable for your test

📍 Location:
Cell Quest India
Ist & 2nd floor, Plot no-5, Kirti Nagar
Sec 15 Part 1, Near Bindle Colour Lab
Gurgaon, Haryana 122001

For any queries or rescheduling, contact us at: +91 99901 55907

We look forward to serving you.

Warm regards,
Team Cell Quest India`;

    // Open Gmail compose — works reliably in browser
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  };

  // ── Send email to Doctor ──
  const handleSendDoctorEmail = (apt) => {
    if (!apt.doctor || apt.doctor === "To be assigned") {
      alert("Please assign a doctor to this appointment first.");
      return;
    }
    const doctor = doctors.find(d => d.name === apt.doctor);
    const doctorEmail = doctor?.email;
    if (!doctorEmail) {
      alert(`No email found for Dr. ${apt.doctor}.\n\nPlease add the doctor's email in the Doctors section first.`);
      return;
    }

    const subject = `Patient Appointment Details – ${apt.patient} | ${apt.test}`;
    const body =
`Dear Dr. ${apt.doctor},

A new patient appointment has been scheduled. Please find the details below:

👤 Patient Name: ${apt.patient}
📞 Patient Contact: ${apt.phone}
📧 Patient Email: ${apt.email || "N/A"}

🔬 Test Name: ${apt.test}
📅 Date: ${apt.date}
🕐 Time: ${apt.time}

ℹ️ Please ensure you are available at the scheduled time and review any prior medical history if available.

For any queries, please contact the lab at: +91 99901 55907

Best regards,
Cell Quest India – Admin`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(doctorEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
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
        {currentRole === "admin" && (
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => { setShowForm(true); setEditId(null); setForm({ patient: "", phone: "", email: "", test: "", doctor: "", date: "", time: TIMES[0], status: "Pending" }); }}
          >
            + Book Appointment
          </button>
        )}
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: "22px" }}>
          <div className="admin-chart-title">{editId ? "✏️ Edit Appointment" : "➕ Book New Appointment"}</div>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <div className="af"><label>Patient Name *</label><input className="admin-input" required value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} placeholder="Full name" /></div>
            <div className="af"><label>Phone *</label><input className="admin-input" required value={form.phone}   onChange={(e) => setForm({ ...form, phone: e.target.value })}   placeholder="+91 99901 55907" /></div>
            <div className="af"><label>Email *</label><input className="admin-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="patient@gmail.com" /></div>
            <div className="af"><label>Test Name *</label><input className="admin-input" required value={form.test}    onChange={(e) => setForm({ ...form, test: e.target.value })}    placeholder="e.g. Blood Count" /></div>
            <div className="af">
              <label>Doctor *</label>
              <select className="admin-input" required value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}>
                <option value="">— Select Doctor —</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                ))}
              </select>
            </div>
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

      <div style={{ marginBottom: "12px", color: "#94a3b8", fontSize: "13px" }}>
        Showing {filtered.length} of {appointments.length} appointments
        {filterStatus !== "All" && (
          <button style={{ marginLeft: "10px", background: "none", border: "none", color: "#818cf8", cursor: "pointer", fontSize: "13px", textDecoration: "underline" }} onClick={() => setFilterStatus("All")}>
            Clear filter ×
          </button>
        )}
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>#</th><th>Patient</th><th>Email</th><th>Phone</th><th>Test</th><th>Assign Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="10" style={{ textAlign: "center", color: "#94a3b8", padding: "30px" }}>No appointments found.</td></tr>
            ) : (
              filtered.map((a, i) => (
                <tr key={a.id}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{a.patient}</td>
                  <td style={{ fontSize: "12px", color: a.email ? "#818cf8" : "#475569" }}>{a.email || "—"}</td>
                  <td>{a.phone}</td>
                  <td>{a.test}</td>
                  <td>
                    <select
                      className="admin-input"
                      style={{ padding: "6px 10px", fontSize: "12px", minWidth: "150px" }}
                      value={a.doctor || ""}
                      onChange={(e) => handleDoctorAssign(a.id, e.target.value)}
                    >
                      <option value="">— Assign —</option>
                      {doctors.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                      {/* Keep current value if it doesn't match a doctor in the list */}
                      {a.doctor && !doctors.find(d => d.name === a.doctor) && a.doctor !== "To be assigned" && (
                        <option value={a.doctor}>{a.doctor}</option>
                      )}
                    </select>
                  </td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <select
                      className={`admin-status-select ${statusClass[a.status]}`}
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="apt-actions">
                      {currentRole === "admin" && (
                        <button className="apt-action-btn apt-btn-edit" onClick={() => handleEdit(a)} title="Edit appointment">
                          ✏️ Edit
                        </button>
                      )}
                      <button
                        className={`apt-action-btn apt-btn-patient ${(!a.email || !a.doctor || a.doctor === "To be assigned") ? "apt-btn-disabled" : ""}`}
                        onClick={() => handleSendConfirmation(a)}
                        title={!a.email ? "Add email first" : (!a.doctor || a.doctor === "To be assigned") ? "Assign doctor first" : "Send patient confirmation"}
                      >
                        📧 Patient
                      </button>
                      <button
                        className={`apt-action-btn apt-btn-doctor ${(!a.doctor || a.doctor === "To be assigned") ? "apt-btn-disabled" : ""}`}
                        onClick={() => handleSendDoctorEmail(a)}
                        title={!a.doctor || a.doctor === "To be assigned" ? "Assign a doctor first" : "Email details to doctor"}
                      >
                        📧 Doctor
                      </button>
                      {currentRole === "admin" && (
                        <button className="apt-action-btn apt-btn-delete" onClick={() => handleDelete(a.id)} title="Delete appointment">
                          🗑️ Delete
                        </button>
                      )}
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
        .af label { font-size: 12px; font-weight: 600; color: #c8d6e5; text-transform: uppercase; letter-spacing: 0.7px; }
        .apt-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          min-width: 180px;
        }
        .apt-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .apt-btn-edit {
          background: rgba(90,138,26,0.12);
          color: #E7F1A8;
          border-color: rgba(90,138,26,0.3);
        }
        .apt-btn-edit:hover { background: rgba(90,138,26,0.25); }
        .apt-btn-patient {
          background: rgba(248,113,84,0.12);
          color: #fca5a5;
          border-color: rgba(248,113,84,0.25);
        }
        .apt-btn-patient:hover { background: rgba(248,113,84,0.25); }
        .apt-btn-doctor {
          background: rgba(59,130,246,0.12);
          color: #93c5fd;
          border-color: rgba(59,130,246,0.25);
        }
        .apt-btn-doctor:hover { background: rgba(59,130,246,0.25); }
        .apt-btn-delete {
          background: rgba(220,38,38,0.1);
          color: #fca5a5;
          border-color: rgba(220,38,38,0.2);
        }
        .apt-btn-delete:hover { background: rgba(220,38,38,0.22); }
        .apt-btn-disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          form[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          .apt-actions { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Appointments;
