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

            {/* Topbar Start */}
            <div className="container-fluid py-2 d-none d-lg-flex">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div>
                            <small className="me-3">
                                <i className="fa fa-map-marker-alt me-2"></i>
                                Ist and 2nd floor, plot no -5, Kirti Nagar, Sec 15 Part 1,
                                Near Bindle Colour lab, Gurgaon Haryana 122001
                            </small>

                            <small className="me-3">
                                <i className="fa fa-clock me-2"></i>
                                Mon-Sat 08am-10pm, Sun Closed
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}

            {/* Brand Start */}
            <div className="container-fluid bg-primary text-white pt-4 pb-5 d-none d-lg-flex">
                <div className="container pb-2">
                    <div className="d-flex align-items-center justify-content-between">

                        <div className="d-flex">
                            <i className="bi bi-telephone-inbound fs-2"></i>
                            <div className="ms-3">
                                <h5 className="text-white mb-0">Call Now</h5>
                                <span>+91 805 956 5582</span>
                            </div>
                        </div>

                        <NavLink to="/" className="navbar-brand">
                            <img src="/cellquest-logo.png" alt="Cell Quest India Logo" style={{ height: "80px", objectFit: "contain", transform: "scale(3)" }} />
                        </NavLink>

                        <div className="d-flex">
                            <i className="bi bi-envelope fs-2"></i>
                            <div className="ms-3">
                                <h5 className="text-white mb-0">Mail Now</h5>
                                <span>cellquestindia@gmail.com</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Brand End */}

            {/* Navbar Start */}
            <div className="container-fluid sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-white py-lg-0 px-lg-3">

                        <NavLink to="/" className="navbar-brand d-lg-none">
                            <img src="/cellquest-logo.png" alt="Cell Quest India Logo" style={{ height: "65px", objectFit: "contain", transform: "scale(2.5)", transformOrigin: "left center" }} />
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

                            <div className="navbar-nav">

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

                                    <div className="dropdown-menu bg-light m-0">

                                        <NavLink to="/feature" className="dropdown-item">
                                            Features
                                        </NavLink>

                                        <NavLink to="/team" className="dropdown-item">
                                            Our Team
                                        </NavLink>

                                        {/* <NavLink to="/testimonial" className="dropdown-item">
                                            Testimonial
                                        </NavLink> */}

                                        <NavLink to="/appoinment" className="dropdown-item">
                                            Appointment
                                        </NavLink>

                                        {/* <NavLink to="/notfound" className="dropdown-item">
                                            404 Page
                                        </NavLink> */}

                                    </div>
                                </div>

                                <NavLink to="/contact" className={activeLink}>
                                    Contact
                                </NavLink>

                            </div>

                            <div className="ms-auto d-none d-lg-flex">

                                <a className="btn btn-sm-square btn-primary ms-2" href="https://facebook.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>

                                <a className="btn btn-sm-square btn-primary ms-2" href="https://twitter.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>

                                <a className="btn btn-sm-square btn-primary ms-2" href="https://linkedin.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>

                                <a className="btn btn-sm-square btn-primary ms-2" href="https://youtube.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-youtube"></i>
                                </a>

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