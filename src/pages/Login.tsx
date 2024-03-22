import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Favicon from "../components/Favicon";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Login = () => {
  document.title = "Login";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://ciaranchaney.com:443/login", {
        username: username,
        password: password,
      });
      console.log(response.data);
      if (response.data.token !== undefined) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("toastMessage", "Logged in Succefssfully");
        console.log("Logged in successfully");
        navigate("/library");
        window.location.reload();
        console.log("Redirecting to library...");
      } else {
        console.log("Invalid username or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password")
      }
      console.error("Error logging in:", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Favicon />
      <Container maxWidth={"xs"}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant={"h5"}>Sign in</Typography>
          <Box component="form" onSubmit={handleLogin}>
            {" "}
            {}
            <Box sx={{ mt: 1 }}>
              <TextField
                margin={"normal"}
                required
                fullWidth
                id={"username"}
                label={"Username"}
                name={"username"}
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin={"normal"}
                required
                fullWidth
                id={"password"}
                label={"Password"}
                name={"Password"}
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                r
              />
              <Typography variant={"body2"} color={"error"}>
                {errorMessage && <div>{errorMessage}</div>}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant={"contained"}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </Button>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link
                    to="/register"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Don't have an account? Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
