import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleExpenses = () => {
    navigate("/expenses");
  };
  const handleBudget = () => {
    navigate("/budget");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleAbout = () => {
    navigate("/about");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <div className="login-chat-header">
          <button onClick={handleHome} >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0x7tP3v82u1jMLRYOWATA6KaV0bBUmYZztQ&usqp=CAU"
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
          <button className="navbar-item" onClick={handleExpenses} >Expenses</button>
        </div>
        <div className="login-chat-header">
          <button className="navbar-item" onClick={handleBudget} >Reports</button>
        </div>
{/*         <div className="login-chat-header">
          <button className="navbar-item" onClick={handleDashboard} >Dashboard</button>
        </div> */}
        <div className="login-chat-header">
          <button className="navbar-item" onClick={handleAbout} >About</button>
        </div>
      </ul>
      <div>
          <button onClick={handleLogout} className="login-chat-logout" >Logout :(</button>
        </div>
    </nav>
  );
};

export default Navbar;
