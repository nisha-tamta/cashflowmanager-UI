import React from "react";
import '../css/NavBar.css';
import NavBar from "./NavBar";
import iconImage from '../images/icon.png';

const AboutPage = () => {
  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        <div className="content-about-container">
          <header className="content-header">
            <h1>About Us</h1>
            <img
              src={iconImage}
              style={{ width: '380px', height: '240px', objectFit: 'cover', marginBottom: '-30px'}}
            />
          </header>
          <section className="content-about-bottom-container">
            <div className="info-box">
              <h2>Welcome to CashFlow Manager</h2>
              <p>CashFlow Manager is a user-friendly web-based application specifically designed to simplify expense management for your business. We understand the challenges you face in budgeting, tracking expenses, and achieving your financial goals. Our platform offers a comprehensive set of features, including expense tracking, budget setting, and spending analysis tailored to meet your business needs. With a modern and intuitive interface, we prioritize visual appeal and user-friendliness to ensure a seamless experience.</p>

              <h2>Why Choose CashFlow Manager?</h2>
              <p>1. Streamlined Expense Management: Take full control of your business finances by effortlessly tracking and managing your expenses. Our platform provides a centralized hub for monitoring and organizing all your business expenditures.</p>

              <p>2. Informed Decision Making: Make smarter financial decisions based on accurate data and insights. CashFlow Manager provides real-time updates and detailed reports, enabling you to identify spending patterns, optimize your budget, and maximize your savings.</p>

              <p>3. Goal Achievement: Set and track your financial goals with ease. Whether it's reducing costs, increasing revenue, or saving for future investments, our platform empowers you to stay focused and achieve your business objectives.</p>

              <h2>Join Us Today!</h2>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
