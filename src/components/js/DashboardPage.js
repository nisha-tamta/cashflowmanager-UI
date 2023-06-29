import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NavBar from "./NavBar";
import ExpenseBarGraph from "./ExpenseBarGraph";
import ExpensePieChart from "./ExpensePieChart";
import "../css/HomeScreen.css";
import "../css/NavBar.css";
import "../css/DashboardPage.css";

const DashboardPage = () => {
  const [allReports, setAllReports] = useState([]);
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const location = useLocation();
  const notificationMessage = location.state?.message;
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const [availableMonths, setAvailableMonths] = useState([]);

  // List all months
  const months = Array.from({ length: (year === currentYear ? currentMonth : 12) }, (v, i) => i + 1);

  // List all years from current year to 2000
  const years = Array.from({ length: currentYear - 2000 + 1 }, (v, i) => currentYear - i);

  useEffect(() => {
    if (year === currentYear.toString()) {
      setAvailableMonths(Array.from({ length: currentMonth }, (v, i) => i + 1));
    } else {
      setAvailableMonths(Array.from({ length: 12 }, (v, i) => i + 1));
    }
  }, [year, currentMonth, currentYear]);

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
        <div className="content-user-mngmnt-container">
          <div className="content-header">
            <h1>Dashboards</h1>
            <div className="inline-form">
              <h6>Bring data for </h6>
              <select value={month} onChange={e => setMonth(e.target.value)} className="inline-input">
                <option className="item-value-expense" value={currentMonth}>{currentMonth}</option>
                {availableMonths.map((month, index) => (
                  <option className="item-value-expense" key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select value={year} onChange={e => setYear(e.target.value)} className="inline-input">
                <option className="item-value-expense" value={currentYear}>{currentYear}</option>
                {years.map((year, index) => (
                  <option className="item-value-expense" key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <div className="content-header">
            <div className="buttons-container">
              <button onClick={handleSetBudget} className="add-expense-button">
                Set Budget
              </button>
            </div>
          </div>
          <div className="dashboard-container-box">
            <div className="dashboard-container">
              <ExpenseBarGraph expenses={expenses} />
            </div>
            <div className="dashboard-container">
              <ExpensePieChart/>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default DashboardPage;
