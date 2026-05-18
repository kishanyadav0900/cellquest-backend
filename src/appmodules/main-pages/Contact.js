import { Link } from "react-router-dom";
import Nav from "../shared-components/Nav";
import Footer from "../shared-components/Footer";

function Contact() {
  return (
    <>
      <header>
        <Nav />

        {/* Page Header Start */}
        <div className="container-fluid page-header py-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container text-center py-5 mt-4">
            <h1 className="display-2 text-white mb-3 animated slideInDown">
              Contact
            </h1>

            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>

                <li className="breadcrumb-item">
                  <span>Pages</span>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
      </header>

      <main>
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">

            <div
              className="text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: "600px" }}
            >
              <h1 className="display-6 mb-3">
                Have Any Query? Feel Free To Contact Us
              </h1>

              <p className="mb-5">
                Need to book a home sample collection, or have questions about a specific pathology test? Our care team is ready to assist you.
              </p>
            </div>

            <div className="row contact-info position-relative g-0 mb-5">

              <div className="col-lg-6">
                <a
                  href="tel:+919990155907"
                  className="d-flex justify-content-lg-center bg-primary p-4 text-decoration-none"
                >
                  <div className="icon-box-light flex-shrink-0">
                    <i className="bi bi-phone text-dark"></i>
                  </div>

                  <div className="ms-3">
                    <h5 className="text-white">Call Us</h5>
                    <h2 className="text-white mb-0">+91 99901 55907</h2>
                  </div>
                </a>
              </div>

              <div className="col-lg-6">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=cellquestindia@gmail.com&su=Inquiry%20from%20Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex justify-content-lg-center bg-primary p-4 text-decoration-none"
                >
                  <div className="icon-box-light flex-shrink-0">
                    <i className="bi bi-envelope text-dark"></i>
                  </div>

                  <div className="ms-3">
                    <h5 className="text-white">Mail Us</h5>
                    <h2 className="text-white mb-0">cellquestindia@gmail.com</h2>
                  </div>
                </a>
              </div>
            </div>

            <div className="row g-5">

              {/* Contact Form */}
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">

                <form>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: "200px" }}
                        ></textarea>

                        <label htmlFor="message">Message</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary py-3 px-5"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>

                  </div>
                </form>
              </div>

              {/* Map */}
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                <iframe
                  className="w-100 h-100"
                  title="cellquestindia location map"
                  src="https://www.google.com/maps?q=Cell+Quest+India,+Kirti+Nagar,+Gurgaon&output=embed"
                  frameBorder="0"
                  style={{ minHeight: "300px", border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>

            </div>
          </div>
        </div>
        {/* Contact End */}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Contact;