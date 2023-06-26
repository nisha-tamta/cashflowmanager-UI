import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/NavBar.css';
import dashboardImage from '../images/dashboard.png';
import employeesImage from '../images/employees.png';
import expensesImage from '../images/expenses.png';
import settingsImage from '../images/settings.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentPath = (path) => location.pathname === path;

  const [showUserManagement, setShowUserManagement] = useState(false);
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUserInitial(currentUser.firstName[0].toUpperCase()+currentUser.lastName[0].toUpperCase());
      if (currentUser.role.roleId === 1) {
        setShowUserManagement(true);
      } else {
        setShowUserManagement(false);
      }
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

  const handleEmployees = () => {
    navigate("/employees");
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
          <button className="navbar-item" onClick={handleReports} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={dashboardImage}
              style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
            />
            Dashboards
          </button>
        </div>
        {showUserManagement && (
          <div className={isCurrentPath('/userManagement') ? 'login-chat-header active' : 'login-chat-header'}>
            <button className="navbar-item" onClick={handleUserManagement} style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <img
                  src={settingsImage}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                />
              </div>
              Account Management
            </button>
          </div>
        )}
        <div className={isCurrentPath('/employees') ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleEmployees} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <img
                src={employeesImage}
                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
              />
            </div>
            Employees
          </button>
        </div>
        <div className={(isCurrentPath('/expenses') || isCurrentPath('/expenses/add')) ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleExpenses} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <img
                src={expensesImage}
                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
              />
            </div>
            Expenses
          </button>
        </div>
        <div className={isCurrentPath('/about') ? 'login-chat-header active' : 'login-chat-header'}>
          <button className="navbar-item" onClick={handleAbout} style={{ display: 'flex', alignItems: 'center' }}>
            {/* <div>
              <img
                src={dashboardImage}
                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px'  }}
              />
            </div> */}
            About
          </button>

        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
