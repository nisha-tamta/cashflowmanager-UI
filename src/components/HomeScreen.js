// HomeScreen.js
import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import BudgetForm from "./BudgetForm";
import SpendingAnalyzer from './SpendingAnalyzer';
import Navbar from "./NavBar"; // Import the Navbar component
import "./HomeScreen.css";
import "./NavBar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpensesPage from "./ExpensesPage";
import DashboardPage from "./DashboardPage";
import AboutPage from "./AboutPage";

const HomeScreen = () => {

    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(0); // Add budget state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual API endpoint and base URL
                const response = await fetch(`http://localhost:8080/api/expenses?userId=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setExpenses(data);
                } else {
                    throw new Error("Failed to fetch expenses");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        // Replace with your actual userId
        const userId = 1; // Replace with your actual userId
        fetchData();
    }, []);

    // Add new expense
    const handleAddExpense = (expense) => {
        fetch("http://localhost:8080/api/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expense),
        })
            .then((response) => response.json())
            .then((data) => setExpenses([...expenses, data]))
            .catch((error) => console.error("Error adding expense:", error));
    };

    // useEffect(() => {
    //     fetch('http://localhost:8080/api/budget')
    //         .then((response) => response.json())
    //         .then((data) => setBudget(data))
    //         .catch((error) => console.error('Error fetching budget:', error));
    // }, []);

    // Function to update the overall budget
    const handleUpdateBudget = (budget) => {
        fetch('http://localhost:8080/api/budget', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(budget),
        })
            .then((response) => response.json())
            .then((data) => setBudget(data))
            .catch((error) => console.error('Error updating budget:', error));
    };

    return (
        <div className="container">
            <Navbar />
        </div>

    );
};

export default HomeScreen;
