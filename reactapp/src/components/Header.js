import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.js";
import "../assets/styles/Logo.css";
import "../assets/styles/HeaderNavButton.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown
  const navigate = useNavigate();

  // Function to update login state
  const updateLoginState = () => {
    const userName = localStorage.getItem("userName");
    setIsLoggedIn(!!userName); // Set logged-in state
  };

  // Initial state update on component mount
  useEffect(() => {
    updateLoginState();
  }, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      updateLoginState();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userName");
    updateLoginState();
    navigate("/"); // Redirect to home page
    setDropdownOpen(false);
  };

  return (
    <header className="bg-light py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo/Title */}
        <Link className="logo-link" to="/">
          <h1 className="h2 logo-link"> Task-Flow Services</h1>
        </Link>

        {/* Navigation */}
        <div className="d-flex">
          {/* Show Sign Up / Log In only if user is NOT logged in */}
          {!isLoggedIn ? (
            <Link to="/login" className="button-50 me-5" role="button">
              Sign Up / Log In
            </Link>
          ) : (
            <div className="user-icon-container" ref={dropdownRef}>
              <span className="icon" onClick={toggleDropdown}>
                👤
              </span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
