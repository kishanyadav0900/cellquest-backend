import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const statusClass = { "Completed": "badge-success", "In Progress": "badge-warning", "Pending": "badge-info" };

function Dashboard() {
  const [statsData, setStatsData] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    todayBookings: 0,
    pendingReports: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.dashboard.getStats();
        setStatsData(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
      try {
        const apts = await api.appointments.getAll();
        // Show the 10 most recent appointments
        setRecentAppointments(apts.slice(-10).reverse());
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Total Doctors",       value: statsData.doctors,        icon: "👨‍⚕️", colorClass: "blue"   },
    { label: "Total Patients",      value: statsData.patients,       icon: "🧑‍🤝‍🧑", colorClass: "green"  },
    { label: "Appointments Today",  value: statsData.todayBookings,  icon: "📅", colorClass: "purple" },
    { label: "Pending Reports",     value: statsData.pendingReports, icon: "📋", colorClass: "orange" },
  ];

  return (
    <div>
      <h1 className="admin-page-title">📊 Dashboard</h1>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.colorClass}`}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments Table */}
      <div className="admin-card">
        <div className="admin-chart-title">📋 Recent Appointments</div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Test</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: "center", color: "#475569", padding: "30px" }}>No appointments yet.</td></tr>
              ) : (
                recentAppointments.map((apt, i) => (
                  <tr key={apt.id}>
                    <td style={{ color: "#475569" }}>{i + 1}</td>
                    <td>{apt.patient}</td>
                    <td>{apt.test}</td>
                    <td>{apt.doctor || "—"}</td>
                    <td style={{ color: "#64748b" }}>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td>
                      <span className={`admin-badge ${statusClass[apt.status] || ""}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
