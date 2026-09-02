import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBriefcase,
  FaArrowRight,
  FaCow,
} from "react-icons/fa6";

import { employeeRegister } from "../../services/api";

import "./EmployeeRegister.css";

const EmployeeRegister = () => {

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

  // --------------------------------
  // HANDLE INPUT CHANGE
  // --------------------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --------------------------------
  // HANDLE REGISTER
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --------------------------------
    // CHECK ALL FIELDS
    // --------------------------------

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.department ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // --------------------------------
    // CHECK PASSWORD
    // --------------------------------

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    // --------------------------------
    // PASSWORD LENGTH
    // --------------------------------

    if (formData.password.length < 6) {
      alert(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {

      setLoading(true);

      console.log(
        "================================"
      );

      console.log(
        "EMPLOYEE REGISTER REQUEST"
      );

      console.log(formData);

      console.log(
        "================================"
      );

      // --------------------------------
      // CALL BACKEND API
      // --------------------------------

      const response =
        await employeeRegister(formData);

      console.log(
        "================================"
      );

      console.log(
        "EMPLOYEE REGISTER RESPONSE"
      );

      console.log(response);

      console.log(
        "================================"
      );

      // --------------------------------
      // CHECK SUCCESS
      // --------------------------------

      if (
        response &&
        response.success === true
      ) {

        alert(
          response.message ||
            "Employee registered successfully!"
        );

        // --------------------------------
        // CLEAR FORM
        // --------------------------------

        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
          password: "",
          confirmPassword: "",
        });

        // --------------------------------
        // GO TO LOGIN
        // --------------------------------

        navigate("/employee/login", {
          replace: true,
        });

      } else {

        alert(
          response?.message ||
            response?.error ||
            "Employee registration failed"
        );
      }

    } catch (error) {

      console.error(
        "Employee Registration Error:",
        error
      );

      alert(
        error?.message ||
          "Unable to register employee. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="employee-register-page">

      <div className="employee-register-card">

        {/* HEADER */}

        <div className="employee-register-header">

          <div className="employee-register-icon">
            <FaCow />
          </div>

          <div>
            <h1>Dairy Farm</h1>

            <p>
              Employee Registration
            </p>
          </div>

        </div>

        {/* TITLE */}

        <div className="employee-register-title">

          <h2>
            Create Employee Account
          </h2>

          <p>
            Register your employee account to access
            the employee panel.
          </p>

        </div>

        <form
          className="employee-register-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="employee-register-field">

            <label>
              Full Name
            </label>

            <div className="employee-register-input">

              <FaUser />

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* EMAIL */}

          <div className="employee-register-field">

            <label>
              Email Address
            </label>

            <div className="employee-register-input">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* PHONE */}

          <div className="employee-register-field">

            <label>
              Phone Number
            </label>

            <div className="employee-register-input">

              <FaPhone />

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* DEPARTMENT */}

          <div className="employee-register-field">

            <label>
              Department
            </label>

            <div className="employee-register-input">

              <FaBriefcase />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Department
                </option>

                <option value="Dairy Production">
                  Dairy Production
                </option>

                <option value="Animal Care">
                  Animal Care
                </option>

                <option value="Sales">
                  Sales
                </option>

                <option value="Inventory">
                  Inventory
                </option>

                <option value="Delivery">
                  Delivery
                </option>

                <option value="Administration">
                  Administration
                </option>

              </select>

            </div>

          </div>

          {/* PASSWORD */}

          <div className="employee-register-field">

            <label>
              Password
            </label>

            <div className="employee-register-input">

              <FaLock />

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="employee-register-field">

            <label>
              Confirm Password
            </label>

            <div className="employee-register-input">

              <FaLock />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="employee-register-button"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

            {!loading && <FaArrowRight />}

          </button>

        </form>

        {/* LOGIN */}

        <div className="employee-login-bottom">

          Already have an account?

          <Link to="/employee/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default EmployeeRegister;