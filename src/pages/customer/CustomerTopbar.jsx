import "./CustomerTopbar.css";

const CustomerTopbar = ({ onMenuClick }) => {

  return (
    <header className="customer-topbar">

      {/* =====================================
          LEFT SIDE
      ===================================== */}

      <div className="customer-topbar-left">

        {/* MENU BUTTON */}

        <button
          type="button"
          className="customer-menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          title="Toggle Sidebar"
        >
          ☰
        </button>


        {/* TITLE */}

        <div className="customer-page-title">

          <h2>
            Customer Dashboard
          </h2>

          <span>
            Dairy Farm Management System
          </span>

        </div>

      </div>


      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="customer-topbar-right">

        <div className="customer-topbar-profile">

          {/* AVATAR */}

          <div className="customer-topbar-avatar">
            👤
          </div>


          {/* USER */}

          <div className="customer-topbar-user">

            <strong>
              John Customer
            </strong>

            <span>
              Customer
            </span>

          </div>


          {/* ARROW */}

          <span className="customer-profile-arrow">
            ▼
          </span>

        </div>

      </div>

    </header>
  );
};

export default CustomerTopbar;