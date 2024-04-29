import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

interface DecodedToken {
    roles: string[];
}

const SecureRoute = () => {
  const token = localStorage.getItem("token");
  // @ts-ignore
  const decodedToken = jwtDecode(token) as DecodedToken;
  const adminAuthorised = decodedToken.roles.includes("ADMIN");

  return adminAuthorised ? <Outlet /> : <Navigate to="/login" />;
};

export default SecureRoute;
