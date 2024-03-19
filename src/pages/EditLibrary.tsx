import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const EditLibrary: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [libraryData, setLibraryData] = useState<Library | null>(null); // Rename to avoid conflict with libraryId
  const { libraryId } = useParams<{ libraryId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `https://ciaranchaney.com:443/library/${libraryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLibraryData(response.data);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };

    fetchLibrary();
  }, [libraryId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const updatedLibraryData = {
        libraryName: event.currentTarget.libraryName.value,
        version: event.currentTarget.libraryVersion.value,
        hash: {
          hashValue: event.currentTarget.libraryHash.value,
        },
      };

      await axios.post(
        `https://ciaranchaney.com:443/editlibrary/${libraryId}`,
        updatedLibraryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(true);
      navigate("/library");
      window.location.reload();
    } catch (error) {
      console.error("Error updating library:", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Library
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          <Grid container spacing={2}>
            {libraryData && (
              <>
                <Grid item xs={12}>
                  <TextField
                    id="library_name"
                    label="Library Name"
                    variant="outlined"
                    name="libraryName"
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={libraryData.libraryName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="library_version"
                    label="Library Version"
                    variant="outlined"
                    name="libraryVersion"
                    required
                    fullWidth
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={libraryData.version}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="library_hash"
                    label="Library Hash"
                    variant="outlined"
                    name="libraryHash"
                    required
                    fullWidth
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={libraryData.hash.hashValue}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default EditLibrary;
