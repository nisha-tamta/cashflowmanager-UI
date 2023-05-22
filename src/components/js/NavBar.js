import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/NavBar.css';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <h2>Are you sure you want to logout?</h2>
        <div className="confirmation-buttons">
          <button className="login-chat-logout" onClick={onConfirm}>Logout</button>
          <button className="login-chat-logout-green" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

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

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleLogoutConfirmation = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };


  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <div className="login-chat-header">
          <button onClick={handleHome} >
            <img
              src="https://www.citypng.com/public/uploads/preview/download-profile-user-round-orange-icon-symbol-png-11639594360ksf6tlhukf.png"
              alt="Expense Tracker Logo"
              className="home-logo"
              style={{ width: '50px', height: 'auto' }}
            />
          </button>
        </div>
        <div className="login-chat-header">
          <button className="navbar-item" onClick={handleProfile} >Profile</button>
        </div>
        <div className="login-chat-header">
          <button className="navbar-item" onClick={handleReports} >Dashboard</button>
        </div>
        <div className="login-chat-header">
          <button className="navbar-item" onClick={handleExpenses} >Expenses</button>
        </div>
        <div className="login-chat-header">
          <button className="navbar-item" onClick={handleAbout} >About</button>
        </div>
      </ul>
      <div>
        <button onClick={handleLogout} className="login-chat-logout" >Logout :(</button>
        {showConfirmation && (
          <LogoutConfirmation
            onConfirm={handleLogoutConfirmation}
            onCancel={handleCancelLogout}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
