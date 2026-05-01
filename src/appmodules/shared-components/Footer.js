import React from "react";

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div
        className="container-fluid footer position-relative bg-dark text-white-50 py-3 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="row justify-content-center text-center pt-3 pb-1">
            <div className="col-lg-8">
              <a href="index.html" className="navbar-brand d-inline-block mb-3">
                <img src="/cellquest-logo.png" alt="cellquestindia Logo" style={{ height: "60px", objectFit: "contain", borderRadius: "8px" }} />
              </a>

              <p className="fs-5 mb-4">
                cellquestindia is a trusted and advanced diagnostic laboratory located in Gurgaon, Haryana. We offer a wide range of pathology, microbiology, and biochemistry tests with a focus on absolute accuracy and patient care.
              </p>

              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 gap-md-4 mb-4">
                  <p className="mb-0">
                    <i className="fa fa-map-marker-alt me-2 text-primary"></i>Kirti Nagar, Sec 15 Part 1, Gurgaon
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-phone-alt me-2 text-primary"></i><a href="tel:+918059565582" className="text-white-50 text-decoration-none">+91 805 956 5582</a>
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-envelope me-2 text-primary"></i><a href="mailto:cellquestindia@gmail.com" className="text-white-50 text-decoration-none">cellquestindia@gmail.com</a>
                  </p>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <a className="btn btn-lg-square btn-primary mx-2" href="https://twitter.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-lg-square btn-primary mx-2" href="https://facebook.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-lg-square btn-primary mx-2" href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="btn btn-lg-square btn-primary mx-2" href="https://instagram.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
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