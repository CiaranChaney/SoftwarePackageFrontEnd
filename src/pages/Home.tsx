import ReactGA from "react-ga4";
import NavBar from "../components/NavBar";
import Favicon from "../components/Favicon";
import 'bootstrap/dist/css/bootstrap.css';
import "../scss/styles.scss";
import React from "react";
import Footer from "../components/Footer";

ReactGA.initialize('G-QZSYBWE1M5');

const Home = () => {
    document.title = "Library Data Repository";

    ReactGA.send({ hitType: 'pageview', page: "/home" });

    return (
        <div>
            <Favicon/>
            <NavBar/>

            <header className="text-center py-5">
                <h1>Welcome to the Library Data Repository</h1>
                <p className="lead">Your go-to platform for managing and validating library data.</p>
            </header>

            <section id="featured" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">Recent Malicious Libraries Found</h2>
                </div>
            </section>

            <section id="about" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">About Us</h2>
                    <p className="text-center"></p>
                </div>
            </section>

            <section id="cta" className="py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto text-center">
                            <h2>Get Started</h2>
                            <p>Sign up now to explore the collection of libraries.</p>
                            <a className={"btn btn-dark btn-lg p-2"} href="/register" role="button">
                                Register
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
};

export default Home;
