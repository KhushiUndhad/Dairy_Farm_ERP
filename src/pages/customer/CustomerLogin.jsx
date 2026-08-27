
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

const CustomerLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Demo customer login credentials
    if (
      username === "customer" &&
      password === "customer123"
    ) {
      localStorage.setItem(
        "customerLoggedIn",
        "true"
      );

      navigate("/customer");
    } else {
      setError(
        "Invalid username or password. Please try again."
      );
    }
  };

  return (
    <div className="customer-login-page">

      <div className="customer-login-card">

        {/* LOGO */}
        <div className="customer-login-logo">
          🥛
        </div>

        {/* HEADING */}
        <div className="customer-login-heading">

          <h1>
            Customer Login
          </h1>

          <p>
            Sign in to manage your dairy orders
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="customer-login-error">
            ⚠️ {error}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* USERNAME */}
          <div className="customer-form-group">

            <label htmlFor="username">
              Username
            </label>

            <div className="customer-input-wrapper">

              <span className="customer-input-icon">
                👤
              </span>

              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                autoComplete="username"
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="customer-form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="customer-input-wrapper">

              <span className="customer-input-icon">
                🔒
              </span>

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="customer-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          {/* REMEMBER ME / FORGOT PASSWORD */}
          <div className="customer-login-options">

            <label className="customer-remember-me">

              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>

            </label>

            <button
              type="button"
              className="customer-forgot-password"
              onClick={() =>
                alert(
                  "Please contact the dairy farm administrator to reset your password."
                )
              }
            >
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="customer-login-button"
          >
            Sign In
          </button>

        </form>

        {/* REGISTER */}
        <div className="customer-register-section">

          <p>
            Don't have an account?
          </p>

          <button
            type="button"
            className="customer-register-button"
            onClick={() =>
              navigate("/customer/register")
            }
          >
            Create Account
          </button>

        </div>

        {/* FOOTER */}
        <div className="customer-login-footer">
          © 2026 Dairy Farm Management System
        </div>

      </div>

    </div>
  );
};

export default CustomerLogin;
