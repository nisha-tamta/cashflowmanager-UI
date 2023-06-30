import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import "../css/ExpensePieChart.css";

Chart.register(ArcElement, ChartDataLabels);

const ExpensePieChart = (time) => {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const { year, month } = time.time;

  useEffect(() => {
    const fetchExpensesCurrentMonth = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        if (month && year) {
          const response = await fetch(
            `http://192.168.29.40:8080/api/expenses?userId=${userId}&month=${month}&year=${year}`
          );
          const data = await response.json();
          setExpenses(data);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    const fetchExpenses = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const response = await fetch(
          `http://192.168.29.40:8080/api/expenses/all?userId=${userId}`
        );
        const data = await response.json();
        setAllExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpensesCurrentMonth();
    fetchExpenses();
  }, [month, year]);


  // Calculate total for each category
  let categoryTotals = {};
  if (Array.isArray(expenses)) {
    for (let expense of expenses) {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    }
  }

  // Prepare data for the pie chart
  let chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          // you can add your own colors
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB'
        ]
      }
    ]
  };

  const options = {
    plugins: {
      datalabels: {
        color: '#000000',
        font: {
          size: 16
        },
        formatter: function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      {expenses && expenses.length > 0 ? (
        <Pie data={chartData} options={options} />
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

export default ExpensePieChart;
