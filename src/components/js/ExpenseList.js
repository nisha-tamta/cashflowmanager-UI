import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faSave, faSdCard } from '@fortawesome/free-solid-svg-icons'
import "../css/ExpenseList.css";

const DeleteExpenseEdit = ({ onConfirm, onCancel, error }) => {
  return (
    <div className="confirmation-overlay-profile">
      <div className="confirmation-dialog-profile">
        <div className="create-chat-container">
          <div className="create-chat-header">
            <h2>Are you sure you want to delete this expense?</h2>
          </div>
          <div className="create-chat-body-profile">
            <div>
              <form onSubmit={onConfirm}>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-button-containers">
                  <button type="submit" className="cancel-button" onClick={onConfirm}>Delete</button>
                  <span className="button-spacing"></span>
                  <button className="login-chat-button" onClick={onCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterAmountType, setFilterAmountType] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [editedExpenseValue, setEditedExpenseValue] = useState({
    date: "",
    category: "",
    description: "",
    amount: ""
  });
  const [showDeleteExpenseEdit, setShowDeleteExpenseEdit] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState(false);

  // Enum for categories
  const ExpenseCategory = {
    PERSONNELCOSTS: "Personnel Costs",
    OPERATIONALCOSTS: "Operational Costs",
    PROFESSIONALSERVICES: "Professional Services",
    MARKETINGANDCOMMUNICATION: "Marketing and Communication",
    TRAVELANDENTERTAINMENT: "Travel and Entertainment",
    SUBSCRIPTIONSANDFEES: "Subscriptions and Fees",
    TAXESANDINSURANCE: "Taxes and Insurance",
    OTHERS: "Others"
  };

  useEffect(() => {
    // Fetch employees on component mount
    getEmployees().then(setEmployees);
  }, []);

  const getEmployees = async () => {
    try {
      const response = await fetch("http://192.168.29.40:8080/api/employee/all");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Error during getting Employees");
      }
    } catch (error) {
      console.error("Error during getting Employees: ", error);
      return [];
    }
  };

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
    const expense = expenses.find((expense) => expense.id === expenseId);
    setEditedExpenseValue({
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      employee: expense.employee
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
        `http://192.168.29.40:8080/api/expenses/${expenseId}?userId=${userId}`,
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

  // Handle clicking on the row, but not on the actions
  const handleRowClick = (event, expenseId) => {
    // Check if the user clicked on an action button or the action cell
    if (event.target.closest('.button-expense-edit-save, .button-expense-edit-cancel, .button-edit-expense, .button-delete-expense')) {
      // If they did, don't do anything
      event.stopPropagation();
    } else {
      // If they didn't, navigate to the expense details
      navigate(`/expenses/${expenseId}`);
    }
  };

  const handleDeleteExpense = (expenseId) => {
    setShowDeleteExpenseEdit(true);
    setDeleteExpenseId(expenseId);
  };

  const handleDeleteExpenseEdit = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
        `http://192.168.29.40:8080/api/expenses/${deleteExpenseId}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setError(null);
        setShowDeleteExpenseEdit(false);
      } else {
        return response.text().then(errorText => {
          setError(errorText || "Error during delete expense");
        });
      }
    } catch (error) {
      setError(error.message);
    }
    window.location.href = '/expenses';
  };

  const handleCancelDeleteExpenseEdit = () => {
    setError(null);
    setShowDeleteExpenseEdit(false);
    window.location.href = '/expenses';
  };

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
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id} style={{ border: "1px solid black", cursor: "pointer" }} onClick={(event) => handleRowClick(event, expense.id)}>
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
                    <option className="item-value-expense" value="">Select Category</option>
                    <option className="item-value-expense" value={ExpenseCategory.PERSONNELCOSTS} title="Expenses related to salaries, benefits, etc.">Personnel Costs</option>
                    <option className="item-value-expense" value={ExpenseCategory.OPERATIONALCOSTS} title="Day-to-day business expenses like rent, utilities etc.">Operational Costs</option>
                    <option className="item-value-expense" value={ExpenseCategory.PROFESSIONALSERVICES} title="Fees paid for services like legal, accounting, etc.">Professional Services</option>
                    <option className="item-value-expense" value={ExpenseCategory.MARKETINGANDCOMMUNICATION} title="Expenses related to marketing, advertising, public relations, etc.">Marketing and Communication</option>
                    <option className="item-value-expense" value={ExpenseCategory.TRAVELANDENTERTAINMENT} title="Expenses related to business trips, client meetings, entertainment, etc.">Travel and Entertainment</option>
                    <option className="item-value-expense" value={ExpenseCategory.SUBSCRIPTIONSANDFEES} title="Expenses related to business subscriptions like software, memberships, etc.">Subscriptions and Fees</option>
                    <option className="item-value-expense" value={ExpenseCategory.TAXESANDINSURANCE} title="Business taxes, licenses and insurance expenses.">Taxes and Insurance</option>
                    <option className="item-value-expense" value={ExpenseCategory.OTHERS} title="Any other business-related expenses that don't fit into the other categories.">Others</option>
                  </select>
                ) : (
                  expense.category
                )}
              </td>
              {/* {selectedExpenseId === expense.id ? (
                expense.category === ExpenseCategory.PERSONNELCOSTS ? (
                  <select
                    className="item-value-expense-edit"
                    value={editedExpenseValue.employee ? editedExpenseValue.employee.id : ""}
                    onChange={(e) => {
                      const selectedEmployee = employees.find((employee) => employee.id === parseInt(e.target.value));
                      setEditedExpenseValue((prevValue) => ({
                        ...prevValue,
                        employee: selectedEmployee
                      }));
                    }}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                ) : null
              ) : null} */}
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
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <span className="button-spacing"></span>
                  <button className="button-expense-edit-cancel" onClick={() => handleCancelEditExpense()}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="button-edit-expense" onClick={() => handleEditExpense(expense.id)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                  <span className="button-spacing"></span>
                  <button className="button-delete-expense" onClick={() => handleDeleteExpense(expense.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  {showDeleteExpenseEdit &&
                        <DeleteExpenseEdit
                          onConfirm={handleDeleteExpenseEdit}
                          onCancel={handleCancelDeleteExpenseEdit}
                          error={error}
                        />
                      }
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