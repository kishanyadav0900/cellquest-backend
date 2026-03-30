import AboutContent from "../about-page-components/AboutContent";
import AboutHeader from "../about-page-components/AboutHeader";
import Features2 from "../home-page-components/Features2";
import Team from "../home-page-components/Team";
import Footer from "../shared-components/Footer";
import Nav from "../shared-components/Nav";


function About(){
    
    return(
        <div>
            <header>
                <Nav/>
                <AboutHeader/>
            </header>

            <main>
                <AboutContent />
                <Features2 />
                <Team />
            </main>

            <footer>
                <Footer />
            </footer>

        </div>
    );
}

export default About;