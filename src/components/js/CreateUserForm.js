import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/CreateUserForm.css";

const CreateUserForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    username: "",
    password: "",
    phoneNumber: "",
    defaultBudget: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    // Perform form validation if needed

    // Call the createUser API endpoint
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
          throw new Error("Error during user creation");
        }
      })
      .then((data) => {
        console.log("User created successfully: ", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during user creation: ", error);
        // Perform any error handling or UI updates as needed
      });
  };

  return (
    <div className="homescreen-container">
      <div className="content-container">
        <div className="content-header">
          <h1>Create User</h1>
          <div className="add-expense-content">
            <form>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />

              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />

              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
              />

              <label htmlFor="emailAddress">Email</label>
              <input
                type="text"
                id="emailAddress"
                name="emailAddress"
                value={user.emailAddress}
                onChange={handleChange}
              />

              <label htmlFor="phoneNumber">Phone number</label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
              />

              <label htmlFor="defaultBudget">Default budget</label>
              <input
                type="number"
                id="defaultBudget"
                name="defaultBudget"
                value={user.defaultBudget}
                onChange={handleChange}
              />

              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />

              {/* Add more input fields as needed */}
              {/* Add form validation and error handling as needed */}
              {/* Add submit button or use onClick on a button as needed */}
            </form>
            <div className="add-expense-buttons">
              <button onClick={handleSubmit} className="reset-password-form-button" >
                Create User
              </button>
              <Link to="/login">Go to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
