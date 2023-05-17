import React from "react";
import '../css/NavBar.css';
import NavBar from "./NavBar";

const AboutPage = () => {
  return (
    <div className="homescreen-container">
      <NavBar />
      <div className="content-profile-container">
        <div className="content-header">
          <h1 style={{ display: 'flex', alignItems: 'center' }}>
            About Us.. 
            <div className="login-logo-container">
              <img
                src="https://pbs.twimg.com/media/EYhrRIGUYAEjmGN.jpg"
                alt="Expense Tracker Logo"
                className="login-logo"
              />
            </div>
          </h1>
          <p>Expense Tracker is a user-friendly web-based application designed to simplify expense management. We understand the challenges of budgeting, tracking expenses, and achieving financial goals. Our platform offers comprehensive features, including expense tracking, budget setting, and spending analysis. With a modern and intuitive interface, we prioritize visual appeal and user-friendliness. Take control of your finances, make informed decisions, and work towards your financial goals with Expense Tracker. Start managing your expenses effortlessly today.</p>
          <p>Experience the power of Expense Tracker today and take control of your financial future.</p>
        </div>
        <div className="content-body" />
      </div>
    </div>
  );
};

export default AboutPage;
