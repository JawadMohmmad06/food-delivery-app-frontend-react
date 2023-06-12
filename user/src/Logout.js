import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
   
    // Delete token from localStorage
    localStorage.removeItem("token");
    // Redirect to login or any other page
    navigate("/login");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
