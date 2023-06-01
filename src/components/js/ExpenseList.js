import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ExpenseList.css";

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterAmountType, setFilterAmountType] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [editedExpenseValue, setEditedExpenseValue] = useState("");

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleFilterAmountChange = (e) => {
    setFilterAmount(e.target.value);
  };

  const handleFilterAmountTypeChange = (e) => {
    setFilterAmountType(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleEditExpense = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setEditedExpenseValue(expenses.find((expense) => expense.id === expenseId).amount);
  };

  const handleSaveExpense = async (expenseId) => {
    // Update the amount of the selected expense in the expenses array
    const updatedExpenses = expenses.find((expense) => {
      if (expense.id === expenseId) {
        expense.amount = editedExpenseValue;
        return { ...expense, amount: editedExpenseValue };
      }
      return expense;
    });

    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpenses),
        }
      );

      if (response.ok) {
        navigate("/expenses");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to login. Please try again later.");
    }

    // Update the expenses prop with the new array of expenses
    // and clear the selectedExpenseId and editedExpenseValue state variables
    setSelectedExpenseId(null);
    setEditedExpenseValue("");
    expenses = updatedExpenses;
    navigate("/expenses");
  };

  const handleCancelEditExpense = () => {
    setSelectedExpenseId(null);
    setEditedExpenseValue("");
  };

  const handleDeleteExpense = async (expenseId) => {
    // You might want to ask the user to confirm the deletion
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }
  
    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses/${expenseId}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        onDeleteExpense(expenseId);
        navigate("/expenses");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    switch (sortColumn) {
      case "date":
        return multiplier * (new Date(a.date) - new Date(b.date));
      case "category":
        return multiplier * a.category.localeCompare(b.category);
      case "description":
        return multiplier * a.description.localeCompare(b.description);
      case "amount":
        return multiplier * (a.amount - b.amount);
      default:
        return 0;
    }
  });

  const filteredExpenses = sortedExpenses.filter(
    (expense) =>
      expense.category
        .toLowerCase()
        .includes(filterCategory.toLowerCase()) &&
      (filterAmountType === "" ||
        filterAmount === "" ||
        (filterAmountType === "greaterThan" &&
          expense.amount > parseInt(filterAmount)) ||
        (filterAmountType === "lessThan" &&
          expense.amount < parseInt(filterAmount)))
  );

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label className="item-label-expense" >Category{" "}</label>
        <input
          className="item-value-expense"
          type="text"
          value={filterCategory}
          onChange={handleFilterCategoryChange}
        />
        <span className="label-spacing"></span>
        <label className="item-label-expense" >Amount{" "}</label>
        <select className="item-value-expense" value={filterAmountType} onChange={handleFilterAmountTypeChange} >
          <option className="item-value-expense" value="">-- Select filter type --</option>
          <option className="item-value-expense" value="greaterThan">Greater Than</option>
          <option className="item-value-expense" value="lessThan">Less Than</option>
        </select>{" "}
        <input
          className="item-value-expense"
          type="number"
          value={filterAmount}
          onChange={handleFilterAmountChange}
        />
      </div>
      <table className="table-expense">
        <thead>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("date")}
            >
              Date {sortColumn === "date" && sortDirection === "asc" && "▲"}
              {sortColumn === "date" && sortDirection === "desc" && "▼"}
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("category")}
            >
              Category {sortColumn === "category" && sortDirection === "asc" && "▲"}
              {sortColumn === "category" && sortDirection === "desc" && "▼"}
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("description")}
            >
              Description {sortColumn === "description" && sortDirection === "asc" && "▲"}
              {sortColumn === "description" && sortDirection === "desc" && "▼"}
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("amount")}
            >
              Amount {sortColumn === "amount" && sortDirection === "asc" && "▲"}
              {sortColumn === "amount" && sortDirection === "desc" && "▼"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id} style={{ border: "1px solid black" }}>
              <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                {expense.category}
              </td>
              <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                {expense.description}
              </td>
              <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                {selectedExpenseId === expense.id ? (
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={editedExpenseValue}
                    onChange={(e) => setEditedExpenseValue(e.target.value)}
                  />
                ) : (
                  expense.amount
                )}
              </td>
              {selectedExpenseId === expense.id ? (
                <>
                  <button className="button-expense-edit-save" onClick={() => handleSaveExpense(expense.id)}>
                    Save
                  </button>
                  <span className="button-spacing"></span>
                  <button className="button-expense-edit-cancel" onClick={() => handleCancelEditExpense()}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="button-edit-expense" onClick={() => handleEditExpense(expense.id)}>
                    Edit
                  </button>
                  <span className="button-spacing"></span>
                  <button className="button-delete-expense" onClick={() => handleDeleteExpense(expense.id)}>
                    Delete
                  </button>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;