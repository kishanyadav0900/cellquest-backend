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

  const partners = ["BIO-RAD", "BD", "AtheneDx", "AGD", "TRIVITRON", "itDose", "maccura", "DiaSys", "zybio"];

  return (
    <>
      {/* Service Spectrum Start */}
      <div className="container-fluid py-5" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            <h6 style={{ color: "#e65100", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.9rem" }}>
              What We Offer
            </h6>
            <h1 className="display-5 mb-3" style={{ fontWeight: 800, color: "#1b5e20" }}>
              Our Service Spectrum
            </h1>
            <div style={{ width: "80px", height: "3px", background: "#e65100", margin: "0 auto", borderRadius: "3px" }}></div>
          </div>

          <div className="row g-4">
            {services.map((svc, idx) => (
              <div key={idx} className="col-lg-6 wow fadeInUp" data-wow-delay={`${0.1 + (idx % 4) * 0.1}s`}>
                <div className="d-flex align-items-start gap-3 p-4 rounded-3 h-100" style={{
                  background: idx % 2 === 0 ? "#f1f8e9" : "#fff3e0",
                  border: "1px solid",
                  borderColor: idx % 2 === 0 ? "#c8e6c9" : "#ffe0b2",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}>
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle" style={{
                    width: "50px",
                    height: "50px",
                    background: idx % 2 === 0 ? "#2e7d32" : "#e65100",
                    color: "#fff",
                    fontSize: "1.3rem"
                  }}>
                    <i className={`bi ${svc.icon}`}></i>
                  </div>
                  <div>
                    <h5 className="mb-2" style={{ fontWeight: 700, color: "#1b5e20" }}>{svc.title}</h5>
                    <p className="mb-0" style={{ color: "#555", lineHeight: 1.6, fontSize: "0.95rem" }}>{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Official Partners */}
          <div className="mt-5 pt-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="text-center mb-4">
              <span className="px-4 py-2 rounded-pill text-white fw-bold" style={{ background: "linear-gradient(135deg, #e65100, #f57c00)", fontSize: "1rem" }}>
                CellQuest Official Partners
              </span>
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-4">
              {partners.map((name, i) => (
                <div key={i} className="px-4 py-2 rounded-3 text-center" style={{
                  background: "#f5f5f5",
                  border: "1px solid #e0e0e0",
                  fontWeight: 700,
                  color: "#333",
                  fontSize: "0.85rem",
                  letterSpacing: "0.5px",
                  minWidth: "100px"
                }}>
                  {name}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      {/* Service Spectrum End */}
    </>
  );
}

export default Features2;