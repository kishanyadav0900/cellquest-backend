function Team() {
    return (
        <>
            {/* Team Start */}
            <div className="container-fluid container-team py-5">
                <div className="container pb-5">

                    <div className="row g-5 align-items-center mb-5">

                        <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
                            <img className="img-fluid w-100" src="/dr-rakesh-kumar.jpg" alt="Dr. Rakesh Kumar" />
                        </div>

                        <div className="col-md-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="display-6 mb-3">Dr. Rakesh Kumar</h1>
                            <p className="mb-1">CEO & Founder</p>
                            <p className="mb-5">CodeSquadz, New York, USA</p>

                            <h3 className="mb-3">Biography</h3>

                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                                tellus augue, iaculis id elit eget, ultrices pulvinar tortor.
                                Quisque vel lorem porttitor, malesuada arcu quis, fringilla
                                risus. Pellentesque eu consequat augue.
                            </p>

                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                                tellus augue, iaculis id elit eget, ultrices pulvinar tortor.
                                Quisque vel lorem porttitor, malesuada arcu quis, fringilla
                                risus. Pellentesque eu consequat augue.
                            </p>

                            <div className="d-flex">
                                <a className="btn btn-lg-square btn-primary me-2" href="#">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-lg-square btn-primary me-2" href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-lg-square btn-primary me-2" href="#">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a className="btn btn-lg-square btn-primary me-2" href="#">
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