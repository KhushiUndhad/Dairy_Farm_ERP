import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaIdCard,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import "./EmployeeProfile.css";

const defaultEmployee = {
  name: "Employee",
  email: "employee@gmail.com",
  phone: "9876543210",
  role: "Farm Employee",
  employeeId: "EMP001",
  joiningDate: "01 January 2025",
  address: "Dairy Farm",
};

const EmployeeProfile = () => {
  const getEmployeeData = () => {
    try {
      const savedEmployee = localStorage.getItem("employeeUser");

      if (savedEmployee) {
        const parsedEmployee = JSON.parse(savedEmployee);

        return {
          ...defaultEmployee,
          ...parsedEmployee,
        };
      }
    } catch (error) {
      console.error("Error reading employee data:", error);
    }

    return defaultEmployee;
  };

  const [employee, setEmployee] = useState(getEmployeeData);

  const [formData, setFormData] = useState(getEmployeeData);

  const [isEditing, setIsEditing] = useState(false);


  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =========================
     EDIT
  ========================= */

  const handleEdit = () => {
    setFormData({
      ...employee,
    });

    setIsEditing(true);
  };


  /* =========================
     CANCEL
  ========================= */

  const handleCancel = () => {
    setFormData({
      ...employee,
    });

    setIsEditing(false);
  };


  /* =========================
     SAVE
  ========================= */

  const handleSave = () => {
    const updatedEmployee = {
      ...employee,
      ...formData,
    };

    setEmployee(updatedEmployee);

    localStorage.setItem(
      "employeeUser",
      JSON.stringify(updatedEmployee)
    );

    setIsEditing(false);

    alert("Profile updated successfully!");
  };


  return (
    <div className="employee-profile-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="employee-profile-header">

        <div>
          <h1>My Profile</h1>

          <p>
            Manage your personal and employee information
          </p>
        </div>


        {!isEditing ? (

          <button
            type="button"
            className="profile-edit-btn"
            onClick={handleEdit}
          >
            <FaEdit />
            <span>Edit Profile</span>
          </button>

        ) : (

          <div className="profile-action-buttons">

            <button
              type="button"
              className="profile-cancel-btn"
              onClick={handleCancel}
            >
              <FaTimes />
              <span>Cancel</span>
            </button>


            <button
              type="button"
              className="profile-save-btn"
              onClick={handleSave}
            >
              <FaSave />
              <span>Save Changes</span>
            </button>

          </div>

        )}

      </div>


      {/* =========================
          PROFILE CARD
      ========================= */}

      <div className="employee-profile-card">


        {/* =========================
            PROFILE HEADER
        ========================= */}

        <div className="employee-profile-top">

          <div className="employee-profile-avatar">
            <FaUserCircle />
          </div>


          <div className="employee-profile-name">

            <h2>
              {employee.name || "Employee"}
            </h2>

            <span>
              {employee.role || "Farm Employee"}
            </span>

            <small>
              Employee ID:{" "}
              {employee.employeeId || "EMP001"}
            </small>

          </div>

        </div>


        {/* =========================
            PERSONAL INFORMATION
        ========================= */}

        <div className="employee-profile-section">

          <div className="profile-section-title">

            <h2>
              Personal Information
            </h2>

            <p>
              Your basic personal details
            </p>

          </div>


          <div className="profile-info-grid">


            {/* FULL NAME */}

            <div className="profile-field">

              <label>
                <FaUserCircle />
                Full Name
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />

              ) : (

                <div className="profile-value">
                  {employee.name || "Employee"}
                </div>

              )}

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label>
                <FaEnvelope />
                Email Address
              </label>

              {isEditing ? (

                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="Enter email"
                />

              ) : (

                <div className="profile-value">
                  {employee.email || "Not provided"}
                </div>

              )}

            </div>


            {/* PHONE */}

            <div className="profile-field">

              <label>
                <FaPhone />
                Phone Number
              </label>

              {isEditing ? (

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              ) : (

                <div className="profile-value">
                  {employee.phone || "Not provided"}
                </div>

              )}

            </div>


            {/* ADDRESS */}

            <div className="profile-field">

              <label>
                <FaMapMarkerAlt />
                Address
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  placeholder="Enter address"
                />

              ) : (

                <div className="profile-value">
                  {employee.address || "Not provided"}
                </div>

              )}

            </div>

          </div>

        </div>


        {/* =========================
            EMPLOYEE INFORMATION
        ========================= */}

        <div className="employee-profile-section">

          <div className="profile-section-title">

            <h2>
              Employee Information
            </h2>

            <p>
              Your employment details
            </p>

          </div>


          <div className="profile-info-grid">


            {/* EMPLOYEE ID */}

            <div className="profile-field">

              <label>
                <FaIdCard />
                Employee ID
              </label>

              <div className="profile-value">
                {employee.employeeId || "EMP001"}
              </div>

            </div>


            {/* POSITION */}

            <div className="profile-field">

              <label>
                <FaBriefcase />
                Position
              </label>

              <div className="profile-value">
                {employee.role || "Farm Employee"}
              </div>

            </div>


            {/* JOINING DATE */}

            <div className="profile-field">

              <label>
                <FaCalendarAlt />
                Joining Date
              </label>

              <div className="profile-value">
                {employee.joiningDate || "Not provided"}
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            ACCOUNT STATUS
        ========================= */}

        <div className="profile-status-box">

          <div className="profile-status-icon">
            <FaUserCircle />
          </div>


          <div className="profile-status-content">

            <strong>
              Account Status
            </strong>

            <p>
              Your employee account is active and
              ready to use.
            </p>

          </div>


          <span className="profile-active-badge">
            Active
          </span>

        </div>

      </div>

    </div>
  );
};

export default EmployeeProfile;