// src/admin/components/AdminLayout.js
import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "../../admin.css";

function AdminLayout() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => setIsSidebarActive((prev) => !prev);
  const closeSidebar = () => setIsSidebarActive(false);

  return (
    <div className="admin-app-container">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="admin-body">
        <AdminSidebar active={isSidebarActive} closeSidebar={closeSidebar} />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
