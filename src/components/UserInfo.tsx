import React from "react";
import { jwtDecode } from "jwt-decode";

const UserInfo: React.FC<{ token: string }> = ({ token }) => {
  const decodedToken = jwtDecode(token);

  return (
    <div className={"text-end"}>
        <h6>Logged in as: <strong>{decodedToken.sub}</strong></h6>
    </div>
  );
};

export default UserInfo;
