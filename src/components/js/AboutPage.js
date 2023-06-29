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
              <h2>Welcome to Expense Tracker Business</h2>
              <p>Expense Tracker Business is a user-friendly web-based application specifically designed to simplify expense management for your business. We understand the challenges you face in budgeting, tracking expenses, and achieving your financial goals. Our platform offers a comprehensive set of features, including expense tracking, budget setting, and spending analysis tailored to meet your business needs. With a modern and intuitive interface, we prioritize visual appeal and user-friendliness to ensure a seamless experience.</p>

              <h2>Why Choose Expense Tracker Business?</h2>
              <p>1. Streamlined Expense Management: Take full control of your business finances by effortlessly tracking and managing your expenses. Our platform provides a centralized hub for monitoring and organizing all your business expenditures.</p>

              <p>2. Informed Decision Making: Make smarter financial decisions based on accurate data and insights. Expense Tracker Business provides real-time updates and detailed reports, enabling you to identify spending patterns, optimize your budget, and maximize your savings.</p>

              <p>3. Goal Achievement: Set and track your financial goals with ease. Whether it's reducing costs, increasing revenue, or saving for future investments, our platform empowers you to stay focused and achieve your business objectives.</p>

              <h2>Join Us Today!</h2>
              <p>Experience the power of Expense Tracker Business and take control of your business's financial future. Start managing your expenses effortlessly today and unlock the potential for growth and success. Join us now to streamline your expense management processes and make informed financial decisions.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
