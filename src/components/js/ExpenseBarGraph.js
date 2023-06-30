import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import "../css/ExpenseBarGraph.css";

Chart.register(CategoryScale, LinearScale, BarElement);

const ExpenseBarGraph = ({ time }) => {
  const [expenses, setExpenses] = useState([]);
  const { year, month } = time || {};

  useEffect(() => {
    if (year && month) {
      const fetchExpenses = async () => {
        try {
          const userId = JSON.parse(localStorage.getItem("user")).id;
          const response = await fetch(
            `http://192.168.29.40:8080/api/expenses?userId=${userId}&month=${month}&year=${year}`
          );
          const data = await response.json();
          setExpenses(data);
        } catch (error) {
          console.error("Error fetching expenses:", error);
        }
      };
      fetchExpenses();
    }
  }, [year, month]);

  // Calculate total expenses per day
  const expensesPerDay = {};
  for (let expense of expenses) {
    const date = new Date(expense.date);
    const day = date.getDate();
    if (!expensesPerDay[day]) {
      expensesPerDay[day] = 0;
    }
    expensesPerDay[day] += expense.amount;
  }

  // Generate array of all days in the month
  const daysInMonth = new Date(year, month - 1, 0).getDate();
  const allDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Prepare data for the bar graph
  const chartData = {
    labels: allDays,
    datasets: [
      {
        label: 'Expenses',
        data: allDays.map(day => expensesPerDay[day]),
        backgroundColor: '#FF6384',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      {expenses && expenses.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div className="no-expenses">
          <div className="no-expenses-icon">
            <FontAwesomeIcon icon={faBan} size="8x" color="green" />
          </div>
          <div className="no-expenses-text">No Expenses</div>
        </div>
      )}
    </div>
  );
};

export default ExpenseBarGraph;
