function QualityScope() {
  return (
    <>
      {/* Quality Scope Section */}
      <div className="container-fluid py-5" style={{ background: "linear-gradient(135deg, #3d5e10 0%, #5a8a1a 40%, #6a9a2a 100%)" }}>
        <div className="container">
          <div className="row g-5">

            {/* Quality Scope */}
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="mb-4">
                <span className="px-4 py-2 rounded-pill text-white fw-bold" style={{ background: "#F87154", fontSize: "1.1rem" }}>
                  Quality Scope
                </span>
              </div>

              <ul className="list-unstyled mt-4">
                {[
                  "ISO Certified Facility",
                  "A Team of Qualified Doctors to Ensure Quality Reliable Report",
                  "Wide Range of In-house Test Menu Ensures Faster TAT",
                  "Fully Automated Instruments With Bilateral Inter Facing Eliminates Human Error",
                  "Lab Infrastructure Can Easily Manage High Volume Samples",
                  "Internal Quality Control Process According to CLIA/NABL Guidelines (Controls Process every 8 hours / Periodic Calibration of Equipments)",
                  "External Quality Assurance (EQAS by Metropolis, Randox)",
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-start gap-3 mb-3">
                    <span className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "10px", height: "10px", background: "#F87154", marginTop: "8px" }}></span>
                    <span className="text-white" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer First Approach */}
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="mb-4">
                <span className="px-4 py-2 rounded-pill text-white fw-bold" style={{ background: "#F87154", fontSize: "1.1rem" }}>
                  Customer First Approach
                </span>
              </div>

              <ul className="list-unstyled mt-4">
                {[
                  { text: "Efficient Customer Support", bold: "Timing: 08:00 AM TO 08:00 PM" },
                  { text: "Enabled with IVR & Email / WhatsApp Support Help-line No:", bold: "+91 99901 55907" },
                  { text: "Customised Package Option As Per Customer Requirement", bold: null },
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-start gap-3 mb-3">
                    <span className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "10px", height: "10px", background: "#F87154", marginTop: "8px" }}></span>
                    <span className="text-white" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                      {item.text} {item.bold && <strong style={{ color: "#E7F1A8" }}>({item.bold})</strong>}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Query Management */}
              <div className="mt-4 p-4 rounded-3" style={{ background: "rgba(255,255,255,0.1)", borderLeft: "3px solid #F87154" }}>
                <h5 className="text-white mb-3" style={{ fontWeight: 700 }}>
                  <i className="bi bi-chat-dots me-2" style={{ color: "#F87154" }}></i>Query Management
                </h5>
                <ul className="list-unstyled mb-0">
                  {[
                    "Highly Qualified Team Under Guidance of Doctor Helps to Understand & Resolve the Test Query",
                    "Substantiated With Day Controls & Calibration Data (Only Applicable For Test Runs On Automated Instruments)",
                    "Based On Logical Decision Can Proceed For Re-Run Or Fresh Sample Processing",
                    "May Proceed For ILC (Inter Lab Comparison) For The Same Sample Or Fresh Sample",
                  ].map((item, i) => (
                    <li key={i} className="d-flex align-items-start gap-2 mb-2">
                      <i className="bi bi-check2-circle flex-shrink-0" style={{ color: "#F87154", marginTop: "3px" }}></i>
                      <span className="text-white" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Robust LIS */}
              <div className="mt-4 p-4 rounded-3" style={{ background: "rgba(255,255,255,0.1)", borderLeft: "3px solid #F87154" }}>
                <h5 className="text-white mb-3" style={{ fontWeight: 700 }}>
                  <i className="bi bi-pc-display me-2" style={{ color: "#F87154" }}></i>Robust LIS
                </h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-start gap-2 mb-2">
                    <i className="bi bi-check2-circle flex-shrink-0" style={{ color: "#F87154", marginTop: "3px" }}></i>
                    <span className="text-white" style={{ fontSize: "0.9rem" }}>Easy To Use LIS Tech (Software)</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-check2-circle flex-shrink-0" style={{ color: "#F87154", marginTop: "3px" }}></i>
                    <span className="text-white" style={{ fontSize: "0.9rem" }}>Ledger & Online Payment</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Quality Scope End */}

      {/* Trusted Care Banner */}
      <div className="container-fluid py-4 text-center" style={{ background: "linear-gradient(135deg, #F87154, #fa8a6a)" }}>
        <h3 className="text-white mb-0 wow fadeIn" data-wow-delay="0.1s" style={{ fontWeight: 700, letterSpacing: "1px" }}>
          Trusted Care. Accurate Results.
        </h3>
      </div>
    </>
  );
}

export default QualityScope;
