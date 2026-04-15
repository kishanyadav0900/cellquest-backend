import CountUp from "react-countup";

function AboutContent() {
  return (
    <>
      {/* About Content Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">

            <div className="col-lg-6">
              <div className="row g-0">
                <div className="col-6">
                  <img className="img-fluid" src="/about-1.jpg" alt="Lab Specialist" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                </div>

                <div className="col-6">
                  <img className="img-fluid" src="/about-2.jpg" alt="Microscope Work" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                </div>

                <div className="col-6">
                  <img className="img-fluid" src="/about-3.jpg" alt="Scientist Analyzing" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                </div>

                <div className="col-6">
                  <div className="bg-primary w-100 h-100 mt-n5 ms-n5 d-flex flex-column align-items-center justify-content-center">
                    <div className="icon-box-light">
                      <i className="bi bi-award text-dark"></i>
                    </div>

                    <h1 className="display-1 text-white mb-0">
                      <CountUp end={25} duration={7} />
                    </h1>

                    <small className="fs-5 text-white">Years Experience</small>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-6">
              <h1 className="display-6 mb-4">
                Trusted Lab Experts and Latest Lab Technologies
              </h1>

              <p className="mb-4">
                At Cell Quest India, we are committed to providing top-quality healthcare diagnostics. With the latest technology and strict quality control measures, we ensure that every test result is completely accurate. Our dedicated team of doctors and lab technicians work tirelessly to deliver reports on time, helping you and your doctors make the best healthcare decisions.
              </p>

              <div className="row g-4 g-sm-5 justify-content-center">

                <div className="col-sm-6">
                  <div className="about-fact btn-square flex-column rounded-circle bg-primary ms-sm-auto">
                    <p className="text-white mb-0">Awards Winning</p>

                    <h1 className="text-white mb-0">
                      <CountUp end={9999} duration={7} />
                    </h1>
                  </div>
                </div>

                <div className="col-sm-6 text-start">
                  <div className="about-fact btn-square flex-column rounded-circle bg-secondary me-sm-auto">
                    <p className="text-white mb-0">Complete Cases</p>

                    <h1 className="text-white mb-0">
                      <CountUp end={9999} duration={7} />
                    </h1>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="about-fact mt-n130 btn-square flex-column rounded-circle bg-dark mx-sm-auto">
                    <p className="text-white mb-0">Happy Clients</p>

                    <h1 className="text-white mb-0">
                      <CountUp end={9999} duration={7} />
                    </h1>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      {/* About Content End */}
    </>
  );
}

export default AboutContent;