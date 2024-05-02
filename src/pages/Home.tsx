import ReactGA from "react-ga4";
import NavBar from "../components/NavBar";
import Favicon from "../components/Favicon";
import 'bootstrap/dist/css/bootstrap.css';
import "../scss/styles.scss";
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
                <h1>Welcome to the Hash Veritas Repository</h1>
                <p className="lead">Your go-to platform for managing and validating library data.</p>
            </header>

            <section id="featured" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">Recent Malicious Libraries Found</h2>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card border-warning">
                                <div className="card-header bg-warning text-white">
                                    Severe Vulnerability Alert
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">io.trino:trino-client</h5>
                                    <h6 className="text-muted">Version 439 - Trino</h6>
                                    <p className="fw-bold">CVSS Score: 7.4</p>
                                    <p className="card-text">Deserialization of untrusted data can occur </p>
                                    <p className="fw-bold">Vulnerable Hash:</p>
                                    <p className="text-monospace">c7bb819bd87639d0b5de393b02e31a58e36e3cec196928e1c28dfef08f64d5cb</p>
                                    <p className="fw-bold">Fix version: 400</p>
                                    <p className="fw-bold">Fix Hash:</p>
                                    <p className="text-monospace">55e1eefe8a7524079c64d28cb781d71fd2f2fe69e827e288fb9b7461c22c7c95</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card border-danger">
                                    <div className="card-header bg-danger text-white">
                                        Critical Vulnerability Alert
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">org.ciaranchaney:libraryhashing-be</h5>
                                        <h6 className="text-muted">Version 1.5.6 - Hash Veritas</h6>
                                        <p className="fw-bold">CVSS Score: 9.5</p>
                                        <p className="card-text">Malicious back door added in version 1.5.6</p>
                                        <p className="fw-bold">Vulnerable Hash:</p>
                                        <p className="text-monospace">6d586d5a13e0a4f9d20cf25eed2f26a5adf3fda1aad7a0c599ebde14890fce53</p>
                                        <p className="fw-bold">Mitigated version: 1.5.7</p>
                                        <p className="fw-bold">Mitigated Hash:</p>
                                        <p className="text-monospace">4b92abc6d4903e0859ba30b05d6483c8327a299186774c31581db46b05f708d4</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">Last updated 5 hours ago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card border-warning">
                                    <div className="card-header bg-warning text-white">
                                        Severe Vulnerability Alert
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">io.github.yangziwen:quick-state</h5>
                                        <h6 className="text-muted">Version 0.0.4 - yangziwen</h6>
                                        <p className="fw-bold">CVSS Score: 5.2</p>
                                        <p className="card-text">Out of date hashing algorithm used</p>
                                        <p className="fw-bold">Vulnerable Hash:</p>
                                        <p className="text-monospace">30f5105afdc17a5b78287e5f42df397f55f636f2bcf26c6ce1c089925c145161</p>
                                        <p className="fw-bold">Mitigated version: 0.0.5</p>
                                        <p className="fw-bold">Mitigated Hash:</p>
                                        <p className="text-monospace">b8b510d95518c673aeb78549a279050300134aad80c99dbc24fd93b52b13a4ee</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">Last updated 1 day ago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="cta" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="mb-4">Get Started with Our Services</h2>
                            <p className="lead mb-5">Access our comprehensive repository or sign up to stay informed
                                about the latest updates and security notices.</p>
                            <div className="btn-group" role="group" aria-label="Call to Action Buttons">
                                <a className="btn btn-dark btn-lg px-4 me-2" href="/library" role="button">
                                    <i className="bi bi-archive"></i> View Libraries
                                </a>
                                <a className="btn btn-dark btn-lg px-4" href="/register" role="button">
                                    <i className="bi bi-pencil-square"></i> Register Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer/>
        </div>
    );
};

export default Home;
