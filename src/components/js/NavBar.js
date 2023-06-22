import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentPath = (path) => location.pathname === path;

  const [showUserManagement, setShowUserManagement] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser && currentUser.role.roleId === 1) {
      setShowUserManagement(true);
    } else {
      setShowUserManagement(false);
    }
  }, []);

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

  const handleUserManagement = () => {
    navigate("/userManagement");
  };

  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <div className={isCurrentPath('/profile') ? 'login-chat-header active' : 'login-chat-header'}>
          <button onClick={handleProfile} className="navbar-item-logo">
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
        {showUserManagement && (
          <div className={isCurrentPath('/userManagement') ? 'login-chat-header active' : 'login-chat-header'}>
            <button className="navbar-item" onClick={handleUserManagement}>Account Management</button>
          </div>
        )}
        <div className={isCurrentPath('/about') ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleAbout}>About</button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
