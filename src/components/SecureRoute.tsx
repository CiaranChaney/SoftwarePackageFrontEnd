import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const SecureRoute = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const adminAuthorised = decodedToken.roles.includes("ADMIN");

  return adminAuthorised ? <Outlet /> : <Navigate to="/login" />;
};

export default SecureRoute;
