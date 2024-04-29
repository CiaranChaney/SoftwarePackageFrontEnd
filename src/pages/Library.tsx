import NavBar from "../components/NavBar";
import Favicon from "../components/Favicon";
import LibraryDataTable from "../components/LibraryDataTable";
import Footer from "../components/Footer";


const LibraryPage: React.FC = () => {
  document.title = "Library Data Repository";

  return (
      <div>
          <Favicon/>
          <div className={"col"}>
              <NavBar></NavBar>
          </div>

          <LibraryDataTable></LibraryDataTable>

          <Footer />


      </div>

  );
};

export default LibraryPage;
