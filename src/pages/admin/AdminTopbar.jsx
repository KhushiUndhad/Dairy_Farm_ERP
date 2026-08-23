import { useState } from "react";
import "./AdminTopbar.css";

const AdminTopbar = ({ toggleSidebar }) => {

  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="admin-topbar">

      {/* =================================
          LEFT
      ================================= */}

      <div className="topbar-left">

        {/* THREE LINE BUTTON */}

        <button
          type="button"
          className="menu-toggle"
          onClick={toggleSidebar}
          title="Open / Close Sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        {/* TITLE */}

        <div className="topbar-title">

          <strong>
            Dairy Farm ERP
          </strong>

          <small>
            Administration
          </small>

        </div>

      </div>


      {/* =================================
          ADMIN PROFILE
      ================================= */}

      <div className="admin-profile-wrapper">

        <button
          type="button"
          className="admin-profile-btn"
          onClick={() =>
            setShowProfile((prev) => !prev)
          }
        >

          <div className="admin-avatar">
            A
          </div>

          <div className="admin-profile-info">

            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

          <span className="profile-arrow">
            {showProfile ? "▲" : "▼"}
          </span>

        </button>


        {/* PROFILE DROPDOWN */}

        {showProfile && (

          <div className="profile-dropdown">

            <div className="dropdown-header">

              <div className="dropdown-avatar">
                A
              </div>

              <div>
                <strong>
                  Admin
                </strong>

                <span>
                  admin@dairyfarm.com
                </span>
              </div>

            </div>


            <div className="dropdown-divider"></div>


            <button
              type="button"
              className="dropdown-item"
            >
              <span>👤</span>
              My Profile
            </button>


            <button
              type="button"
              className="dropdown-item"
            >
              <span>⚙</span>
              Account Settings
            </button>


            <div className="dropdown-divider"></div>


            <button
              type="button"
              className="dropdown-logout"
            >
              <span>↪</span>
              Logout
            </button>

          </div>

        )}

      </div>

    </header>
  );
};

export default AdminTopbar;