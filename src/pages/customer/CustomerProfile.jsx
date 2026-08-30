import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLock,
  FaUser,
  FaSave,
  FaEdit,
} from "react-icons/fa";

import "./CustomerProfile.css";

function CustomerProfile() {
  const [formData, setFormData] = useState({
    name: "John Customer",
    email: "johncustomer@gmail.com",
    phone: "+91 98765 43210",
    address: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380001",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="customer-profile-page">

      {/* PAGE HEADER */}
      <div className="profile-page-heading">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information and account settings.</p>
        </div>

        {!isEditing && (
          <button
            className="profile-edit-button"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
            Edit Profile
          </button>
        )}
      </div>


      {/* MAIN PROFILE AREA */}
      <div className="profile-main-grid">

        {/* =====================================
            LEFT PROFILE CARD
        ===================================== */}
        <div className="profile-user-card">

          <div className="profile-user-top">

            <div className="profile-user-avatar">
              <FaUser />
            </div>

            <h2>John Customer</h2>

            <span className="profile-role">
              Customer
            </span>

          </div>


          {/* USER INFORMATION */}
          <div className="profile-contact-list">

            {/* EMAIL */}
            <div className="profile-contact-item">

              <div className="profile-contact-icon">
                <FaEnvelope />
              </div>

              <div className="profile-contact-content">
                <span className="profile-contact-label">
                  Email
                </span>

                <strong className="profile-contact-value">
                  johncustomer@gmail.com
                </strong>
              </div>

            </div>


            {/* PHONE */}
            <div className="profile-contact-item">

              <div className="profile-contact-icon">
                <FaPhone />
              </div>

              <div className="profile-contact-content">
                <span className="profile-contact-label">
                  Phone
                </span>

                <strong className="profile-contact-value">
                  +91 98765 43210
                </strong>
              </div>

            </div>


            {/* LOCATION */}
            <div className="profile-contact-item">

              <div className="profile-contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="profile-contact-content">
                <span className="profile-contact-label">
                  Location
                </span>

                <strong className="profile-contact-value">
                  Ahmedabad, Gujarat
                </strong>
              </div>

            </div>


            {/* CUSTOMER SINCE */}
            <div className="profile-contact-item">

              <div className="profile-contact-icon">
                <FaCalendarAlt />
              </div>

              <div className="profile-contact-content">
                <span className="profile-contact-label">
                  Customer Since
                </span>

                <strong className="profile-contact-value">
                  January 2026
                </strong>
              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            RIGHT PERSONAL INFORMATION
        ===================================== */}
        <div className="profile-information-card">

          <div className="profile-section-header">

            <div>
              <h2>Personal Information</h2>

              <p>
                Update your personal information below.
              </p>
            </div>

          </div>


          <div className="profile-divider"></div>


          {/* FORM */}
          <div className="profile-form">

            {/* FULL NAME + EMAIL */}
            <div className="profile-form-row">

              <div className="profile-form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

              </div>


              <div className="profile-form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

              </div>

            </div>


            {/* PHONE */}
            <div className="profile-form-row">

              <div className="profile-form-group">

                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

              </div>

              <div></div>

            </div>


            {/* ADDRESS */}
            <div className="profile-form-group full-width">

              <label>Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
              ></textarea>

            </div>


            {/* CITY + STATE */}
            <div className="profile-form-row">

              <div className="profile-form-group">

                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

              </div>


              <div className="profile-form-group">

                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

              </div>

            </div>


            {/* PINCODE */}
            <div className="profile-form-row">

              <div className="profile-form-group">

                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

              </div>

              <div></div>

            </div>


            {/* SAVE BUTTON */}
            {isEditing && (
              <div className="profile-save-area">

                <button
                  className="profile-cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

                <button
                  className="profile-save-button"
                  onClick={handleSave}
                >
                  <FaSave />
                  Save Changes
                </button>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =====================================
          ACCOUNT SECURITY
      ===================================== */}
      <div className="profile-security-card">

        <div className="security-icon">
          <FaLock />
        </div>

        <div className="security-content">

          <h3>Account Security</h3>

          <p>
            Keep your account information secure and make
            sure your contact details are always up to date.
          </p>

        </div>

        <button
          className="change-password-button"
          onClick={() => alert("Change Password")}
        >
          Change Password
        </button>

      </div>

    </div>
  );
}

export default CustomerProfile;