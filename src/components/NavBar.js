// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar-container">
        
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/profile">Profile</Link></li>
        <li className="navbar-item"><Link to="/expenses">Expenses</Link></li>
        <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
