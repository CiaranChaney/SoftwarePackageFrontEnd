import React from "react";
import DataTable from "../components/LibraryDataTable";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const LibraryPage: React.FC = () => {
  document.title = "Library Data Repository";
  const favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = "https://imgur.com/4bSXALG.png";
    newFavicon.id = "favicon";
    document.head.appendChild(newFavicon);
  }
  const token = localStorage.getItem("token");

  return (
    <ThemeProvider theme={darkTheme}>
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
