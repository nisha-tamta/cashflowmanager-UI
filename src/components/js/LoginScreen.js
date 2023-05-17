import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginScreen.css";

const LoginScreen = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/login?username=${username}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
        onLoginSuccess();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to login. Please try again later.");
    }
  };

  const handleLogin = () => {
    window.location.href = '/';
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
          <div className="login-chat-header">Welcome to Expense Tracker</div>

          <div className="login-chat-body">
            <form onSubmit={handleSubmit}>
              <div className="login-chat-message">
                Log in with your Consumer account to continue
              </div>
              <div className="login-chat-input-container">
                <input
                  type="text"
                  className="login-chat-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login-chat-input-container">
                <input
                  type="password"
                  className="login-chat-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-chat-button-container">
                <button type="submit" className="login-chat-button">
                  Login
                </button>
                <span className="button-spacing"></span>
                <button onClick={handleLogin} type="submit" className="cancel-button">
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
