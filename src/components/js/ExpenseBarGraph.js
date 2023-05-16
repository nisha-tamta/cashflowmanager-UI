import React, { useState, useEffect } from "react";

const ExpenseBarGraph = ({ expenses }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const [error, setError] = useState("");
  const [budget, setBudget] = useState({
    month: "",
    amount: "",
  });
  const [amount, setAmount] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  useEffect(() => {
    const fetchReports = async (e) => {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      try {
        const response = await fetch(
          `http://localhost:8080/api/budget/current?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBudget(JSON.stringify(data));
          setAmount(data.amount)
          setMaxExpense(data.amount / 10);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError("Failed to login. Please try again later.");
      }
    };
    fetchReports();
  }, []);

  const expensesByDay = filteredExpenses.reduce((acc, expense) => {
    const expenseDate = new Date(expense.date);
    const expenseDay = expenseDate.getDate();
    if (!acc[expenseDay]) {
      acc[expenseDay] = 0;
    }
    acc[expenseDay] += expense.amount;
    return acc;
  }, {});

  const data = [];
  for (let i = 1; i <= daysInMonth; i++) {
    data.push({ day: i, expense: expensesByDay[i] || 0 });
  }

  const maxBudget = amount;
  const budgetInterval = maxBudget / 10;
  
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "24px", width: "100%", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "200px", marginRight: "16px" }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ fontSize: "12px", fontWeight: "bold", textAlign: "right" }}>{budgetInterval * (10 - i)}</div>
        ))}
      </div>
      {data.map((d) => (
        <div key={d.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "1px", flex: "1 0 0" }}>
          <div style={{ height: `${(d.expense / maxExpense)*20}px`, width: "16px", background: "#29b6f6", borderRadius: "4px" }} />
          <div style={{ marginTop: "8px", fontSize: "12px", fontWeight: "bold" }}>{d.day}</div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseBarGraph;
