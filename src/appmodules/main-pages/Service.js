import ServiceHeader from "../service-page-components/ServiceHeader";
import ServicesContent from "../service-page-components/ServicesContent";
import Footer from "../shared-components/Footer";
import Nav from "../shared-components/Nav";

function Service(){
    return(
        <>
            <div>
                <header>
                    <Nav />
                    <ServiceHeader />
                </header>

                <main>
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