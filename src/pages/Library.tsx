import React from "react";
import {ReactDOM} from "react";
import DataTable from "../components/LibraryDataTable";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import Favicon from "../components/Favicon";
import LibraryDataTable from "../components/LibraryDataTable";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const LibraryPage: React.FC = () => {
  document.title = "Library Data Repository";

  const token = localStorage.getItem("token");

  return (
      <div>
          <Favicon/>
          <div className={"col"}>
              <NavBar></NavBar>
          </div>

          <LibraryDataTable></LibraryDataTable>


      </div>

  );
};

export default LibraryPage;
