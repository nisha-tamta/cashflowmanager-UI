import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import ExpenseList from "./ExpenseList";
import "../css/HomeScreen.css";
import "../css/NavBar.css";
import "../css/ExpensesPage.css";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeTab, setActiveTab] = useState("thisMonth");

  useEffect(() => {
    const fetchExpensesCurrentMonth = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const response = await fetch(
          `http://localhost:8080/api/expenses?userId=${userId}&month=${currentMonth}&year=${currentYear}`
        );
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    const fetchExpenses = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const response = await fetch(
          `http://localhost:8080/api/expenses/all?userId=${userId}`
        );
        const data = await response.json();
        setAllExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpensesCurrentMonth();
    fetchExpenses();
  }, []);

  const handleAddExpense = () => {
    navigate("/expenses/add");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFilterExpenses = () => {
    const filteredExpenses = allExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate >= new Date(startDate) &&
        expenseDate <= new Date(endDate)
      );
    });
    setFilteredExpenses(filteredExpenses);
  };

  return (
    <div className="homescreen-container">
      <NavBar />
      <div className="content-container">
        <div className="content-header">
          <h1>Expenses</h1>
        </div>
        <div className="content-profile-container">
          <div className="content-header">
            <div className="buttons-container">
              <button
                onClick={handleAddExpense}
                className="add-expense-button"
              >
                Add Expense
              </button>
            </div>
          </div>
          <div className="tab-container">
            <div
              className={`tab-item ${activeTab === "thisMonth" ? "active" : ""
                }`}
              onClick={() => handleTabChange("thisMonth")}
            >
              This Month
            </div>
            <div
              className={`tab-item ${activeTab === "allExpenses" ? "active" : ""
                }`}
              onClick={() => handleTabChange("allExpenses")}
            >
              All Time
            </div>
            <div
              className={`tab-item ${activeTab === "betweenDates" ? "active" : ""
                }`}
              onClick={() => handleTabChange("betweenDates")}
            >
              Date Range
            </div>
          </div>

          <div className="expense-list-container">
            {activeTab === "thisMonth" ? (
              <ExpenseList expenses={expenses} />
            ) : activeTab === "allExpenses" ? (
              <ExpenseList expenses={allExpenses} />
            ) : (
              activeTab === "betweenDates" && (
                <div>
                  <div className="filter-container">
                    <label htmlFor="start-date">Start Date:</label>
                    <input
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                    <label htmlFor="end-date">End Date:</label>
                    <input
                      type="date"
                      id="end-date"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                    <button onClick={handleFilterExpenses}>Filter</button>
                  </div>
                  <ExpenseList expenses={filteredExpenses} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;