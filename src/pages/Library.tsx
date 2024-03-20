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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const LibraryPage: React.FC = () => {
  document.title = "Library Data Repository";

  const token = localStorage.getItem("token");

  return (
    <ThemeProvider theme={darkTheme}>
      <Favicon />
      <CssBaseline /> {}
      <NavBar />
      <Container maxWidth="md" style={{ marginTop: 40 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Library Hash Repository
        </Typography>

        <DataTable />
      </Container>
    </ThemeProvider>
  );
};

export default LibraryPage;
