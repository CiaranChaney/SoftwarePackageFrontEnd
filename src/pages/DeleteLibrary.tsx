import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";

interface Library {
  libraryId: number;
  libraryName: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const DeleteLibraryPage: React.FC = () => {
  const { libraryId } = useParams<{ libraryId: string }>();
  const [library, setLibrary] = useState<Library | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    console.log("Library ID:", libraryId);

    axios
      .get(`http://localhost:7050/library/${libraryId}`)
      .then((response) => {
        setLibrary(response.data);
      })
      .catch((error) => {
        console.error("Error fetching library:", error);
      });
  }, [libraryId]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:7050/deletelibrary/${libraryId}/confirmed`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        console.log("Library deleted successfully");
        window.location.href = "/library";
      })
      .catch((error) => {
        console.error("Error deleting library:", error);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" style={{ marginTop: 40 }}>
        <Typography variant="h4" gutterBottom>
          Delete Library
        </Typography>
        {library ? (
          <div>
            <Typography variant="body1">
              Are you sure you want to delete the library:{" "}
              <strong>{library.libraryName}</strong>?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelete}
              style={{ marginTop: 20 }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default DeleteLibraryPage;
