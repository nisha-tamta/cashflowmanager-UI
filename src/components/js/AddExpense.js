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
      setError(error.message);
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
          </div>
          <div className="add-expense-content">
            {error && <div className="error-message">{error}</div>}
            <div >
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="item-label-expense">
                    Category:{" "}
                    <select
                      className="item-value-expense"
                      name="category"
                      value={expenseData.category}
                      onChange={handleChange}
                    >
                      <option className="item-value-expense" value="">Select Category</option>
                      <option className="item-value-expense" value={ExpenseCategory.FOOD}>Food</option>
                      <option className="item-value-expense" value={ExpenseCategory.RENT}>Rent</option>
                      <option className="item-value-expense" value={ExpenseCategory.TRAVEL}>Travel</option>
                      <option className="item-value-expense" value={ExpenseCategory.ENTERTAINMENT}>Entertainment</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="item-label-expense">
                    Description:{" "}
                    <input
                      className="item-value-expense"
                      type="text"
                      name="description"
                      value={expenseData.description}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <label className="item-label-expense">
                    Amount:{" "}
                    <input
                      className="item-value-expense"
                      type="number"
                      name="amount"
                      value={expenseData.amount}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <label className="item-label-expense">
                    Date:{" "}
                    <input
                      className="item-value-expense"
                      type="date"
                      name="date"
                      value={expenseData.date}
                      onChange={handleChange}
                    />
                  </label>
                </div>
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
