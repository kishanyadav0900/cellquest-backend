function Features2() {
  const services = [
    { title: "Haematology", desc: "Comprehensive analysis of blood and blood-forming tissues to aid in the diagnosis, monitoring and management of hematologic disorders.", icon: "bi-droplet-fill" },
    { title: "Clinical Biochemistry", desc: "Accurate measurement of biochemical markers in blood, serum and whole blood plasma and body fluids to evaluate organ function, metabolism and overall health status.", icon: "bi-thermometer-half" },
    { title: "Endocrinology", desc: "Advanced hormonal testing to diagnose and monitor endocrine disorders affecting growth, metabolism, reproduction and hormonal balance.", icon: "bi-activity" },
    { title: "Microbiology", desc: "Identification and analysis of pathogenic microorganisms using culture and molecular techniques to support effective infection management.", icon: "bi-bug" },
    { title: "Serology & Immunology", desc: "Specialized testing to detect antibodies, antigens, and immune responses for the diagnosis of infectious, autoimmune and immune related conditions.", icon: "bi-shield-plus" },
    { title: "Cytopathology & Histopathology", desc: "Microscopic examination of cells and tissues to provide definitive diagnosis of inflammatory, infectious and malignant conditions.", icon: "bi-search" },
    { title: "Clinical Pathology", desc: "Integrated laboratory testing and interpretation of clinical samples to support accurate diagnosis, prognosis and treatment decisions.", icon: "bi-clipboard2-pulse" },
    { title: "Molecular Pathology", desc: "An interdisciplinary field combining molecular biology, genetics, and pathology to diagnose and manage diseases by analyzing DNA, RNA, and proteins in tissues and fluids.", icon: "bi-diagram-3" },
    { title: "Allergy", desc: "Testing for when the immune system overreacts to harmless substances (allergens) like pollen, food, or dander, triggering histamine release.", icon: "bi-flower1" },
    { title: "IFA", desc: "Based on specific, high-affinity binding between an antigen and an antibody. A fluorophore is conjugated to the antibody, allowing detection of the antibody-antigen complex under a microscope.", icon: "bi-lightbulb" },
  ];


  return (
    <>
      {/* Service Spectrum Start */}
      <div className="container-fluid py-5" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            <h6 style={{ color: "#F87154", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.9rem" }}>
              What We Offer
            </h6>
            <h1 className="display-5 mb-3" style={{ fontWeight: 800, color: "#3d5e10" }}>
              Our Service Spectrum
            </h1>
            <div style={{ width: "80px", height: "3px", background: "#F87154", margin: "0 auto", borderRadius: "3px" }}></div>
          </div>

          <div className="row g-4">
            {services.map((svc, idx) => (
              <div key={idx} className="col-lg-6 wow fadeInUp" data-wow-delay={`${0.1 + (idx % 4) * 0.1}s`}>
                <div className="d-flex align-items-start gap-3 p-4 rounded-3 h-100" style={{
                  background: idx % 2 === 0 ? "#E7F1A8" : "#FFFFDD",
                  border: "1px solid",
                  borderColor: idx % 2 === 0 ? "#E7F1A8" : "#fdd",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}>
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle" style={{
                    width: "50px",
                    height: "50px",
                    background: idx % 2 === 0 ? "#5a8a1a" : "#F87154",
                    color: "#fff",
                    fontSize: "1.3rem"
                  }}>
                    <i className={`bi ${svc.icon}`}></i>
                  </div>
                  <div>
                    <h5 className="mb-2" style={{ fontWeight: 700, color: "#3d5e10" }}>{svc.title}</h5>
                    <p className="mb-0" style={{ color: "#555", lineHeight: 1.6, fontSize: "0.95rem" }}>{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Official Partners */}
          {/* Official Partners */}
          <div className="mt-5 pt-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="text-center mb-4">
              <span className="px-4 py-2 rounded-pill text-white fw-bold" style={{ background: "linear-gradient(135deg, #F87154, #fa8a6a)", fontSize: "1rem" }}>
                CellQuest Official Partners
              </span>
            </div>

            {/* Scrolling Logo Marquee */}
            <div style={{ overflow: "hidden", position: "relative", padding: "20px 0" }}>
              {/* Fade edges */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "80px", height: "100%", background: "linear-gradient(to right, #fff, transparent)", zIndex: 2 }}></div>
              <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "100%", background: "linear-gradient(to left, #fff, transparent)", zIndex: 2 }}></div>

              <div style={{
                display: "flex",
                animation: "partnerScroll 20s linear infinite",
                width: "fit-content",
              }}>
                {/* Duplicate logos for seamless loop */}
                {[...Array(2)].map((_, setIdx) => (
                  [1,2,3,4,5,6,7,8,9].map((num) => (
                    <div key={`${setIdx}-${num}`} style={{
                      flex: "0 0 auto",
                      padding: "0 30px",
                      display: "flex",
                      alignItems: "center",
                    }}>
                      <img
                        src={`/partners/${num}.png`}
                        alt={`Partner ${num}`}
                        style={{
                          height: "50px",
                          objectFit: "contain",
                          filter: "grayscale(30%)",
                          opacity: 0.85,
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={e => { e.target.style.filter = "grayscale(0%)"; e.target.style.opacity = "1"; e.target.style.transform = "scale(1.1)"; }}
                        onMouseLeave={e => { e.target.style.filter = "grayscale(30%)"; e.target.style.opacity = "0.85"; e.target.style.transform = "scale(1)"; }}
                      />
                    </div>
                  ))
                ))}
              </div>
            </div>

            <style>{`
              @keyframes partnerScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>

        </div>
      </div>
      {/* Service Spectrum End */}
    </>
  );
}

export default Features2;
