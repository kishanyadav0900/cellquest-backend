import { useEffect } from "react";
import $ from "jquery";
import WOW from "wowjs";
import { NavLink } from "react-router-dom";

function Nav() {

    useEffect(() => {
        window.$ = $;
        window.jQuery = $;

        // Spinner
        const spinner = () => {
            setTimeout(() => {
                if ($("#spinner").length > 0) {
                    $("#spinner").removeClass("show");
                }
            }, 1);
        };

        spinner();

        // WOW animation
        new WOW.WOW().init();

    }, []);

    const activeLink = ({ isActive }) =>
        isActive ? "nav-item nav-link active" : "nav-item nav-link";

    return (
        <>
            {/* Spinner Start */}
            <div
                id="spinner"
                className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            >
                <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                ></div>
            </div>
            {/* Spinner End */}



            {/* Navbar Start */}
            <div className="container-fluid sticky-top p-0 glass-nav shadow-sm">
                
                {/* Main Nav Row */}
                <div className="container-fluid px-0 px-lg-3">
                    <nav className="navbar navbar-expand-lg navbar-light py-2 px-3">

                        <NavLink to="/" className="navbar-brand me-4">
                            <img src="/cellquest-logo.png" alt="cellquestindia Logo" style={{ height: "55px", objectFit: "contain" }} />
                        </NavLink>

                        <button
                            type="button"
                            className="navbar-toggler me-0"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarCollapse">

                            <div className="navbar-nav mx-auto text-center">
                                <NavLink to="/" className={activeLink}>
                                    Home
                                </NavLink>
                                <NavLink to="/about" className={activeLink}>
                                    About
                                </NavLink>
                                <NavLink to="/service" className={activeLink}>
                                    Services
                                </NavLink>

                                <div className="nav-item dropdown">
                                    <button
                                        type="button"
                                        className="nav-link dropdown-toggle btn btn-link"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Pages
                                    </button>
                                    <div className="dropdown-menu border-0 shadow-sm m-0 text-center text-lg-start">
                                        <NavLink to="/feature" className="dropdown-item">Features</NavLink>
                                        <NavLink to="/team" className="dropdown-item">Our Team</NavLink>
                                        <NavLink to="/appoinment" className="dropdown-item">Appointment</NavLink>
                                    </div>
                                </div>

                                <NavLink to="/contact" className={activeLink}>
                                    Contact
                                </NavLink>
                            </div>

                            {/* Contact Info on Right */}
                            <div className="ms-auto d-none d-xl-flex flex-column justify-content-center text-start" style={{ fontSize: "0.85rem", color: "#444", lineHeight: "1.4" }}>
                                <div><i className="fa fa-envelope text-primary me-2"></i><a href="mailto:cellquestindia@gmail.com" className="text-decoration-none text-dark fw-medium">cellquestindia@gmail.com</a></div>
                                <div><i className="fa fa-phone-alt text-primary me-2"></i><a href="tel:+918059565582" className="text-decoration-none text-dark fw-medium">+91 805 956 5582</a></div>
                                <div><i className="fa fa-clock text-primary me-2"></i><span className="fw-medium text-dark">10AM - 7PM</span></div>
                            </div>

                        </div>
                    </nav>
                </div>
            </div>
            {/* Navbar End */}
        </>
    );
}

export default Nav;