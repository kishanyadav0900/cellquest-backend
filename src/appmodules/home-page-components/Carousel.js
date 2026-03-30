import { Link } from "react-router-dom";


function Carousel(){
    return(
        <>
            {/* Carousel Start */}
    <div className="container-fluid header-carousel px-0 mb-5">
        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="https://res.cloudinary.com/dckaebnl5/image/upload/v1772820729/carousel-1_irgfjp.jpg" alt="Image"/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-lg-7 text-start">
                                    <h1 className="display-1 text-white animated slideInRight mb-3">Award Winning Laboratory Center</h1>
                                    <p className="mb-5 animated slideInRight">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue, iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem porttitor, malesuada arcu quis, fringilla risus.</p>
                                    <Link to="" className="btn btn-primary py-3 px-5 animated slideInRight">Explore More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src="https://res.cloudinary.com/dckaebnl5/image/upload/v1772820730/carousel-2_rn7vbi.jpg" alt="Image"/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-end">
                                <div className="col-lg-7 text-end">
                                    <h1 className="display-1 text-white animated slideInLeft mb-3">Expet Doctors & Lab Assistants</h1>
                                    <p className="mb-5 animated slideInLeft">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue, iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem porttitor, malesuada arcu quis, fringilla risus.</p>
                                    <Link to="" className="btn btn-primary py-3 px-5 animated slideInLeft">Explore More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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