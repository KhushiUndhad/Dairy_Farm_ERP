import { useEffect, useState } from "react";

import {
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

import "./CustomerTopbar.css";

const CustomerTopbar = ({
  onMenuClick,
}) => {
  const getCustomer = () => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "customerUser"
        ) || "{}"
      );
    } catch {
      return {};
    }
  };

  const [customer, setCustomer] =
    useState(getCustomer());

  useEffect(() => {
    const updateCustomer = () => {
      setCustomer(getCustomer());
    };

    window.addEventListener(
      "customerProfileUpdated",
      updateCustomer
    );

    window.addEventListener(
      "storage",
      updateCustomer
    );

    return () => {
      window.removeEventListener(
        "customerProfileUpdated",
        updateCustomer
      );

      window.removeEventListener(
        "storage",
        updateCustomer
      );
    };
  }, []);

  const customerName =
    customer.name ||
    customer.fullName ||
    "Customer";

  return (
    <header className="customer-topbar">

      {/* MENU BUTTON */}

      <button
        type="button"
        className="customer-topbar-menu-button"
        onClick={onMenuClick}
      >
        <FaBars />
      </button>

      {/* PAGE TITLE */}

      <div className="customer-topbar-title">

        <h2>
          Customer Dashboard
        </h2>

        <p>
          Dairy Farm Management System
        </p>

      </div>

      {/* CUSTOMER PROFILE */}

      <div className="customer-topbar-profile">

        <div className="customer-topbar-avatar">
          <FaUserCircle />
        </div>

        <div className="customer-topbar-user">

          <strong>
            {customerName}
          </strong>

          <span>
            Customer
          </span>

        </div>

        <span className="customer-topbar-arrow">
          ▾
        </span>

      </div>

    </header>
  );
};

export default CustomerTopbar;