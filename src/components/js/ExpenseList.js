import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ExpenseList.css";

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterAmountType, setFilterAmountType] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [editedExpenseValue, setEditedExpenseValue] = useState({
    date: "",
    category: "",
    description: "",
    amount: ""
  });

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
    setEditedExpenseValue({
      date: expenses.find((expense) => expense.id === expenseId).date,
      category: expenses.find((expense) => expense.id === expenseId).category,
      description: expenses.find((expense) => expense.id === expenseId).description,
      amount: expenses.find((expense) => expense.id === expenseId).amount,
    });
  };

  const handleSaveExpense = async (expenseId) => {
    // Create a new array with the updated expense
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === expenseId) {
        return { ...expense, ...editedExpenseValue };
      }
      return expense;
    });

    // Find the updated expense to send to the server
    const updatedExpense = updatedExpenses.find((expense) => expense.id === expenseId);

    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses/${expenseId}?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (response.ok) {
        navigate("/expenses");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to update the expense. Please try again later.");
    }

    // Clear the selectedExpenseId and editedExpenseValue state variables
    setSelectedExpenseId(null);
    setEditedExpenseValue("");

    // Update the expenses state with the new array of expenses
    onEditExpense(updatedExpense);
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
                {selectedExpenseId === expense.id ? (
                  <input
                    className="item-value-expense-edit"
                    type="date"
                    value={editedExpenseValue.date}
                    onChange={(e) =>
                      setEditedExpenseValue({ ...editedExpenseValue, date: e.target.value })
                    }
                  />
                ) : (
                  new Date(expense.date).toLocaleDateString()
                )}
              </td>
              <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                {selectedExpenseId === expense.id ? (
                  <select
                    className="item-value-expense-edit"
                    value={editedExpenseValue.category}
                    onChange={(e) =>
                      setEditedExpenseValue({ ...editedExpenseValue, category: e.target.value })
                    }
                  >
                    <option className="item-value-expense-edit" value="Food">Food</option>
                    <option className="item-value-expense-edit" value="Rent">Rent</option>
                    <option className="item-value-expense-edit" value="Travel">Travel</option>
                    <option className="item-value-expense-edit" value="Entertainment">Entertainment</option>
                  </select>
                ) : (
                  expense.category
                )}
              </td>
              <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                {selectedExpenseId === expense.id ? (
                  <input
                    className="item-value-expense-edit"
                    type="text"
                    value={editedExpenseValue.description}
                    onChange={(e) =>
                      setEditedExpenseValue({ ...editedExpenseValue, description: e.target.value })
                    }
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                {selectedExpenseId === expense.id ? (
                  <input
                    className="item-value-expense-edit"
                    type="number"
                    value={editedExpenseValue.amount}
                    onChange={(e) =>
                      setEditedExpenseValue({ ...editedExpenseValue, amount: e.target.value })
                    }
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