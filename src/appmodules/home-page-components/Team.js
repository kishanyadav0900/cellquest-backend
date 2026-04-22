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

                            <div className="d-flex">
                                <a className="btn btn-lg-square btn-primary me-2" href="https://facebook.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-lg-square btn-primary me-2" href="https://twitter.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-lg-square btn-primary me-2" href="https://linkedin.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a className="btn btn-lg-square btn-primary me-2" href="https://youtube.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            {/* Team End */}
        </>
    );
}

export default Team;