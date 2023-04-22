import React, { useState } from "react";

const CreateUserForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    // Perform form validation if needed

    // Call the createUser API endpoint
    fetch("/create", {
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
    <div>
      <h2>Create User</h2>
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

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        {/* Add more input fields as needed */}
        {/* Add form validation and error handling as needed */}
        {/* Add submit button or use onClick on a button as needed */}
      </form>
      <button onClick={handleSubmit}>Create User</button>
    </div>
  );
};

export default CreateUserForm;
