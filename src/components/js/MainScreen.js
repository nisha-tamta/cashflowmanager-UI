import React from "react";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-chat-container">
          <div className="login-logo-container">
            <img
              src="https://pbs.twimg.com/media/EYhrRIGUYAEjmGN.jpg"
              alt="Expense Tracker Logo"
              className="login-logo"
            />
          </div>
          <div className="login-chat-header">Welcome to CashFlow Manager</div>
          <button
            type="submit"
            className="login-chat-button"
            onClick={handleLoginClick}
          >
            {" "}
            Login{" "}
          </button>
          <span className="button-spacing"></span>
          <button
            type="submit"
            className="login-chat-button"
            onClick={handleSignupClick}
          >
            {" "}
            SignUp{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
