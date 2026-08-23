import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Admin login credentials
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin");
    } else {
      setError(
        "Invalid username or password. Please try again."
      );
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* LOGO */}
        <div className="admin-login-logo">
          🐄
        </div>

        {/* HEADING */}
        <div className="admin-login-heading">

          <h1>
            Admin Login
          </h1>

          <p>
            Sign in to manage your dairy farm
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="admin-login-error">
            ⚠️ {error}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* USERNAME */}
          <div className="login-form-group">

            <label htmlFor="username">
              Username
            </label>

            <div className="login-input-wrapper">

              <span className="login-input-icon">
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
          <div className="login-form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="login-input-wrapper">

              <span className="login-input-icon">
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
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
              >
                {showPassword ? "🙈" : "👁"}
              </button>

            </div>

          </div>

          {/* REMEMBER ME */}
          <div className="login-options">

            <label className="remember-me">

              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>

            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert(
                  "Please contact the system administrator to reset your password."
                )
              }
            >
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="admin-login-button"
          >
            Sign In
          </button>

        </form>

        {/* FOOTER */}
        <div className="login-footer">
          © 2026 Dairy Farm Management System
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;