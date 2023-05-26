import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../css/AddExpense.css";

const SetBudget = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [budget, setBudget] = useState({
    month: "",
    amount: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudget({
      ...budget,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
          `http://localhost:8080/api/budget?userId=${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(budget),
          }
      );

      if (response.ok) {
        const data = await response.json();
        setBudget(JSON.stringify(data));
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to login. Please try again later.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const nextThreeMonths = [
    { id: 0, name: Month[currentMonth] },
    { id: 1, name: Month[(currentMonth + 1) % 12] },
    { id: 2, name: Month[(currentMonth + 2) % 12] }
  ];

  return (
      <div className="homescreen-container">
        <NavBar />
        <div className="content-profile-container">
          <div className="content-header">
            <h1>Set Budget</h1>
            <div className="add-expense-content">
              <form onSubmit={handleSubmit}>
                <label>
                  Month:
                  <select
                      name="month"
                      value={budget.month}
                      onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {nextThreeMonths.map((month) => (
                        <option key={month.id} value={month.name}>
                          {month.name}
                        </option>
                    ))}
                  </select>
                </label>
                <label>
                  Amount:
                  <input
                      type="number"
                      name="amount"
                      value={budget.amount}
                      onChange={handleChange}
                  />
                </label>
                <div className="add-expense-buttons">
                  <button type="submit" className="reset-password-form-button">Set</button>
                  <button type="button" className="reset-password-form-button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

const Month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default SetBudget;
