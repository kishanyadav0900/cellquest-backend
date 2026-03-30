import { Link } from "react-router-dom";

function AboutHeader() {
    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5 mt-4">
                    <h1 className="display-2 text-white mb-3 animated slideInDown">About</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="#">Pages</Link></li>
                            <li className="breadcrumb-item" aria-current="page">About</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}
        </>
    );
}

export default AboutHeader;