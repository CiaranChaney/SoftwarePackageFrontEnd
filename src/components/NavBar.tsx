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
import 'bootstrap/dist/css/bootstrap.css';

const NavBar: React.FC = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  const showLibraryButton = location.pathname !== "/library";

  return (
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-12 col-lg-6"}>
              <div className={"row"}>
                <div className={"col"}>
                  <h4>Library Hash Repository</h4>
                </div>
              </div>
            </div>

            <div className={"col-12 col-lg-6 d-flex justify-content-end "}>
              <div className={"row"}>
                <div className={"col-6 col-lg-4 d-flex justify-content-end"}>
                  {location.pathname !== "/library" ? (

                      <Button
                          variant="contained"
                          color="inherit"
                          component={Link}
                          to="/library"
                      >
                        Libraries
                      </Button>

                  ) : (
                      <Button
                          variant="contained"
                          color="inherit"
                          component={Link}
                          to="/"
                      >
                        Home
                      </Button>
                  )}
                </div>

                <div className={"col-6 col-lg-3 d-flex justify-content-end "}>

                  {token == null ? (

                      <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => (window.location.href = "/login")}
                      >
                        Login
                      </Button>

                  ) : (

                      <LogOut token={token}>
                        <Button
                            variant="contained"
                            color="inherit"
                            style={{color: "inherit"}}
                        >
                          Logout
                        </Button>
                      </LogOut>

                  )}
                </div>

                <div className={"col-12 col-lg-5 d-flex justify-content-end"}>
                  {token == null ? (
                      <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => (window.location.href = "/register")}
                      >
                        Register
                      </Button>
                  ) : (
                      <UserInfo token={token}/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default NavBar;
