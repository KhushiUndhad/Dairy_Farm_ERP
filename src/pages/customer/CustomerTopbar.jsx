import "./CustomerTopbar.css";

const CustomerTopbar = ({ onMenuClick }) => {

  return (
    <header className="customer-topbar">

      {/* LEFT SIDE */}

      <div className="customer-topbar-left">

        <button
          type="button"
          className="customer-menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>


        <div className="customer-page-title">

          <h2>
            Customer Dashboard
          </h2>

          <span>
            Dairy Farm Management System
          </span>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="customer-topbar-right">


        {/* NOTIFICATION */}

        <button
          type="button"
          className="customer-topbar-icon-button"
          aria-label="Notifications"
          onClick={() =>
            alert("No new notifications")
          }
        >
          🔔

          <span className="notification-dot">
          </span>

        </button>


        {/* PROFILE */}

        <div className="customer-topbar-profile">

          <div className="customer-topbar-avatar">
            👤
          </div>

          <div className="customer-topbar-user">

            <strong>
              John Customer
            </strong>

            <span>
              Customer
            </span>

          </div>

          <span className="customer-profile-arrow">
            ▼
          </span>

        </div>

      </div>

    </header>
  );
};

export default CustomerTopbar;