import React, { useState } from "react";

function AppoinmentContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <>
      {/* Appoinment Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">

            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="display-6 mb-4">
                We Ensure You Will Always Get The Best Result
              </h1>

              <p className="mb-4">
                Booking a test with Cell Quest India is simple and hassle-free. Fill out the form below with your details, and our care team will get back to you immediately to confirm your slot. Whether it is a routine blood test or a complex biochemistry profile, we ensure a smooth, painless, and highly professional experience from sample collection to report delivery.
              </p>

              <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.3s">
                <div className="icon-box-primary">
                  <i className="bi bi-geo-alt text-dark fs-1"></i>
                </div>
                <div className="ms-3">
                  <h5>Office Address</h5>
                  <span>Ist and 2nd floor, plot no -5, Kirti Nagar, Sec 15 Part 1, Near Bindle Colour lab, Gurgaon Haryana 122001</span>
                </div>
              </div>

              <hr />

              <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.4s">
                <div className="icon-box-primary">
                  <i className="bi bi-clock text-dark fs-1"></i>
                </div>
                <div className="ms-3">
                  <h5>Office Time</h5>
                  <span>Mon-Sat 08:00 AM - 10:00 PM, Sun Closed</span>
                </div>
              </div>
            </div>


            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <h2 className="mb-4">Online Appoinment</h2>

              {submitted ? (
                <div className="alert alert-success mt-4 p-4 text-center rounded wow fadeIn" role="alert" style={{ borderLeft: '5px solid #28a745' }}>
                  <h4 className="alert-heading text-success mb-3"><i className="bi bi-check-circle-fill me-2"></i> Form Submitted!</h4>
                  <p className="mb-0 fs-5 text-dark">Thank you for filling out your appointment form our team will review your details and update you shortly</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          required
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="mail"
                          placeholder="Your Email"
                          required
                        />
                        <label htmlFor="mail">Your Email</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          placeholder="Your Mobile"
                          required
                        />
                        <label htmlFor="mobile">Your Mobile</label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <select className="form-select" id="service">
                          <option>Pathology Testing</option>
                          <option>Microbiology Tests</option>
                          <option>Biochemistry Tests</option>
                          <option>Histopatology Tests</option>
                        </select>
                        <label htmlFor="service">Choose A Service</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: "130px" }}
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>

                    <div className="col-12 text-center">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Submit Now
                      </button>
                    </div>

                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
      {/* Appoinment End */}
    </>
  );
}

export default AppoinmentContent;