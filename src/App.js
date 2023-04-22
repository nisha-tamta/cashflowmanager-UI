import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import CreateUserForm from './components/CreateUserForm';
import MainScreen from "./components/MainScreen";
import AboutPage from "./components/AboutPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainScreen />} />
        <Route path="/login" element={<LoginScreen onLoginSuccess={handleLoginSuccess}/>} />
        <Route path="/signup" element={<CreateUserForm />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <div>
        {isLoggedIn ? (
          <HomeScreen />
        ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;