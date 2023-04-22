import React from "react";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    console.log("Login clicked");
    navigate('/login')
  };

  const handleSignupClick = () => {
    fetch("http://localhost:8080/api/user/create", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error during user creation");
        }
      })
      .then((data) => {
        // Handle success response
        console.log("User created successfully: ", data);
        // Perform any additional actions or UI updates as needed
      })
      .catch((error) => {
        // Handle error response
        console.error("Error during user creation: ", error);
        // Perform any error handling or UI updates as needed
      });
  };
    
  return (
   <div className="login-background">
      <div className="login-container">
        <div className="login-chat-container">
          <div className="login-logo-container">
            <img src="https://pbs.twimg.com/media/EYhrRIGUYAEjmGN.jpg" alt="Expense Tracker Logo" className="login-logo" />
          </div>
          <div className="login-chat-header">Welcome to Expense Tracker</div>
            <button type="submit" className="login-chat-button" onClick={handleLoginClick}> Login </button>
            <button type="submit" className="login-chat-button" onClick={handleSignupClick}> SignUp </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
