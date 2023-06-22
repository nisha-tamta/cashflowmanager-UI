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
          method: "POST",
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
            <div className="create-chat-body">
              {error && <div className="error-message">{error}</div>}
              <div >
                <form onSubmit={handleSubmit}>
                  <div className="create-chat-input-container">
                    <label>
                      Category:{" "}
                    </label>
                    <select
                      className="create-chat-input"
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
                  </div>
                  <div className="create-chat-input-container">
                    <label>
                      Description:{" "}
                    </label>
                    <input
                      className="create-chat-input"
                      type="text"
                      name="description"
                      value={expenseData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="create-chat-input-container">
                    <label>
                      Amount:{" "}
                    </label>
                    <input
                      className="create-chat-input"
                      type="number"
                      name="amount"
                      value={expenseData.amount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="create-chat-input-container">
                    <label >
                      Date:{" "}
                    </label>
                    <input
                      className="create-chat-input"
                      type="date"
                      name="date"
                      value={expenseData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="add-expense-buttons">
                    <button type="submit" className="create-chat-button">Add Expense</button>
                    <span className="button-spacing"></span>
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
