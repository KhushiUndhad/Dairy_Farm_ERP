import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBriefcase,
  FaArrowRight,
  FaCow
} from "react-icons/fa6";

import "./EmployeeRegister.css";

const EmployeeRegister = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Employee registered successfully!");

    navigate("/employee/login");

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
            <p>Employee Registration</p>
          </div>

        </div>


        <div className="employee-register-title">

          <h2>Create Employee Account</h2>

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

            <label>Full Name</label>

            <div className="employee-register-input">

              <FaUser />

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* EMAIL */}

          <div className="employee-register-field">

            <label>Email Address</label>

            <div className="employee-register-input">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* PHONE */}

          <div className="employee-register-field">

            <label>Phone Number</label>

            <div className="employee-register-input">

              <FaPhone />

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* DEPARTMENT */}

          <div className="employee-register-field">

            <label>Department</label>

            <div className="employee-register-input">

              <FaBriefcase />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
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

            <label>Password</label>

            <div className="employee-register-input">

              <FaLock />

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="employee-register-field">

            <label>Confirm Password</label>

            <div className="employee-register-input">

              <FaLock />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

            </div>

          </div>


          <button
            type="submit"
            className="employee-register-button"
          >

            Create Account

            <FaArrowRight />

          </button>

        </form>


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