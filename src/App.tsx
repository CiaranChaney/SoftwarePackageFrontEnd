import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Library from "./pages/Library";
import SecureRoute from "./components/SecureRoute";
import EditLibrary from "./pages/EditLibrary";
import DeleteLibrary from "./pages/DeleteLibrary";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import EditUser from "./components/EditUser";



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/library" element={<Library />} />
        <Route path="/editlibrary/:libraryId" element={<SecureRoute />}>
          <Route
            path="/editlibrary/:libraryId"
            element={<EditLibrary />}
          />
        </Route>
        <Route path="/deleteLibrary/:libraryId" element={<SecureRoute />}>
          <Route
            path="/deleteLibrary/:libraryId"
            element={<DeleteLibrary />}
          />
        </Route>
        <Route path="/AdminPanel" element={<SecureRoute />}>
          <Route
              path="/AdminPanel"
              element={<AdminPanel />}
          />
        </Route>
        <Route path="/user/edit/:userId" element={<SecureRoute />}>
          <Route
              path="/user/edit/:userId"
              element={<EditUser />}
          />
        </Route>
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
