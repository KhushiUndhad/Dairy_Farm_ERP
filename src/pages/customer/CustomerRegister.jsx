import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../../api/customerApi";
import "./CustomerRegister.css";
function CustomerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (
      !name ||
      !email ||
      !phone ||
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

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ------------------------------------------
    // SEND CUSTOMER DATA TO BACKEND
    // ------------------------------------------

    try {
      setLoading(true);

      const customerData = {
        name,
        email,
        phone,
        password,
        confirmPassword,
      };

      const data =
        await registerCustomer(customerData);

      // ------------------------------------------
      // CHECK BACKEND RESPONSE
      // ------------------------------------------

      if (!data) {
        throw new Error(
          "No response received from server."
        );
      }

      if (data.success === false) {
        throw new Error(
          data.message ||
            "Registration failed."
        );
      }

      // ------------------------------------------
      // SUCCESS
      // ------------------------------------------

      setSuccess(
        data.message ||
          "Customer registered successfully."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // ------------------------------------------
      // REDIRECT TO LOGIN
      // ------------------------------------------

      setTimeout(() => {
        navigate("/customer/login", {
          replace: true,
        });
      }, 1500);

    } catch (err) {
      console.error(
        "Customer Registration Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-register-page">

      <div className="customer-register-card">

        {/* ------------------------------------------
            HEADER
        ------------------------------------------ */}

        <div className="customer-register-header">

          <div className="customer-register-icon">
            🐄
          </div>

          <h1>Create Customer Account</h1>

          <p>
            Register to order fresh dairy products
          </p>

        </div>

        {/* ------------------------------------------
            ERROR
        ------------------------------------------ */}

        {error && (
          <div className="customer-register-error">
            <span>⚠</span>
            <p>{error}</p>
          </div>
        )}

        {/* ------------------------------------------
            SUCCESS
        ------------------------------------------ */}

        {success && (
          <div className="customer-register-success">
            <span>✓</span>
            <p>{success}</p>
          </div>
        )}

        {/* ------------------------------------------
            FORM
        ------------------------------------------ */}

        <form
          onSubmit={handleSubmit}
          className="customer-register-form"
        >

          {/* NAME */}

          <div className="customer-register-form-group">

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
              autoComplete="name"
              disabled={loading}
              required
            />

          </div>

          {/* EMAIL */}

          <div className="customer-register-form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={loading}
              required
            />

          </div>

          {/* PHONE */}

          <div className="customer-register-form-group">

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              disabled={loading}
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="customer-register-form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={loading}
              required
            />

            <small>
              Password must contain at least 6 characters.
            </small>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="customer-register-form-group">

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
              autoComplete="new-password"
              disabled={loading}
              required
            />

          </div>

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="customer-register-submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* ------------------------------------------
            LOGIN
        ------------------------------------------ */}

        <div className="customer-register-login">

          <p>
            Already have an account?
          </p>

          <Link to="/customer/login">
            Login to your account
          </Link>

        </div>

        {/* ------------------------------------------
            FOOTER
        ------------------------------------------ */}

        <div className="customer-register-footer">
          © 2026 Dairy Farm Management System
        </div>

      </div>

    </div>
  );
}

export default CustomerRegister;