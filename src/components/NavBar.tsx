import React from "react";
import {
  AppBar,
  Button,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LogOut from "./LogOut";
import UserInfo from "./UserInfo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NavBar: React.FC = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  const showLibraryButton = location.pathname !== "/library";

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="xs">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Library Hash Repository
            </Typography>
          </Container>

          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            style={{ padding: "10px" }}
          >
            {showLibraryButton && (
              <Grid item>
                <Button
                  variant="contained"
                  color="inherit"
                  component={Link}
                  to="/library"
                >
                  Libraries
                </Button>
              </Grid>
            )}
            {token == null && (
              <Grid item>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </Button>
              </Grid>
            )}
            {token == null && (
              <Grid item>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => (window.location.href = "/register")}
                >
                  Register
                </Button>
              </Grid>
            )}
            <Grid item>
              {token && (
                <LogOut token={token}>
                  <Button
                    variant="contained"
                    color="inherit"
                    style={{ color: "inherit" }} // Set color to inherit
                  >
                    Logout
                  </Button>
                </LogOut>
              )}
            </Grid>
            <Grid item>{token && <UserInfo token={token} />}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
