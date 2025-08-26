import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";


import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';
import {Toaster} from "react-hot-toast";
import Profile from './pages/Profile';



const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
        </Router>
        </div>

        <Toaster
        toastOption={{
          className: "",
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

export default App;
const Root = () => {
  // Check if the user is authenticated
  // This is a placeholder; replace with your actual authentication logic
  // For example, you might check if a token exists in localStorage or a cookie
  // Here, we assume that if a token exists, the user is authenticated
  // If the user is authenticated, redirect to the dashboard
  // If not, redirect to the login page
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
 <Navigate to="/dashboard" />
) : (
  <Navigate to="/login" />
  );
};
