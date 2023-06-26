import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NavBar from "./NavBar";
import ExpenseBarGraph from "./ExpenseBarGraph";
import ExpenseList from "./ExpenseList";
import "../css/HomeScreen.css";
import "../css/NavBar.css";
import "../css/DashboardPage.css";

const DashboardPage = () => {
  const [allReports, setAllReports] = useState([]);
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState("thisMonth");
  const location = useLocation();
  const notificationMessage = location.state?.message;
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);

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

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const response = await fetch(
          `http://localhost:8080/api/reports/all?userId=${userId}`
        );
        const data = await response.json();
        setAllReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  const handleSetBudget = () => {
    navigate("/budget/set");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleClearMessage = () => {
    setIsNotificationVisible(false);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        {notificationMessage && isNotificationVisible &&
          <div className="notification-message alert-success">
            {notificationMessage}
            <button onClick={handleClearMessage} className="close-button">
              <FontAwesomeIcon icon={faTimes} style={{ color: 'green' }} />
            </button>
          </div>
        }
        <div className="content-chat-container">
          <div className="content-header">
            <h1>Dashboards</h1>
          </div>
          <div className="content-profile-container">
            <div className="content-header">
              <div className="buttons-container">
                <button
                  onClick={handleSetBudget}
                  className="add-expense-button"
                >
                  Set Budget
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
              </div>
            </div>

            <div className="expense-list-container">
              {activeTab === "thisMonth" ? (
                <ExpenseBarGraph expenses={expenses} />
              ) : (
                <ExpenseList expenses={allExpenses} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
