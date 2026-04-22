import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement, PointElement,
  Title, Tooltip, Legend, ArcElement
);

// ─── Chart data ───
const monthlyBookingsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Appointments",
      data: [42, 55, 70, 65, 80, 90, 78, 95, 88, 102, 97, 115],
      backgroundColor: "rgba(99,102,241,0.7)",
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

const testTypesData = {
  labels: ["Blood Test", "Urine Test", "X-Ray", "MRI", "ECG", "Others"],
  datasets: [
    {
      data: [35, 25, 15, 12, 8, 5],
      backgroundColor: [
        "rgba(99,102,241,0.8)",
        "rgba(16,185,129,0.8)",
        "rgba(245,158,11,0.8)",
        "rgba(239,68,68,0.8)",
        "rgba(139,92,246,0.8)",
        "rgba(100,116,139,0.8)",
      ],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1e293b",
      titleColor: "#e2e8f0",
      bodyColor: "#94a3b8",
      borderColor: "rgba(255,255,255,0.1)",
      borderWidth: 1,
    },
  },
  scales: {
    x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" } },
    y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" } },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: { color: "#94a3b8", padding: 14, font: { size: 13 } },
    },
    tooltip: {
      backgroundColor: "#1e293b",
      titleColor: "#e2e8f0",
      bodyColor: "#94a3b8",
    },
  },
};

// ─── Recent appointments (mock) ───
const recentAppointments = [
  { id: 1, patient: "Rajesh Kumar",   test: "Complete Blood Count",  doctor: "Dr. Sharma",  time: "09:00 AM", status: "Completed" },
  { id: 2, patient: "Priya Singh",    test: "Lipid Profile",          doctor: "Dr. Verma",   time: "10:30 AM", status: "In Progress" },
  { id: 3, patient: "Amit Yadav",     test: "Thyroid Panel",          doctor: "Dr. Mehta",   time: "11:15 AM", status: "Pending" },
  { id: 4, patient: "Sunita Devi",    test: "Urine Routine",          doctor: "Dr. Sharma",  time: "02:00 PM", status: "Completed" },
  { id: 5, patient: "Mohit Aggarwal", test: "HbA1c",                  doctor: "Dr. Verma",   time: "03:30 PM", status: "Pending" },
];

const statusClass = { "Completed": "badge-success", "In Progress": "badge-warning", "Pending": "badge-info" };

function Dashboard() {
  const [statsData, setStatsData] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    todayBookings: 0,
    pendingReports: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.dashboard.getStats();
        setStatsData(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Total Doctors",       value: statsData.doctors,  icon: "👨‍⚕️", colorClass: "blue"   },
    { label: "Total Patients",      value: statsData.patients, icon: "🧑‍🤝‍🧑", colorClass: "green"  },
    { label: "Appointments Today",  value: statsData.todayBookings,  icon: "📅", colorClass: "purple" },
    { label: "Pending Reports",     value: statsData.pendingReports,   icon: "📋", colorClass: "orange" },
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

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "28px" }}>
        <div className="admin-chart-container">
          <div className="admin-chart-title">📈 Monthly Appointments (2024)</div>
          <Bar data={monthlyBookingsData} options={chartOptions} />
        </div>
        <div className="admin-chart-container">
          <div className="admin-chart-title">🔬 Test Distribution</div>
          <Doughnut data={testTypesData} options={doughnutOptions} />
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="admin-card">
        <div className="admin-chart-title">📋 Today's Appointments</div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Test</th>
                <th>Doctor</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td style={{ color: "#475569" }}>{apt.id}</td>
                  <td>{apt.patient}</td>
                  <td>{apt.test}</td>
                  <td>{apt.doctor}</td>
                  <td>{apt.time}</td>
                  <td>
                    <span className={`admin-badge ${statusClass[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
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
