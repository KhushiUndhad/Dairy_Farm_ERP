import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaChevronDown,
  FaUser,
  FaUserTie,
  FaUserShield,
  FaCheckCircle,
  FaArrowRight,
  FaBoxes,
  FaChartLine,
  FaUsers,
  FaTint,
} from "react-icons/fa";

import { GiCow } from "react-icons/gi";

import "./Home.css";
import heroImage from "../../assets/hero.png";

const Home = () => {
  const navigate = useNavigate();

  const [loginOpen, setLoginOpen] = useState(false);

  // ======================================================
  // LOGIN NAVIGATION
  // ======================================================

  const handleLogin = (path) => {
    setLoginOpen(false);
    navigate(path);
  };

  // ======================================================
  // SCROLL
  // ======================================================

  const scrollToSection = (id) => {
    setLoginOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // ======================================================
  // OPEN LOGIN
  // ======================================================

  const openLoginDropdown = () => {
    setLoginOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="home-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="home-topbar">

        {/* LOGO - ONLY HEADER */}

        <div
          className="home-logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/");
            }
          }}
        >

          <div className="home-logo-icon">
            <GiCow />
          </div>

          <div className="home-logo-text">
            <h2>Dairy Farm</h2>
            <span>ERP System</span>
          </div>

        </div>


        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <nav className="home-navigation">

          <button
            type="button"
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
          >
            About
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("features")}
          >
            Features
          </button>

        </nav>


        {/* ==================================================
            LOGIN
        ================================================== */}

        <div className="home-login-wrapper">

          <button
            type="button"
            className="home-login-button"
            onClick={() =>
              setLoginOpen((value) => !value)
            }
          >

            <span>Login</span>

            <FaChevronDown
              className={
                loginOpen
                  ? "login-arrow rotate"
                  : "login-arrow"
              }
            />

          </button>


          {/* LOGIN DROPDOWN */}

          {loginOpen && (

            <div className="home-login-dropdown">

              {/* CUSTOMER */}

              <button
                type="button"
                className="login-dropdown-item"
                onClick={() =>
                  handleLogin("/customer/login")
                }
              >

                <span className="dropdown-icon customer-icon">
                  <FaUser />
                </span>

                <span className="dropdown-content">
                  <strong>Customer</strong>
                  <small>Customer Portal</small>
                </span>

                <FaArrowRight className="dropdown-arrow" />

              </button>


              {/* EMPLOYEE */}

              <button
                type="button"
                className="login-dropdown-item"
                onClick={() =>
                  handleLogin("/employee/login")
                }
              >

                <span className="dropdown-icon employee-icon">
                  <FaUserTie />
                </span>

                <span className="dropdown-content">
                  <strong>Employee</strong>
                  <small>Employee Portal</small>
                </span>

                <FaArrowRight className="dropdown-arrow" />

              </button>


              {/* ADMIN */}

              <button
                type="button"
                className="login-dropdown-item"
                onClick={() =>
                  handleLogin("/admin/login")
                }
              >

                <span className="dropdown-icon admin-icon">
                  <FaUserShield />
                </span>

                <span className="dropdown-content">
                  <strong>Admin</strong>
                  <small>Administration Portal</small>
                </span>

                <FaArrowRight className="dropdown-arrow" />

              </button>

            </div>

          )}

        </div>

      </header>


      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="home-hero"
        id="home"
      >

        <div className="home-hero-container">

          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div className="home-hero-content">

            <div className="home-badge">

              <FaCheckCircle />

              Smart Dairy Farm Management

            </div>


            <h1>

              Manage Your Dairy Farm

              <span>
                Smarter & Better
              </span>

            </h1>


            <p className="home-hero-description">

              A complete Dairy Farm ERP system
              designed to manage cows, milk production,
              employees, customers, sales, inventory,
              and daily farm operations from one place.

            </p>


            {/* BUTTONS */}

            <div className="home-hero-buttons">

              <button
                type="button"
                className="home-primary-button"
                onClick={openLoginDropdown}
              >

                Get Started

                <FaArrowRight />

              </button>


              <button
                type="button"
                className="home-secondary-button"
                onClick={() =>
                  scrollToSection("features")
                }
              >

                Explore Features

              </button>

            </div>


            {/* TRUST ITEMS */}

            <div className="home-trust-items">

              <div>
                <FaCheckCircle />
                Easy to Use
              </div>

              <div>
                <FaCheckCircle />
                Secure Access
              </div>

              <div>
                <FaCheckCircle />
                Complete Management
              </div>

            </div>

          </div>


          {/* ==================================================
              RIGHT SIDE IMAGE
          ================================================== */}

          <div className="home-hero-image">

            <div className="hero-image-wrapper">

              <img
                src={heroImage}
                alt="Dairy Farm Management"
                className="hero-main-image"
              />


              {/* MILK CARD */}

              <div className="hero-floating-card card-one">

                <div className="floating-icon">
                  <FaTint />
                </div>

                <div>
                  <strong>
                    Milk Production
                  </strong>

                  <span>
                    Easy Tracking
                  </span>
                </div>

              </div>


              {/* REPORT CARD */}

              <div className="hero-floating-card card-two">

                <div className="floating-icon">
                  <FaChartLine />
                </div>

                <div>
                  <strong>
                    Smart Reports
                  </strong>

                  <span>
                    Better Decisions
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          ABOUT
      ================================================== */}

      <section
        className="home-about"
        id="about"
      >

        <div className="home-section-heading">

          <span>
            ABOUT OUR SYSTEM
          </span>

          <h2>
            Everything Your Dairy Farm Needs
          </h2>

          <p>
            Dairy Farm ERP brings all important
            farm activities together in one simple
            and organized system.
          </p>

        </div>


        <div className="home-stats">

          <div className="home-stat-card">

            <div className="stat-icon">
              <GiCow />
            </div>

            <h3>
              Cow Management
            </h3>

            <p>
              Maintain complete information
              about your cows and farm animals.
            </p>

          </div>


          <div className="home-stat-card">

            <div className="stat-icon">
              <FaTint />
            </div>

            <h3>
              Milk Production
            </h3>

            <p>
              Track daily milk production
              and maintain accurate records.
            </p>

          </div>


          <div className="home-stat-card">

            <div className="stat-icon">
              <FaUsers />
            </div>

            <h3>
              Employee Management
            </h3>

            <p>
              Manage employees, attendance,
              salary and daily work.
            </p>

          </div>


          <div className="home-stat-card">

            <div className="stat-icon">
              <FaBoxes />
            </div>

            <h3>
              Inventory & Sales
            </h3>

            <p>
              Manage products, inventory,
              orders and sales efficiently.
            </p>

          </div>

        </div>

      </section>


      {/* ==================================================
          FEATURES
      ================================================== */}

      <section
        className="home-features"
        id="features"
      >

        <div className="home-section-heading">

          <span>
            SYSTEM FEATURES
          </span>

          <h2>
            Powerful Features in One Platform
          </h2>

          <p>
            Different users get different portals
            according to their responsibilities.
          </p>

        </div>


        <div className="home-feature-grid">

          <div className="home-feature-card">

            <div className="feature-number">
              01
            </div>

            <FaUser className="feature-icon" />

            <h3>
              Customer Portal
            </h3>

            <p>
              Customers can view products,
              place orders, check payments
              and manage their profile.
            </p>

          </div>


          <div className="home-feature-card">

            <div className="feature-number">
              02
            </div>

            <FaUserTie className="feature-icon" />

            <h3>
              Employee Portal
            </h3>

            <p>
              Employees can manage their work,
              attendance, leave, salary
              and profile information.
            </p>

          </div>


          <div className="home-feature-card">

            <div className="feature-number">
              03
            </div>

            <FaUserShield className="feature-icon" />

            <h3>
              Admin Portal
            </h3>

            <p>
              Admin can manage cows, employees,
              customers, milk production,
              sales, inventory and reports.
            </p>

          </div>

        </div>

      </section>


      


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="home-footer">

        {/* LOGO - ONLY FOOTER */}

        <div className="footer-logo">

          <div className="footer-logo-icon">
            <GiCow />
          </div>

          <div className="footer-logo-text">

            <strong>
              Dairy Farm
            </strong>

            <span>
              ERP System
            </span>

          </div>

        </div>


        <p>
          © 2026 Dairy Farm Management System.
          All Rights Reserved.
        </p>

      </footer>

    </div>
  );
};

export default Home;