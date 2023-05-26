import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ExpenseList from "./ExpenseList";
import "../css/HomeScreen.css";
import "../css/NavBar.css";

const ListExpense = () => {
    const [expenses, setExpenses] = useState([]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         window.location.reload();
    //     }, 60000);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("user")).id;
                const response = await fetch(
                    `http://localhost:8080/api/expenses?userId=${userId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setExpenses(data);
                } else {
                    throw new Error("Failed to fetch expenses");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="homescreen-container">
            <NavBar />
            <div className="content-profile-container">
                <div className="content-header">
                    <h1>Expenses List</h1>
                </div>
                <div className="content-body">
                    <ExpenseList expenses={expenses} />
                </div>
            </div>
        </div>
    );
};

export default ListExpense;
