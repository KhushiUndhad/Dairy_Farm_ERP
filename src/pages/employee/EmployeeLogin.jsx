import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserTie,
} from "react-icons/fa";

import { employeeLogin } from "../../services/api";

import "./EmployeeLogin.css";

function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginEmail = email.trim();

    if (!loginEmail || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await employeeLogin(
        loginEmail,
        password
      );

      console.log("================================");
      console.log("EMPLOYEE LOGIN RESPONSE");
      console.log(response);
      console.log("================================");

      // --------------------------------
      // CHECK LOGIN SUCCESS
      // --------------------------------

      if (!response || response.success !== true) {
        alert(
          response?.message ||
            response?.error ||
            "Invalid email or password"
        );
        return;
      }

      // --------------------------------
      // SAVE LOGIN STATUS
      // --------------------------------

      localStorage.setItem(
        "employeeLoggedIn",
        "true"
      );

      // --------------------------------
      // SAVE JWT TOKEN
      // --------------------------------

      if (response.token) {
        localStorage.setItem(
          "employeeToken",
          response.token
        );
      }

      // --------------------------------
      // SAVE EMPLOYEE DATA
      // --------------------------------

      if (response.user) {
        localStorage.setItem(
          "employeeData",
          JSON.stringify(response.user)
        );
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      alert("Login successful!");

      // --------------------------------
      // EMPLOYEE PANEL
      // --------------------------------

      navigate("/employee", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Employee Login Error:",
        error
      );

      alert(
        error?.message ||
          "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-login-page">

      <div className="employee-login-card">

        {/* ICON */}
        <div className="login-icon">
          <FaUserTie />
        </div>

        {/* TITLE */}
        <h2>Employee Login</h2>

        <p className="login-subtitle">
          Login to access your employee panel
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="input-group">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <FaLock />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            <FaSignInAlt />

            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* REGISTER */}
        <p className="register-text">
          Don't have an account?

          <Link to="/employee/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default EmployeeLogin;