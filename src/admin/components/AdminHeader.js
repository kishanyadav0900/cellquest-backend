// src/admin/components/AdminHeader.js
import React, { useState, useEffect } from "react";
import "./header.css";

function AdminHeader({ toggleSidebar }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-header">
      <div className="header-left">
        <button
          className="hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="admin-brand">
          <span className="brand-icon">🧪</span>
          <span className="brand-name">Cell Quest Admin</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-clock">
          🕐{" "}
          {time.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
        <div className="header-admin-info">
          <span className="admin-avatar">A</span>
          <span className="admin-name">Admin</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;
