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

  const handleDeleteExpense = (id) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    setAllExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    setFilteredExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };  

  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        <div className="content-container">
          <div className="content-header">
            <h1>Expenses</h1>
            <h6>Info about your expenses</h6>
          </div>
          <button onClick={handleAddExpense} className="reset-password-button" > Add Expense </button>
          <div className="content-chat-container">
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
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
              ) : activeTab === "allExpenses" ? (
                <ExpenseList expenses={allExpenses} onDeleteExpense={handleDeleteExpense} />
              ) : (
                activeTab === "betweenDates" && (
                  <div>
                    <div className="filter-container">
                      <label className="item-label-expense" htmlFor="start-date">Start Date {" "}</label>
                      <input
                        className="item-value-expense"
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                      <span className="label-spacing"></span>
                      <label className="item-label-expense" htmlFor="end-date">End Date{" "}</label>
                      <input
                        className="item-value-expense"
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                      <span className="label-spacing"></span>
                      <button className="submit-button" onClick={handleFilterExpenses}>Submit</button>
                    </div>
                    <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;