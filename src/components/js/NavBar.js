import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentPath = (path) => location.pathname === path;
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUserInitial(currentUser.firstName[0].toUpperCase()+currentUser.lastName[0].toUpperCase());
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



  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
      <div className={isCurrentPath('/profile') ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleProfile} style={{ display: 'flex', alignItems: 'center' }}>
            <div 
              style={{
                width: '50px', 
                height: '50px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                backgroundColor: 'orange',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '10px'
              }}
            >
              {userInitial}
            </div>
            My Account
          </button>
        </div>
        <div className={(isCurrentPath('/dashboard') || isCurrentPath('/budget/set')) ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleReports} style={{ display: 'flex', alignItems: 'center' }}>Dashboard</button>
        </div>
        <div className={(isCurrentPath('/expenses') || isCurrentPath('/expenses/add')) ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleExpenses} style={{ display: 'flex', alignItems: 'center' }}>Expenses</button>
        </div>
        <div className={isCurrentPath('/about') ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleAbout} style={{ display: 'flex', alignItems: 'center' }}>About</button>

        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
