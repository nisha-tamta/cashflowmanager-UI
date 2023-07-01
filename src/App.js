import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/js/LoginScreen";
import CreateUserForm from "./components/js/CreateUserForm";
import MainScreen from "./components/js/MainScreen";
import Protected from "./components/js/Protected";
import AboutPage from "./components/js/AboutPage";
import ExpensesPage from "./components/js/ExpensesPage";
import DashboardPage from "./components/js/DashboardPage";
import Profile from "./components/js/Profile";
import AddExpense from "./components/js/AddExpense";
import SetBudget from "./components/js/SetBudget";
import UserManagement from "./components/js/UserManagement";
import UserManagementAdd from "./components/js/UserManagementAdd";
import Employees from "./components/js/Employees";
import EmployeeAdd from "./components/js/EmployeeAdd";
import ExpenseDetails from "./components/js/ExpenseDetails";
import EmployeeDetails from "./components/js/EmployeeDetails";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            localStorage.getItem("user") ? <DashboardPage /> : <MainScreen />
          }
        />
        <Route
          path="/login"
          element={<LoginScreen onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/signup" element={<CreateUserForm />} />
        <Route
          path="/dashboard"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <DashboardPage />
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
          path="/userManagement"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <UserManagement />
            </Protected>
          }
        />
         <Route
          path="/userManagement/add"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <UserManagementAdd />
            </Protected>
          }
        />
         <Route
          path="/employees"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <Employees />
            </Protected>
          }
        />
        <Route
          path="/employees/:employeeId"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <EmployeeDetails />
            </Protected>
          }
        />
         <Route
          path="/employees/add"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <EmployeeAdd />
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
          path="/expenses/:expenseId"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <ExpenseDetails />
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
          path="/profile"
          element={
            <Protected isLoggedIn={localStorage.getItem("user")}>
              <Profile />
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
