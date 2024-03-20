import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Library from "./pages/Library";
import SecureRoute from "./components/SecureRoute";
import EditLibrary from "./pages/EditLibrary";
import DeleteLibrary from "./pages/DeleteLibrary";

ReactGA.initialize('G-QZSYBWE1M5');

function App() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/library" element={<Library />} />
        <Route exact path="/editlibrary/:libraryId" element={<SecureRoute />}>
          <Route
            exact
            path="/editlibrary/:libraryId"
            element={<EditLibrary />}
          />
        </Route>
        <Route exact path="/deleteLibrary/:libraryId" element={<SecureRoute />}>
          <Route
            exact
            path="/deleteLibrary/:libraryId"
            element={<DeleteLibrary />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
