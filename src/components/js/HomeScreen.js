import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "../css/HomeScreen.css";
import "../css/NavBar.css";

const HomeScreen = () => {

    const [budget, setBudget] = useState(0); // Add budget state

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
      <div className="homescreen-container">
        <Navbar />
        <div className="content-container">
          <div className="content-header">
            <h1>At Home Screen</h1>
          </div>
          <div className="content-body">
          </div>
        </div>
      </div>
    );

};

export default HomeScreen;
