import React from "react";
import { jwtDecode } from "jwt-decode";

const UserInfo: React.FC<{ token: string }> = ({ token }) => {
  const decodedToken = jwtDecode(token);

  return (
    <div
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      Logged in as: <strong>{decodedToken.sub}</strong>
    </div>
  );
};

export default UserInfo;
