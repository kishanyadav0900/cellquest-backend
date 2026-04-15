import { Link } from "react-router-dom";

function Features2() {
    return (
        <>
            {/* Features 2 Start */}
            <div className="container-fluid feature mt-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-6 pt-lg-5">
                            <div className="bg-white p-5 mt-lg-5">
                                <h1 className="display-6 mb-4 wow fadeIn" data-wow-delay="0.3s">
                                    The Best Medical Test & Laboratory Solution
                                </h1>

                                <p className="mb-4 wow fadeIn" data-wow-delay="0.4s">
                                    Choosing the right pathology lab is an important decision. We combine modern medical technology with years of clinical experience to provide testing you can trust blindly.
                                </p>

                                <div className="row g-5 pt-2 mb-5">
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="icon-box-primary mb-4">
                                            <i className="bi bi-person-plus text-dark"></i>
                                        </div>
                                        <h5 className="mb-3">Experience Doctors</h5>
                                        <span>
                                            Managed by senior medical professionals for error-free testing.
                                        </span>
                                    </div>

                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                                        <div className="icon-box-primary mb-4">
                                            <i className="bi bi-check-all text-dark"></i>
                                        </div>
                                        <h5 className="mb-3">Advanced Microscopy</h5>
                                        <span>
                                            100% automated analyzers for highest accuracy results.
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    className="btn btn-primary py-3 px-5 wow fadeIn"
                                    data-wow-delay="0.5s"
                                    to="/about"
                                >
                                    Explore More
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="row h-100 align-items-end">
                                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{ minHeight: "300px" }}
                                    >
                                        {/* <button
                                            type="button"
                                            className="btn-play"
                                            data-bs-toggle="modal"
                                            data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                                            data-bs-target="#videoModal"
                                        >
                                            <span></span>
                                        </button> */}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="bg-primary p-5">
                                        <div className="experience mb-4 wow fadeIn" data-wow-delay="0.3s">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-white">Sample Preparation</span>
                                                <span className="text-white">90%</span>
                                            </div>

                                            <div className="progress">
                                                <div
                                                    className="progress-bar bg-dark"
                                                    role="progressbar"
                                                    aria-valuenow="90"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="experience mb-4 wow fadeIn" data-wow-delay="0.4s">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-white">Result Accuracy</span>
                                                <span className="text-white">95%</span>
                                            </div>

                                            <div className="progress">
                                                <div
                                                    className="progress-bar bg-dark"
                                                    role="progressbar"
                                                    aria-valuenow="95"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="experience mb-0 wow fadeIn" data-wow-delay="0.5s">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-white">Lab Equipments</span>
                                                <span className="text-white">90%</span>
                                            </div>

                                            <div className="progress">
                                                <div
                                                    className="progress-bar bg-dark"
                                                    role="progressbar"
                                                    aria-valuenow="90"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Features 2 End */}
        </>
    );
}

export default Features2;