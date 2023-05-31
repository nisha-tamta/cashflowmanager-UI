import React from "react";
import '../css/NavBar.css';
import NavBar from "./NavBar";

const AboutPage = () => {
  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        <div className="content-about-container">
          <header className="content-header">
            <h1>About Us</h1>
            <img
              src="https://pbs.twimg.com/media/EYhrRIGUYAEjmGN.jpg"
              alt="Expense Tracker Logo"
              className="login-logo-about"
            />
          </header>
          <section className="content-chat-container">
            <div className="info-box">
              <h2>Welcome to Expense Tracker</h2>
              <p>Expense Tracker is a user-friendly web-based application designed to simplify expense management. We understand the challenges of budgeting, tracking expenses, and achieving financial goals. Our platform offers comprehensive features, including expense tracking, budget setting, and spending analysis. With a modern and intuitive interface, we prioritize visual appeal and user-friendliness.</p>

              <h2>Why Expense Tracker?</h2>
              <p>Take control of your finances, make informed decisions, and work towards your financial goals with Expense Tracker. Start managing your expenses effortlessly today.</p>

              <h2>Join Us Today</h2>
              <p>Experience the power of Expense Tracker today and take control of your financial future.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
