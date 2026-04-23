// src/admin/components/AdminSidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaProcedures,
  FaCalendarCheck,
  FaCog,
  FaRupeeSign,
} from "react-icons/fa";
import "./sidebar.css";

const navLinks = [
  { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt />, exact: true },
  { to: "/admin/doctors", label: "Doctors", icon: <FaUserMd /> },
  { to: "/admin/patients", label: "Patients", icon: <FaProcedures /> },
  { to: "/admin/appointments", label: "Appointments", icon: <FaCalendarCheck /> },
  { to: "/admin/test-prices", label: "Test Prices", icon: <FaRupeeSign /> },
  { to: "/admin/settings", label: "Settings", icon: <FaCog /> },
];

function AdminSidebar({ active, closeSidebar }) {
  const location = useLocation();

  const isActive = (link) => {
    if (link.exact) return location.pathname === link.to;
    return location.pathname.startsWith(link.to);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {active && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}
      <div className={`admin-sidebar ${active ? "active" : ""}`}>
        <div className="sidebar-brand-section">
          <span className="sidebar-brand-icon">🧪</span>
          <span className="sidebar-brand-text">Cell Quest</span>
        </div>

        <nav className="sidebar-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`sidebar-link ${isActive(link) ? "sidebar-link-active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">{link.icon}</span>
              <span className="sidebar-label">{link.label}</span>
              {isActive(link) && <span className="sidebar-active-dot" />}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>Cell Quest India Admin</span>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
