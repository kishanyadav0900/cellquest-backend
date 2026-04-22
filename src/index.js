import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./appmodules/main-pages/home";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

// CSS Libraries
import "./lib/animate/animate.min.css";
import "./lib/owlcarousel/assets/owl.carousel.min.css";
import "./css/style.css";
import About from "./appmodules/main-pages/About";
import Service from "./appmodules/main-pages/Service";
import Feature from "./appmodules/main-pages/Feature";
import OurTeam from "./appmodules/main-pages/OurTeam";
import Appoinment from "./appmodules/main-pages/Appoinment";
import Contact from "./appmodules/main-pages/Contact";

// ── Admin Section ──
import AdminLayout    from "./admin/components/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLogin        from "./admin/pages/Login";
import AdminDashboard    from "./admin/pages/Dashboard";
import AdminDoctors      from "./admin/pages/Doctors";
import AdminPatients     from "./admin/pages/Patients";
import AdminAppointments from "./admin/pages/Appointments";
import AdminSettings     from "./admin/pages/Settings";

function App() {

  useEffect(() => {

    // const loadScript = (src) => {
    //   const script = document.createElement("script");
    //   script.src = src;
    //   script.async = false;
    //   document.body.appendChild(script);
    // };

    // // External JS Libraries
    // loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js");
    // loadScript("/lib/wow/wow.min.js");
    // loadScript("/lib/easing/easing.min.js");
    // loadScript("/lib/waypoints/waypoints.min.js");
    // loadScript("/lib/counterup/counterup.min.js");
    // loadScript("/lib/owlcarousel/owl.carousel.min.js");
    // loadScript("/js/main.js");

    // Google Fonts
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "preconnect";
    link2.href = "https://fonts.gstatic.com";
    link2.crossOrigin = "true";
    document.head.appendChild(link2);

    const link3 = document.createElement("link");
    link3.rel = "stylesheet";
    link3.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Red+Rose:wght@600;700&display=swap";
    document.head.appendChild(link3);

    // Bootstrap Icons
    const bootstrapIcons = document.createElement("link");
    bootstrapIcons.rel = "stylesheet";
    bootstrapIcons.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css";
    document.head.appendChild(bootstrapIcons);

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Site Routes ── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/appoinment" element={<Appoinment />} />
        <Route path="/contact" element={<Contact />} />

        {/* ── Admin Login (public) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Admin Protected Routes (hidden from main site) ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="doctors"      element={<AdminDoctors />} />
          <Route path="patients"     element={<AdminPatients />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="settings"     element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);