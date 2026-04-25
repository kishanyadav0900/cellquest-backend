import CountUp from "react-countup";

function AboutContent() {
  return (
    <>
      {/* About CellQuest Section */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">

            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="display-5 mb-4" style={{ color: "#5a8a1a", fontWeight: 800 }}>
                About CellQuest
              </h1>

              <p className="mb-3" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                CellQuest is a next-generation, technology-driven diagnostic centre where world-class automation, advanced analytical platforms, and expert clinical oversight come together to deliver exceptional accuracy and reliability.
              </p>

              <p className="mb-3" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                Powered by fully automated systems, stringent quality protocols, and a highly skilled clinical team, CellQuest ensures precision-driven and timely diagnostic insights you can trust.
              </p>

              <p className="mb-4" style={{ fontSize: "1.05rem", lineHeight: 1.8, fontStyle: "italic", color: "#555" }}>
                Our unwavering commitment to patient-centric excellence, scientific integrity, and operational efficiency enables us to provide superior care and dependable outcomes for every patient and healthcare partner.
              </p>
            </div>

            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="row g-3">
                <div className="col-6">
                  <img className="img-fluid rounded" src="/about-1.jpg" alt="Lab Equipment" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
                </div>
                <div className="col-6">
                  <img className="img-fluid rounded" src="/about-2.jpg" alt="Microscope Analysis" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
                </div>
                <div className="col-6">
                  <img className="img-fluid rounded" src="/about-3.jpg" alt="Scientist at Work" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
                </div>
                <div className="col-6">
                  <div className="bg-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center rounded" style={{ minHeight: "160px" }}>
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

          </div>
        </div>
      </div>
      {/* About CellQuest End */}

      {/* Philosophy & Quality Commitment Section */}
      <div className="container-fluid py-5" style={{ background: "linear-gradient(135deg, #3d5e10, #5a8a1a)" }}>
        <div className="container">
          <div className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            <h2 className="display-6 text-white mb-2" style={{ fontWeight: 700 }}>
              Our Philosophy & Quality Commitment
            </h2>
            <div style={{ width: "80px", height: "3px", background: "#F87154", margin: "0 auto", borderRadius: "3px" }}></div>
          </div>

          <div className="row g-4">
            {[
              { icon: "bi-shield-check", text: "NABL-aligned quality governance delivering uncompromising accuracy and compliance" },
              { icon: "bi-cpu", text: "Next-generation, fully automated analyzers ensuring precision at scale" },
              { icon: "bi-globe", text: "A global-grade diagnostic ecosystem powered by advanced technologies and international benchmarks" },
              { icon: "bi-people-fill", text: "A distinguished team of clinical experts with deep domain expertise" },
              { icon: "bi-clock-history", text: "Accelerated turnaround times through optimized, high-efficiency workflows" },
              { icon: "bi-droplet-half", text: "Stringent, protocol-driven sample handling for maximum safety and integrity" },
              { icon: "bi-house-door", text: "Seamless home sample collection designed for convenience, comfort, and reliability" },
            ].map((item, idx) => (
              <div key={idx} className="col-lg-6 wow fadeInUp" data-wow-delay={`${0.1 + idx * 0.1}s`}>
                <div className="d-flex align-items-start gap-3 p-3 rounded" style={{ background: "rgba(255,255,255,0.1)", borderLeft: "3px solid #F87154" }}>
                  <i className={`bi ${item.icon} fs-3 text-white`} style={{ minWidth: "30px" }}></i>
                  <p className="text-white mb-0" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Philosophy End */}
    </>
  );
}

export default AboutContent;
