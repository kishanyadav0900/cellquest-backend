import { Link } from "react-router-dom";
import Nav from "../shared-components/Nav";
import AppoinmentContent from "../home-page-components/AppoinmentContent";
import Footer from "../shared-components/Footer";


function Appoinment() {
    return (
        <>
            <header>
                <Nav />

                {/* Page Header Start */}
                <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                    <div className="container text-center py-5 mt-4">
                        <h1 className="display-2 text-white mb-3 animated slideInDown">Appoinment</h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol className="breadcrumb justify-content-center mb-0">
                                <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="#">Pages</Link></li>
                                <li className="breadcrumb-item" aria-current="page">Appoinment</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* Page Header End */}
            </header>

            <main>
                <AppoinmentContent />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Appoinment;