import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ServiceHeader from "../service-page-components/ServiceHeader";
import ServicesContent from "../service-page-components/ServicesContent";
import Features2 from "../home-page-components/Features2";
import Footer from "../shared-components/Footer";
import Nav from "../shared-components/Nav";

function Service(){
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
            }
        }
    }, [location]);

    return(
        <>
            <div>
                <header>
                    <Nav />
                    <ServiceHeader />
                </header>

                <main>
                    <Features2 />
                    <ServicesContent />
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}

export default Service;