import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div
        className="container-fluid footer position-relative bg-dark text-white-50 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="row g-5 py-5">
            <div className="col-lg-6 pe-lg-5">
              <a href="index.html" className="navbar-brand d-inline-block mb-3">
                <img src="/cellquest-logo.png" alt="Cell Quest India Logo" style={{ height: "90px", objectFit: "contain", transform: "scale(2)", transformOrigin: "left center" }} />
              </a>

              <p className="fs-5 mb-4">
                Cell Quest India is a trusted and advanced diagnostic laboratory located in Gurgaon, Haryana. We offer a wide range of pathology, microbiology, and biochemistry tests with a focus on absolute accuracy and patient care.
              </p>

              <p>
                <i className="fa fa-map-marker-alt me-2"></i>Ist and 2nd floor, plot no -5, Kirti Nagar, Sec 15 Part 1, Near Bindle Colour lab, Gurgaon Haryana 122001
              </p>

              <p>
                <i className="fa fa-phone-alt me-2"></i>+91 805 956 5582
              </p>

              <p>
                <i className="fa fa-envelope me-2"></i>cellquestindia@gmail.com
              </p>

              <div className="d-flex mt-4">
                <a className="btn btn-lg-square btn-primary me-2" href="https://twitter.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-lg-square btn-primary me-2" href="https://facebook.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-lg-square btn-primary me-2" href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="btn btn-lg-square btn-primary me-2" href="https://instagram.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-6 ps-lg-5">
              <div className="row g-5">
                <div className="col-sm-6">
                  <h4 className="text-light mb-4">Quick Links</h4>
                  <Link className="btn btn-link" to="/about">
                    About Us
                  </Link>
                  <Link className="btn btn-link" to="/contact">
                    Contact Us
                  </Link>
                  <Link className="btn btn-link" to="/service">
                    Our Services
                  </Link>
                  <Link className="btn btn-link" to="/contact">
                    Terms &amp; Condition
                  </Link>
                  <Link className="btn btn-link" to="/contact">
                    Support
                  </Link>
                </div>

                <div className="col-sm-6">
                  <h4 className="text-light mb-4">Popular Links</h4>
                  <Link className="btn btn-link" to="/about">
                    About Us
                  </Link>
                  <Link className="btn btn-link" to="/contact">
                    Contact Us
                  </Link>
                  <Link className="btn btn-link" to="/service">
                    Our Services
                  </Link>
                  <Link className="btn btn-link" to="/contact">
                    Terms &amp; Condition
                  </Link>
                  <Link className="btn btn-link" to="/contact">
                    Support
                  </Link>
                </div>

                <div className="col-sm-12">
                  <h4 className="text-light mb-4">Newsletter</h4>

                  <div className="w-100">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-0 py-3 px-4"
                        style={{ background: "rgba(255, 255, 255, .1)" }}
                        placeholder="Your Email Address"
                      />
                      <button className="btn btn-primary px-4">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}

export default Footer;