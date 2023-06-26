import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../css/AddExpense.css";

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

const AddExpensePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
    employee: ""
  });

  useEffect(() => {
    // Fetch employees on component mount
    getEmployees().then(setEmployees);
  }, []);

  const getEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employee/all");
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
    const adjustedExpenseData = { ...expenseData };
    if (adjustedExpenseData.employee === "") {
      adjustedExpenseData.employee = null;
    } else {
      adjustedExpenseData.employeeIdInt = expenseData.employee
      adjustedExpenseData.employee = null;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adjustedExpenseData),
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
                      <option className="item-value-expense" value={ExpenseCategory.PERSONNELCOSTS} title="Expenses related to salaries, benefits, etc.">Personnel Costs</option>
                      <option className="item-value-expense" value={ExpenseCategory.OPERATIONALCOSTS} title="Day-to-day business expenses like rent, utilities etc.">Operational Costs</option>
                      <option className="item-value-expense" value={ExpenseCategory.PROFESSIONALSERVICES} title="Fees paid for services like legal, accounting, etc.">Professional Services</option>
                      <option className="item-value-expense" value={ExpenseCategory.MARKETINGANDCOMMUNICATION} title="Expenses related to marketing, advertising, public relations, etc.">Marketing and Communication</option>
                      <option className="item-value-expense" value={ExpenseCategory.TRAVELANDENTERTAINMENT} title="Expenses related to business trips, client meetings, entertainment, etc.">Travel and Entertainment</option>
                      <option className="item-value-expense" value={ExpenseCategory.SUBSCRIPTIONSANDFEES} title="Expenses related to business subscriptions like software, memberships, etc.">Subscriptions and Fees</option>
                      <option className="item-value-expense" value={ExpenseCategory.TAXESANDINSURANCE} title="Business taxes, licenses and insurance expenses.">Taxes and Insurance</option>
                      <option className="item-value-expense" value={ExpenseCategory.OTHERS} title="Any other business-related expenses that don't fit into the other categories.">Others</option>
                    </select>
                  </div>
                  {expenseData.category === ExpenseCategory.PERSONNELCOSTS && (
                    <div className="create-chat-input-container">
                      <label>
                        Employee:{" "}
                      </label>
                      <select
                        className="create-chat-input"
                        name="employee"
                        value={expenseData.employee}
                        onChange={handleChange}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
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
