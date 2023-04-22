// LoginScreen.js
import React, { useEffect, useState } from "react";
import "./LoginScreen.css"; // Import CSS file for LoginScreen

const LoginScreen = ({onLoginSuccess}) => {
  console.log("hi");
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0); // Add budget state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic
    try {
      // Make API call to backend server to authenticate user
      const response = await fetch(`http://localhost:8080/api/user/login?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Successful login
        onLoginSuccess();
      } else {
        // Handle error response
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      // Handle network or server error
      setError('Failed to login. Please try again later.');
    }
  };


    useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint and base URL
        const response = await fetch(`http://localhost:8080/api/expenses?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setExpenses(data);
        } else {
          throw new Error("Failed to fetch expenses");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    // Replace with your actual userId
    const userId = 1; // Replace with your actual userId
    fetchData();
  }, []);

  return (
    <div className="login-background">
    <div className="login-container">
      <div className="login-chat-container">
        <div className="login-logo-container">
          <img src="https://pbs.twimg.com/media/EYhrRIGUYAEjmGN.jpg" alt="Expense Tracker Logo" className="login-logo" />
        </div>
        <div className="login-chat-header">Welcome to Expense Tracker</div>
        <div className="login-chat-body">
          <form onSubmit={handleSubmit}>
            <div className="login-chat-message">Log in with your Consumer account to continue</div>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default LoginScreen;
