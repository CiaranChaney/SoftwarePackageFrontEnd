import React from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LogOut: React.FC<{ token: string }> = ({ token }) => {

  const handleLogout = async () => {
    try {
      console.log(token);
      const response = await axios.post("https://ciaranchaney.com:443/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.setItem("toastMessage", "Logged out Succefssfully");
        console.log("Logged out successfully");
        window.location.href = "/library";
      } else {
        console.error("Error logging out");
        toast.error("Error logging out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <a className={"btn btn-light btn-lg"}
       onClick={handleLogout}
       role="button">
      Logout
    </a>
)
  ;
};

export default LogOut;
