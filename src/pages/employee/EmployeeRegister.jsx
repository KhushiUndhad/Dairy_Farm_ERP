
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { employeeRegister } from "../../services/api";

import "./EmployeeRegister.css";

function EmployeeRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const department = formData.department.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // ===================================================
    // VALIDATION
    // ===================================================

    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (name.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ===================================================
    // API CALL
    // ===================================================

    try {
      setLoading(true);

      const response = await employeeRegister({
        name,
        email,
        phone,
        department,
        password,
        confirmPassword,
      });

      console.log("Employee Registration Response:", response);

      if (!response || response.success !== true) {
        throw new Error(
          response?.message || "Employee registration failed."
        );
      }

      setSuccess(
        response.message ||
          "Employee registered successfully."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to employee login
      setTimeout(() => {
        navigate("/employee/login");
      }, 1500);
    } catch (error) {
      console.error("Employee Registration Error:", error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-register-page">
      <div className="employee-register-card">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="employee-register-header">
          <div className="employee-register-icon">
            👨‍🌾
          </div>

          <h1>Employee Registration</h1>

          <p>
            Create your Dairy Farm ERP employee account
          </p>
        </div>

        {/* =================================================
            ERROR MESSAGE
        ================================================== */}

        {error && (
          <div className="employee-register-error">
            <span>⚠</span>
            <p>{error}</p>
          </div>
        )}

        {/* =================================================
            SUCCESS MESSAGE
        ================================================== */}

        {success && (
          <div className="employee-register-success">
            <span>✓</span>
            <p>{success}</p>
          </div>
        )}

        {/* =================================================
            FORM
        ================================================== */}

        <form
          className="employee-register-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="employee-form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              autoComplete="name"
              required
            />
          </div>

          {/* EMAIL */}

          <div className="employee-form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          {/* PHONE */}

          <div className="employee-form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter 10 digit phone number"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              maxLength="10"
              inputMode="numeric"
              autoComplete="tel"
              required
            />
          </div>

          {/* DEPARTMENT */}

          <div className="employee-form-group">
            <label htmlFor="department">
              Department
            </label>

            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">
                Select Department
              </option>

              <option value="Farm Manager">
                Farm Manager
              </option>

              <option value="Cow Caretaker">
                Cow Caretaker
              </option>

              <option value="Milking Staff">
                Milking Staff
              </option>

              <option value="Farm Worker">
                Farm Worker
              </option>

              <option value="Driver">
                Driver
              </option>

              <option value="Veterinary Assistant">
                Veterinary Assistant
              </option>
            </select>
          </div>

          {/* PASSWORD */}

          <div className="employee-form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="employee-form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="employee-register-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Employee Account"}
          </button>
        </form>

        {/* =================================================
            LOGIN LINK
        ================================================== */}

        <div className="employee-register-login">
          <p>
            Already have an employee account?
          </p>

          <Link to="/employee/login">
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
}

export default EmployeeRegister;
