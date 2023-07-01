import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../css/AddExpense.css";

const SetBudget = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [budget, setBudget] = useState({
    month: "",
    year: new Date().getFullYear(),
    amount: "",
  });
  const [notification, setNotification] = useState({ message: "", visible: false });
  const today = new Date();
  const currentMonth = today.getMonth();
  const nextThreeMonths = [
    { number: currentMonth, name: Month[currentMonth] },
    { number: (currentMonth + 1) % 12, name: Month[(currentMonth + 1) % 12] },
    { number: (currentMonth + 2) % 12, name: Month[(currentMonth + 2) % 12] }
];
  
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setBudget({
      ...budget,
      [name]: value,
    });

    // Send API call to fetch budget for the selected month and year
    if (name === "month" && value !== "") {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const monthNumber = nextThreeMonths.find((month) => month.name === value).number + 1;
      const response = await fetch(
        `http://localhost:8080/api/budget/time?userId=${userId}&month=${monthNumber}&year=${budget.year}`
      );
      if (response.ok) {
        const budgetData = await response.json();
        setBudget((prevBudget) => ({
          ...prevBudget,
          amount: budgetData.amount,
        }));
      } else {
        setError("Failed to fetch budget data.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/budget?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(budget),
        }
      );

      if (response.ok) {
        setBudget({
          month: "",
          year: "",
          amount: ""
        });
        setNotification({ message: 'Budget set!', visible: true });
        navigate("/dashboard", { state: { message: 'Budget set!' } });
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to login. Please try again later.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        <div className="content-profile-container">
          {notification.visible &&
            <div className="notification-message alert-success">
              {notification.message}
              <span className="close-button" onClick={() => setNotification({ ...notification, visible: false })}>
                <FontAwesomeIcon icon={faTimes} style={{ color: 'green' }} />
              </span>
            </div>
          }
          <div className="content-header">
            <h1>Set Budget</h1>
            <div className="create-chat-body">
              <form onSubmit={handleSubmit}>
                <div className="create-chat-input-container">
                  <label> Month </label>
                  <select
                    className="create-chat-input"
                    name="month"
                    value={budget.month}
                    onChange={handleChange}
                  >
                    <option className="item-value-expense" value="">Select</option>
                    {nextThreeMonths.map((month) => (
                      <option key={month.id} value={month.name}>
                        {month.name} {new Date().getFullYear()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="create-chat-input-container">
                  <label> Amount </label>
                  <input
                    className="create-chat-input"
                    type="number"
                    name="amount"
                    value={budget.amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="add-expense-buttons">
                  <button type="submit" className="create-chat-button" >Set</button>
                  <span className="button-spacing"></span>
                  <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default SetBudget;