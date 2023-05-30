import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../css/AddExpense.css";

// Enum for categories
const ExpenseCategory = {
  FOOD: "Food",
  RENT: "Rent",
  TRAVEL: "Travel",
  ENTERTAINMENT: "Entertainment",
};

const AddExpensePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    date: "",
    description: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setExpenseData(JSON.stringify(data));
        navigate("/expenses");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to login. Please try again later.");
    }
  };

  const handleCancel = () => {
    navigate("/expenses");
  };

  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        <div className="content-profile-container">
          <div className="content-header">
            <h1>Add Expense</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="add-expense-content">
              <form onSubmit={handleSubmit}>
                <label>
                  Category:
                  <select
                    name="category"
                    value={expenseData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value={ExpenseCategory.FOOD}>Food</option>
                    <option value={ExpenseCategory.RENT}>Rent</option>
                    <option value={ExpenseCategory.TRAVEL}>Travel</option>
                    <option value={ExpenseCategory.ENTERTAINMENT}>Entertainment</option>
                  </select>
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={expenseData.description}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Amount:
                  <input
                    type="number"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={expenseData.date}
                    onChange={handleChange}
                  />
                </label>
                <div className="add-expense-buttons">
                  <button type="submit" className="reset-password-form-button">Add Expense</button>
                  <button type="button" className="reset-password-form-button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
