function Team() {
    return (
        <>
            {/* Team Start */}
            <div className="container-fluid container-team py-5">
                <div className="container pb-5">

                    <div className="row g-5 align-items-center mb-5">

                        <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
                            <img className="img-fluid w-100" src="/profile-placeholder.png" alt="Profile Placeholder" style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }} />
                        </div>

                        <div className="col-md-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="display-6 mb-3">Dr. Rakesh Kumar</h1>
                            <p className="mb-1 fw-bold fs-5 text-dark">Sr. Consultant Biochemistry</p>
                            <p className="mb-4 text-muted">MSc Biochemistry, PhD in Biochemistry | 15+ Years Experience</p>

                            <h3 className="mb-3">Biography</h3>

                            <p className="mb-4">
                                Hi, I'm <strong>Dr. Rakesh Kumar</strong>. I am presently working as a Sr. Consultant Biochemistry at Drxlabs. With more than 15 years of hands-on experience, my core expertise lies in <strong>Quality Assurance</strong>, comprehensive <strong>Test Performing & Reporting</strong>, and <strong>Lab Operations</strong>.
                            </p>

                            <h5 className="mb-3">Areas of Expertise</h5>
                            <ul className="mb-4 text-muted">
                                <li className="mb-2">Knowledge of Biochemistry assay validation, method validation, QC performance, calibration and test performing and reporting.</li>
                                <li className="mb-2">Knowledge of ELISA kit validation, QC performance, calibration and test performing and reporting.</li>
                                <li className="mb-2">Knowledge of IFA examination & microscopy and reporting for Anti Nuclear Antibody - (ANA-IFA).</li>
                                <li className="mb-2">Knowledge of Flowcytometry examination and reporting.</li>
                                <li className="mb-2">Knowledge of HPLC, GCLC, TLC performing and report validation.</li>
                                <li className="mb-2">Knowledge of Maternal Marker Risk assessment, assay validation and reporting.</li>
                                <li className="mb-2">Knowledge of QA department all activities as per ISO 15189 - 2012 & 2022 (NABL and CAP) all types of instrument validation, IQC, EQAS, LJ, in-house mean, SD, CV%, CAPA, ILC read, document prepare, validate and maintain record.</li>
                                <li className="mb-2">Knowledge of Plant phytochemical extraction, result evaluation and calculations.</li>
                                <li className="mb-2">Knowledge of Plant tissue culture and Antimicrobial activity with plant extract.</li>
                            </ul>

                        </div>

                    </div>
                    {/* Official Partners */}
                    <div className="mt-5 pt-4 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="text-center mb-4">
                            <span className="px-4 py-2 rounded-pill text-white fw-bold" style={{ background: "linear-gradient(135deg, #F87154, #fa8a6a)", fontSize: "1rem" }}>
                                cellquestindia Official Partners
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
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
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
                                                    height: "90px",
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
            {/* Team End */}
        </>
    );
}

export default Team;