import AboutContent from "../about-page-components/AboutContent";
import AppoinmentContent from "../home-page-components/AppoinmentContent";
import Carousel from "../home-page-components/Carousel";
import Feature1 from "../home-page-components/Features1";
import Features2 from "../home-page-components/Features2";
import Team from "../home-page-components/Team";
import ServicesContent from "../service-page-components/ServicesContent";
import Footer from "../shared-components/Footer";
import Nav from "../shared-components/Nav";

function Home() {

    return (
        <div>
            <header>
                <Nav />
            </header>

            <main>
                <Carousel />
                <AboutContent />
                <Feature1 />
                <Features2 />
                <ServicesContent />
                <AppoinmentContent />
                <Team />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Home;