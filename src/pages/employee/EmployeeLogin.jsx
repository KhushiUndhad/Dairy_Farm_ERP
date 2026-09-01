import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserTie,
} from "react-icons/fa";

import "./EmployeeLogin.css";

function EmployeeLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Login successful
    localStorage.setItem("employeeLoggedIn", "true");

    navigate("/employee", {
      replace: true,
    });
  };

  return (
    <div className="employee-login-page">

      <div className="employee-login-card">

        <div className="login-icon">
          <FaUserTie />
        </div>

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
            />

          </div>


          {/* LOGIN */}

          <button
            type="submit"
            className="login-btn"
          >
            <FaSignInAlt />
            Login
          </button>

        </form>


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