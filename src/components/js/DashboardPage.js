import React, {useEffect } from "react";
import '../css/NavBar.css';
import NavBar from "./NavBar";

const DashboardPage = () => {

   useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 60000); 
    return () => clearTimeout(timer);
    }, []);

  return (
    <div className="homescreen-container">
    <NavBar />
    <div className="content-profile-container">
      <div className="content-header">
        <h1>Dashboards</h1>
      </div>
      <div className="content-body" />
    </div>
  </div>
  );
};

export default DashboardPage;