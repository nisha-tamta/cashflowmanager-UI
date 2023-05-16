import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/js/LoginScreen";
import HomeScreen from "./components/js/HomeScreen";
import CreateUserForm from "./components/js/CreateUserForm";
import MainScreen from "./components/js/MainScreen";
import Protected from "./components/js/Protected";
import AboutPage from "./components/js/AboutPage";
import DashboardPage from "./components/js/DashboardPage";
import ExpensesPage from "./components/js/ExpensesPage";
import ReportPage from "./components/js/ReportPage";
import Profile from "./components/js/Profile";
import ListExpense from "./components/js/ListExpense";
import AddExpense from "./components/js/AddExpense";
import SetBudget from "./components/js/SetBudget";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            localStorage.getItem("user") ? <HomeScreen /> : <MainScreen />
          }
        />
        <Route
          path="/login"
          element={<LoginScreen onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/signup" element={<CreateUserForm />} />
        <Route
          path="/home"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <HomeScreen />
            </Protected>
          }
        />
        <Route
          path="/about"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <AboutPage />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <DashboardPage />
            </Protected>
          }
        />
         <Route
          path="/expenses"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <ExpensesPage />
            </Protected>
          }
        />
        <Route
          path="/reports"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <ReportPage />
            </Protected>
          }
        />
         <Route
          path="/profile"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <Profile />
            </Protected>
          }
        />
         <Route
          path="/expenses/list"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <ListExpense />
            </Protected>
          }
        />
         <Route
          path="/expenses/add"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <AddExpense />
            </Protected>
          }
        />
         <Route
          path="/budget/set"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <SetBudget />
            </Protected>
          }
        />
      </Routes>
      <div></div>
    </BrowserRouter>
  );
};

export default App;
