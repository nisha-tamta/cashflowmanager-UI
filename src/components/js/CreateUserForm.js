import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateUserForm.css";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    username: "",
    password: "",
    phoneNumber: "",
    defaultBudget: "",
    roleIdInt: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = () => {
    if (user.password !== confirmPassword) {  // Checking if passwords match
      setError("Passwords do not match");
      return;
    }
    fetch("http://localhost:8080/api/user/create", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(errorText => {
            throw new Error(errorText || "Error during user creation");
          });
        }
      })
      .then((data) => {
        console.log("User created successfully: ", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during user creation: ", error);
        setError(error.message);
      });
    // navigate("/login");
  };

  const handleLogin = () => {
    window.location.href = '/';
  };

  return (
    <div className="create-background">
      <div className="create-container">
        <div className="create-chat-container">
          <div className="create-logo-container">
            <img
              src="https://pbs.twimg.com/media/EYhrRIGUYAEjmGN.jpg"
              alt="Expense Tracker Logo"
              className="create-logo"
            />
          </div>
          <div className="create-chat-header">Create Consumer account</div>
          <div className="create-chat-body">
            <div >
              <form>
                {<div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label >Role</label>
                  <select
                    className="create-chat-input"
                    name="roleIdInt"
                    value={user.roleIdInt}
                    onChange={handleChange}
                  >
                    <option className="item-value-expense" value="1">Admin</option>
                    <option className="item-value-expense" value="2">Manager</option>
                    <option className="item-value-expense" value="3">Employee</option>
                  </select>
                </div>
                <div className="create-chat-input-container">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    className="create-chat-input"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    className="create-chat-input"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label htmlFor="username">Username</label>
                  <input
                    className="create-chat-input"
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label htmlFor="emailAddress">Email</label>
                  <input
                    className="create-chat-input"
                    type="text"
                    id="emailAddress"
                    name="emailAddress"
                    value={user.emailAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    className="create-chat-input"
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label htmlFor="password">Password</label>
                  <input
                    className="create-chat-input"
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="create-chat-input"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
              </form >
              <div className="create-chat-button-containers">
                <button onClick={handleSubmit} className="create-chat-button" >
                  Create User
                </button>
                <span className="button-spacing"></span>
                <button onClick={handleLogin} type="submit" className="cancel-button">
                  Back
                </button>
              </div>
            </div >
          </div >
        </div >
      </div >
    </div >
  );
};

export default CreateUserForm;
