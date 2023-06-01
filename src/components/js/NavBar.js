import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentPath = (path) => location.pathname === path;

  const handleHome = () => {
    navigate("/profile");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleExpenses = () => {
    navigate("/expenses");
  };
  const handleReports = () => {
    navigate("/dashboard");
  };
  const handleAbout = () => {
    navigate("/about");
  };



  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <div className={isCurrentPath('/profile') ? 'login-chat-header active' : 'login-chat-header'}>
          <button onClick={handleHome} className="navbar-item-logo">
            <div>
              <img
                src="https://www.citypng.com/public/uploads/preview/download-profile-user-round-orange-icon-symbol-png-11639594360ksf6tlhukf.png"
                alt="Expense Tracker Logo"
                className="home-logo"
                style={{ width: '50px', height: 'auto' }}
              />
            </div>
            <div>
              My Account
            </div>
          </button>
        </div>
        <div className={(isCurrentPath('/dashboard') || isCurrentPath('/budget/set')) ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleReports}>Dashboard</button>
        </div>
        <div className={(isCurrentPath('/expenses') || isCurrentPath('/expenses/add')) ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleExpenses}>Expenses</button>
        </div>
        <div className={isCurrentPath('/about') ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleAbout}>About</button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
