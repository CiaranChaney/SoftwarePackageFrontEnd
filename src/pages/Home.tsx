import NavBar from "../components/NavBar";
import Favicon from "../components/Favicon";
import ReactGA from "react-ga4";
import 'bootstrap/dist/css/bootstrap.css';
import "../scss/styles.scss";


ReactGA.initialize('G-QZSYBWE1M5');

const Home = () => {
    document.title = "Library Data Repository";

    ReactGA.send({ hitType: 'pageview', page: "/home" });

    return (

        <div>
            <Favicon/>
            <NavBar/>


            <h1>Home</h1>
        </div>
    );
};

export default Home;