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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Favicon from "../components/Favicon";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Register = () => {
  document.title = "Register";

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      console.log("Invalid email");
      setErrorMessage("Invalid email");
      return;
    }

    try {
      const response = await axios.post("https://ciaranchaney.com:443/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response.data);

      if (response.data.token !== undefined) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("Registered in successfully");
        navigate("/Library");
        window.location.reload();
        console.log("Redirecting to library...");
      } else {
        console.log("Invalid registration");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
          <Typography variant={"h5"}>Sign up</Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleRegister}>
              {" "}
              {}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin={"normal"}
                    required
                    fullWidth
                    id={"username"}
                    label={"Username"}
                    name={"username"}
                    autoFocus
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin={"normal"}
                    required
                    fullWidth
                    id={"email"}
                    label={"Email Address"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin={"normal"}
                    required
                    fullWidth
                    id={"password"}
                    label={"Password"}
                    name={"Password"}
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Typography variant={"body2"} color={"error"}>
                  {errorMessage && <div>{errorMessage}</div>}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant={"contained"}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
                <Grid container justifyContent={"flex-end"}>
                  <Grid item>
                    <Link
                      to="/login"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
