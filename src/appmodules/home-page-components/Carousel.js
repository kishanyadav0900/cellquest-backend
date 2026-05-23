import { Link } from "react-router-dom";


function Carousel(){
    return(
        <>
            {/* Carousel Start */}
    <div className="container-fluid header-carousel px-0 mb-5">
        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="/carousel-1.jpg" alt="Lab Scientist" style={{ objectFit: 'cover', objectPosition: 'top', height: '75vh', minHeight: '400px', position: 'relative' }}/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-lg-7 text-start">
                                    <h1 className="display-1 text-white animated slideInRight mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>Advanced Diagnostic Laboratory Center</h1>
                                    <p className="mb-5 animated slideInRight">Welcome to cellquestindia. We provide highly accurate, timely, and reliable pathology and biochemistry testing services. Your health and safety are our top priority.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src="/carousel-2.jpg" alt="Expert Doctors" style={{ objectFit: 'cover', objectPosition: 'top', height: '75vh', minHeight: '400px', position: 'relative' }}/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-end">
                                <div className="col-lg-7 text-end">
                                    <h1 className="display-1 text-white animated slideInLeft mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>Expert Doctors & Trained Technicians</h1>
                                    <p className="mb-5 animated slideInLeft">Our laboratory is equipped with state-of-the-art machines and guided by highly experienced medical professionals, ensuring every test report is precise and dependable.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Book Test Button */}
            <div className="position-absolute w-100 d-flex justify-content-center" style={{ bottom: '8%', zIndex: 15, pointerEvents: 'none' }}>
                <a href="#services-section" className="btn btn-primary py-3 px-5 fw-bold shadow-lg" style={{ pointerEvents: 'auto', borderRadius: '50px', fontSize: '1.2rem', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Book Test</a>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    {/* Carousel End */}
        </>
    );
}

export default Carousel;