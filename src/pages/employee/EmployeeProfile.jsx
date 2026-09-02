import { useEffect, useState } from "react";

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

import {
  getProfile,
  updateProfile,
} from "../../services/api";

import "./EmployeeProfile.css";

const defaultEmployee = {
  name: "Employee",
  email: "employee@gmail.com",
  phone: "9876543210",
  role: "Farm Employee",
  employeeId: "EMP001",
  joiningDate: "Not provided",
  address: "Dairy Farm",
  department: "Farm Operations",
};

const EmployeeProfile = () => {
  const [employee, setEmployee] =
    useState(defaultEmployee);

  const [formData, setFormData] =
    useState(defaultEmployee);

  const [isEditing, setIsEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // ========================================
  // LOAD LOGGED-IN EMPLOYEE
  // ========================================

  useEffect(() => {
    loadEmployeeProfile();
  }, []);

  const loadEmployeeProfile = async () => {
    try {
      setLoading(true);

      // Get logged-in employee from localStorage
      const savedEmployee =
        localStorage.getItem("employeeData");

      if (!savedEmployee) {
        console.error(
          "Employee data not found in localStorage"
        );

        setLoading(false);
        return;
      }

      const loggedInEmployee =
        JSON.parse(savedEmployee);

      console.log(
        "Logged in employee:",
        loggedInEmployee
      );

      // Employee MongoDB ID
      const employeeId =
        loggedInEmployee.id ||
        loggedInEmployee._id;

      if (!employeeId) {
        console.error(
          "Employee ID not found"
        );

        // Still show local data
        const localData = {
          ...defaultEmployee,
          ...loggedInEmployee,
        };

        setEmployee(localData);
        setFormData(localData);

        setLoading(false);
        return;
      }

      // ========================================
      // GET PROFILE FROM MONGODB
      // ========================================

      const response =
        await getProfile(employeeId);

      console.log(
        "Profile API response:",
        response
      );

      if (
        response &&
        response.success &&
        response.user
      ) {
        const profileData = {
          ...defaultEmployee,
          ...response.user,
        };

        setEmployee(profileData);
        setFormData(profileData);

        // Update localStorage
        localStorage.setItem(
          "employeeData",
          JSON.stringify(profileData)
        );
      } else if (response?.user) {
        const profileData = {
          ...defaultEmployee,
          ...response.user,
        };

        setEmployee(profileData);
        setFormData(profileData);

        localStorage.setItem(
          "employeeData",
          JSON.stringify(profileData)
        );
      } else {
        // Fallback to localStorage
        const localData = {
          ...defaultEmployee,
          ...loggedInEmployee,
        };

        setEmployee(localData);
        setFormData(localData);
      }
    } catch (error) {
      console.error(
        "Error loading employee profile:",
        error
      );

      // Fallback to localStorage
      try {
        const savedEmployee =
          localStorage.getItem("employeeData");

        if (savedEmployee) {
          const loggedInEmployee =
            JSON.parse(savedEmployee);

          const localData = {
            ...defaultEmployee,
            ...loggedInEmployee,
          };

          setEmployee(localData);
          setFormData(localData);
        }
      } catch (localError) {
        console.error(
          "Local employee data error:",
          localError
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // EDIT PROFILE
  // ========================================

  const handleEdit = () => {
    setFormData({
      ...employee,
    });

    setIsEditing(true);
  };

  // ========================================
  // CANCEL EDIT
  // ========================================

  const handleCancel = () => {
    setFormData({
      ...employee,
    });

    setIsEditing(false);
  };

  // ========================================
  // SAVE PROFILE
  // ========================================

  const handleSave = async () => {
    try {
      // Basic validation
      if (!formData.name?.trim()) {
        alert("Please enter your name.");
        return;
      }

      if (!formData.email?.trim()) {
        alert("Please enter your email.");
        return;
      }

      if (!formData.phone?.trim()) {
        alert("Please enter your phone number.");
        return;
      }

      if (!formData.department?.trim()) {
        alert("Please enter your department.");
        return;
      }

      // Get employee ID
      const savedEmployee =
        localStorage.getItem("employeeData");

      if (!savedEmployee) {
        alert(
          "Employee session not found. Please login again."
        );
        return;
      }

      const loggedInEmployee =
        JSON.parse(savedEmployee);

      const employeeId =
        loggedInEmployee.id ||
        loggedInEmployee._id;

      if (!employeeId) {
        alert(
          "Employee ID not found. Please login again."
        );
        return;
      }

      setSaving(true);

      // ========================================
      // UPDATE PROFILE IN MONGODB
      // ========================================

      const response =
        await updateProfile(
          employeeId,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
          }
        );

      console.log(
        "Update profile response:",
        response
      );

      if (
        response &&
        response.success &&
        response.user
      ) {
        const updatedEmployee = {
          ...employee,
          ...response.user,
        };

        // Update state
        setEmployee(updatedEmployee);
        setFormData(updatedEmployee);

        // Update localStorage
        localStorage.setItem(
          "employeeData",
          JSON.stringify(updatedEmployee)
        );

        // Notify EmployeeTopbar
        window.dispatchEvent(
          new Event("employeeProfileUpdated")
        );

        setIsEditing(false);

        alert(
          "Profile updated successfully!"
        );
      } else if (response?.user) {
        const updatedEmployee = {
          ...employee,
          ...response.user,
        };

        setEmployee(updatedEmployee);
        setFormData(updatedEmployee);

        localStorage.setItem(
          "employeeData",
          JSON.stringify(updatedEmployee)
        );

        window.dispatchEvent(
          new Event("employeeProfileUpdated")
        );

        setIsEditing(false);

        alert(
          "Profile updated successfully!"
        );
      } else {
        alert(
          response?.message ||
            "Profile update failed."
        );
      }
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      alert(
        error.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="employee-profile-page">
        <div className="employee-profile-header">
          <div>
            <h1>My Profile</h1>

            <p>
              Manage your personal and employee
              information
            </p>
          </div>
        </div>

        <div className="employee-profile-card">
          <p>
            Loading employee profile...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="employee-profile-page">

      {/* HEADER */}
      <div className="employee-profile-header">

        <div>

          <h1>
            My Profile
          </h1>

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

            <span>
              Edit Profile
            </span>
          </button>

        ) : (

          <div className="profile-action-buttons">

            <button
              type="button"
              className="profile-cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              <FaTimes />

              <span>
                Cancel
              </span>
            </button>

            <button
              type="button"
              className="profile-save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              <FaSave />

              <span>
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </span>
            </button>

          </div>

        )}

      </div>

      {/* PROFILE CARD */}
      <div className="employee-profile-card">

        {/* PROFILE TOP */}
        <div className="employee-profile-top">

          <div className="employee-profile-avatar">
            <FaUserCircle />
          </div>

          <div className="employee-profile-name">

            <h2>
              {employee.name || "Employee"}
            </h2>

            <span>
              {employee.role ||
                employee.department ||
                "Farm Employee"}
            </span>

            <small>
              Employee ID:{" "}
              {employee.employeeId ||
                employee.id ||
                "EMP001"}
            </small>

          </div>

        </div>

        {/* PERSONAL INFORMATION */}
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

            {/* NAME */}
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
                  {employee.name ||
                    "Employee"}
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
                  {employee.email ||
                    "Not provided"}
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
                  {employee.phone ||
                    "Not provided"}
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
                  {employee.address ||
                    "Not provided"}
                </div>

              )}

            </div>

          </div>

        </div>

        {/* EMPLOYEE INFORMATION */}
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
                {employee.employeeId ||
                  employee.id ||
                  "EMP001"}
              </div>

            </div>

            {/* POSITION */}
            <div className="profile-field">

              <label>
                <FaBriefcase />
                Position
              </label>

              <div className="profile-value">
                {employee.role ||
                  employee.department ||
                  "Farm Employee"}
              </div>

            </div>

            {/* DEPARTMENT */}
            <div className="profile-field">

              <label>
                <FaBriefcase />
                Department
              </label>

              <div className="profile-value">
                {employee.department ||
                  "Farm Operations"}
              </div>

            </div>

            {/* JOINING DATE */}
            <div className="profile-field">

              <label>
                <FaCalendarAlt />
                Joining Date
              </label>

              <div className="profile-value">
                {employee.joiningDate ||
                  "Not provided"}
              </div>

            </div>

          </div>

        </div>

        {/* ACCOUNT STATUS */}
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