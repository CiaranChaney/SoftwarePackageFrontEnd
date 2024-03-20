import NavBar from "../components/NavBar";
import Favicon from "../components/Favicon";

const Home = () => {
    document.title = "Library Data Repository";

  return (

    <div>
        <Favicon />
      <NavBar />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
