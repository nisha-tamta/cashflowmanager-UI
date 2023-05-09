import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import ReportList from "./ReportList";
import "../css/HomeScreen.css";
import "../css/NavBar.css";
import "../css/BudgetPage.css";

const BudgetPage = () => {
  const navigate = useNavigate();
  const [allReports, setAllReports] = useState([]);
  const [activeTab, setActiveTab] = useState("allReports");

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

  return (
    <div className="homescreen-container">
      <NavBar />
      <div className="content-container">
        <div className="content-header">
          <h1>Reports</h1>
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
            className={`tab-item ${activeTab === "allReports" ? "active" : ""}`}
            onClick={() => handleTabChange("allReports")}
          >
            This Year
          </div>
        </div>

        <div className="expense-list-container">
          {activeTab === "allReports" && <ReportList reports={allReports} />}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
