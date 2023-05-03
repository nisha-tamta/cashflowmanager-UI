import React from "react";
import '../css/NavBar.css';
import NavBar from "./NavBar";

const AboutPage = () => {
  return (
    <div className="homescreen-container">
      <NavBar />
      <div className="content-container">
        <div className="content-header">
          <h1 style={{ display: 'flex', alignItems: 'center' }}>
            About Expense Tracker..
            <div className="login-logo-container">
              <img
                src="https://pbs.twimg.com/media/EYhrRIGUYAEjmGN.jpg"
                alt="Expense Tracker Logo"
                className="login-logo"
              />
            </div>
          </h1>
          <p>The problem that the Expense Tracker project aims to address is the need for an efficient and user-friendly solution to manage and track personal expenses. Many individuals struggle with keeping track of their expenses, budgeting their finances, and understanding their spending patterns. This can lead to financial stress, overspending, and difficulty in achieving financial goals.</p>
          <p>The Expense Tracker project aims to provide a solution by offering a web-based application that allows users to easily track their expenses, set budgets, and analyze their spending patterns. The application will provide features such as expense entry, expense categorization, budget setting, budget tracking, expense filtering and searching, and spending analysis reports. It will also provide user authentication and authorization to ensure data privacy and security.</p>
          <p>The problem is further exacerbated by the lack of visually appealing and user-friendly expense tracking applications that cater to the specific needs of users. Many existing solutions may be complex, overwhelming, or lack the necessary features for effective expense management. Therefore, there is a need for a modern, user-friendly, and feature-rich expense tracking application that can empower users to take control of their finances, make informed spending decisions, and achieve their financial goals.</p>
        </div>
        <div className="content-body" />
      </div>
    </div>
  );
};

export default AboutPage;
