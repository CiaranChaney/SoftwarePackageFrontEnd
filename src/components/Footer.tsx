
const Footer = () => {

    return (
        <footer className="bg-dark text-white text-center py-4">
            <div className="container">
                <nav>
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item"><a href="/contact" className="text-white">Contact Us</a></li>
                        <li className="list-inline-item"><a href="/terms" className="text-white">Terms of Service</a>
                        </li>
                        <li className="list-inline-item"><a href="/privacy" className="text-white">Privacy Policy</a>
                        </li>
                    </ul>
                </nav>
                <p className="mb-0">&copy; 2024 Library Data Repository. All rights reserved.</p>
            </div>
        </footer>
    );

}

export default Footer;

