import React from "react";
import {useLocation } from "react-router-dom";
import LogOut from "./LogOut";
import UserInfo from "./UserInfo";
import 'bootstrap/dist/css/bootstrap.css';

const NavBar: React.FC = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");


  return (
      <div className={"container-fluid"}>
        <div className={"row"}>
          <div className={"navCol col-lg-6 mb-3"}>
            <div className={"row"}>
              <div className={"col"}>
                <a className={"link-light"} href={"/"}>
                  <h4>Library Hash Repository</h4>
                </a>
              </div>
            </div>
          </div>

          <div className={"navCol col-lg-6 d-flex justify-content-end mb-3"}>
            <div className={"row"}>
              <div className={"col-9 col-lg-4 col-sm-6 d-flex justify-content-end mb-2 mb-lg-0"}>
                {location.pathname.startsWith("/library") ? (
                    <a className={"btn btn-light btn-lg p-2"} href="/" role="button">
                      Home
                    </a>
                ) : (
                    <a className={"btn btn-light btn-lg p-2"} href="/library" role="button">
                      Libraries
                    </a>
                )}

              </div>


              <div className={"col-3 col-lg-3 col-sm-6 d-flex justify-content-end mb-2 mb-lg-0"}>
                {token == null ? (
                    <a className={"btn btn-light btn-lg p-2"} href="/login" role="button">
                      Login
                    </a>
                ) : (
                    <LogOut token={token}></LogOut>
                )}
              </div>

              {token == null ? (
                  <div className={"col-4 col-lg-4 col-sm-6 d-flex justify-content-end mb-2 mb-lg-0"}>
                    <a className={"btn btn-light btn-lg p-2"} href="/register" role="button">
                      Register
                    </a>
                  </div>
              ) : (
                  <div className={"col-12 col-lg-5 d-flex justify-content-end"}>
                    <UserInfo token={token}/>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>


  );
}

export default NavBar;
