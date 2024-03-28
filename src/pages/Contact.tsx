import React from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <h1>Contact Us</h1>
                <p>For any questions please use the form to contact us:</p>

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea className="form-control" id="message" rows={5}></textarea>
                    </div>
                    <div className="form-text">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            <div className="fixed-bottom">
                <Footer />
            </div>
        </div>
    );
}

export default ContactPage;
