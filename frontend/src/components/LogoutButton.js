import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Button variant="secondary" size="sm" className="float-start mt-2" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
