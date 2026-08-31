import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCow
} from "react-icons/fa6";

import "./EmployeeLogin.css";

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem("employeeLoggedIn", "true");

    navigate("/employee");
  };

  return (
    <div className="employee-login-page">

      <div className="employee-login-container">

        {/* LEFT SIDE */}

        <div className="employee-login-left">

          <div className="employee-brand">

            <div className="employee-brand-icon">
              <FaCow />
            </div>

            <div>
              <h2>Dairy Farm</h2>
              <p>Employee Panel</p>
            </div>

          </div>

          <div className="employee-login-intro">

            <h1>
              Welcome Back!
            </h1>

            <p>
              Login to manage your daily work,
              attendance and employee activities.
            </p>

          </div>

          <div className="employee-login-features">

            <div>
              <FaUser />
              <span>Employee Management</span>
            </div>

            <div>
              <FaArrowRight />
              <span>Track Daily Activities</span>
            </div>

            <div>
              <FaLock />
              <span>Secure Employee Account</span>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="employee-login-right">

          <div className="employee-login-card">

            <div className="employee-login-title">

              <h2>Employee Login</h2>

              <p>
                Enter your credentials to continue
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

              <div className="employee-input-group">

                <label>Email Address</label>

                <div className="employee-input-wrapper">

                  <FaUser />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="employee-input-group">

                <label>Password</label>

                <div className="employee-input-wrapper">

                  <FaLock />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="employee-password-button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >

                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}

                  </button>

                </div>

              </div>


              <div className="employee-login-options">

                <label>

                  <input type="checkbox" />

                  Remember me

                </label>

                <a href="#">
                  Forgot Password?
                </a>

              </div>


              <button
                type="submit"
                className="employee-login-button"
              >

                Login

                <FaArrowRight />

              </button>

            </form>


            <div className="employee-register-link">

              Don't have an account?

              <Link to="/employee/register">
                Register Now
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployeeLogin;