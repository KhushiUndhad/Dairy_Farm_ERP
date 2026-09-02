import { useEffect, useMemo, useState } from "react";
import "./CustomerManagement.css";

import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaMoneyBillWave,
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/api";

// ========================================
// TODAY'S DATE
// ========================================

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

// ========================================
// EMPTY FORM
// ========================================

const emptyForm = {
  customerId: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  customerType: "Regular",
  balance: "",
  joiningDate: getToday(),
  status: "Active",
};

// ========================================
// CUSTOMER MANAGEMENT
// ========================================

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState(emptyForm);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // ========================================
  // LOAD CUSTOMERS FROM MONGODB
  // ========================================

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getCustomers();

        const formattedCustomers = Array.isArray(data)
          ? data.map((customer) => ({
              ...customer,
              id: customer._id || customer.id,
            }))
          : [];

        setCustomers(formattedCustomers);
      } catch (error) {
        console.error("LOAD CUSTOMERS ERROR:", error);

        alert(
          error.message ||
            "Failed to load customers from server."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // ========================================
  // FILTER CUSTOMERS
  // ========================================

  const filteredCustomers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const customerId = String(
        customer.customerId || ""
      ).toLowerCase();

      const name = String(
        customer.name || ""
      ).toLowerCase();

      const phone = String(
        customer.phone || ""
      );

      const email = String(
        customer.email || ""
      ).toLowerCase();

      const address = String(
        customer.address || ""
      ).toLowerCase();

      const matchesSearch =
        customerId.includes(searchText) ||
        name.includes(searchText) ||
        phone.includes(searchText) ||
        email.includes(searchText) ||
        address.includes(searchText);

      const matchesStatus =
        statusFilter === "" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  // ========================================
  // SUMMARY
  // ========================================

  const summary = useMemo(() => {
    const total = customers.length;

    const active = customers.filter(
      (customer) => customer.status === "Active"
    ).length;

    const inactive = customers.filter(
      (customer) => customer.status === "Inactive"
    ).length;

    const outstanding = customers.reduce(
      (sum, customer) =>
        sum + Number(customer.balance || 0),
      0
    );

    return {
      total,
      active,
      inactive,
      outstanding,
    };
  }, [customers]);

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ========================================
  // OPEN ADD FORM
  // ========================================

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      ...emptyForm,
      joiningDate: getToday(),
    });

    setShowForm(true);
  };

  // ========================================
  // SUBMIT FORM
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ----------------------------------------
    // REQUIRED FIELD VALIDATION
    // ----------------------------------------

    if (
      !formData.customerId.trim() ||
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.joiningDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // ----------------------------------------
    // PHONE VALIDATION
    // ----------------------------------------

    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      alert(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    // ----------------------------------------
    // EMAIL VALIDATION
    // ----------------------------------------

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    // ----------------------------------------
    // BALANCE VALIDATION
    // ----------------------------------------

    const balance = Number(formData.balance || 0);

    if (!Number.isFinite(balance) || balance < 0) {
      alert(
        "Please enter a valid outstanding balance."
      );
      return;
    }

    // ----------------------------------------
    // CUSTOMER DATA
    // ----------------------------------------

    const customerData = {
      customerId: formData.customerId.trim(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      customerType: formData.customerType,
      balance,
      joiningDate: formData.joiningDate,
      status: formData.status,
    };

    try {
      setSaving(true);

      // ======================================
      // UPDATE CUSTOMER
      // ======================================

      if (editingId !== null) {
        const updatedCustomer = await updateCustomer(
          editingId,
          customerData
        );

        const formattedCustomer = {
          ...updatedCustomer,
          id:
            updatedCustomer._id ||
            updatedCustomer.id ||
            editingId,
        };

        setCustomers((current) =>
          current.map((customer) =>
            customer.id === editingId
              ? formattedCustomer
              : customer
          )
        );

        alert("Customer updated successfully.");

        resetForm();

        return;
      }

      // ======================================
      // ADD CUSTOMER
      // ======================================

      const savedCustomer = await addCustomer(
        customerData
      );

      const formattedCustomer = {
        ...savedCustomer,
        id:
          savedCustomer._id ||
          savedCustomer.id,
      };

      setCustomers((current) => [
        formattedCustomer,
        ...current,
      ]);

      alert("Customer added successfully.");

      resetForm();
    } catch (error) {
      console.error(
        "SAVE CUSTOMER ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to save customer."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // EDIT CUSTOMER
  // ========================================

  const handleEdit = (customer) => {
    setEditingId(customer.id);

    setFormData({
      customerId: customer.customerId || "",
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      customerType:
        customer.customerType || "Regular",
      balance: String(customer.balance || 0),
      joiningDate:
        customer.joiningDate || getToday(),
      status: customer.status || "Active",
    });

    setShowForm(true);
  };

  // ========================================
  // DELETE CUSTOMER
  // ========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCustomer(id);

      setCustomers((current) =>
        current.filter(
          (customer) => customer.id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      alert("Customer deleted successfully.");
    } catch (error) {
      console.error(
        "DELETE CUSTOMER ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to delete customer."
      );
    }
  };

  // ========================================
  // RESET FORM
  // ========================================

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      joiningDate: getToday(),
    });

    setEditingId(null);

    setShowForm(false);
  };

  // ========================================
  // DATE FORMAT
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="customer-page">
        <div className="customer-empty-state">
          <FaUsers size={40} />

          <h3>
            Loading Customers...
          </h3>

          <p>
            Please wait while customers are
            loaded from MongoDB.
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="customer-page">

      {/* ================= HEADER ================= */}

      <div className="customer-page-header">

        <div>
          <h1>Customer Management</h1>

          <p>
            Manage dairy customers, contact details,
            balances and customer status.
          </p>
        </div>

        <button
          type="button"
          className="add-customer-btn"
          onClick={openAddForm}
        >
          <FaPlus />

          <span>
            Add Customer
          </span>
        </button>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="customer-summary-grid">

        <div className="customer-summary-card">

          <div className="customer-summary-icon">
            <FaUsers />
          </div>

          <div>
            <span>Total Customers</span>

            <strong>
              {summary.total}
            </strong>
          </div>

        </div>

        <div className="customer-summary-card">

          <div className="customer-summary-icon">
            <FaUserCheck />
          </div>

          <div>
            <span>Active Customers</span>

            <strong>
              {summary.active}
            </strong>
          </div>

        </div>

        <div className="customer-summary-card">

          <div className="customer-summary-icon">
            <FaUserClock />
          </div>

          <div>
            <span>Inactive Customers</span>

            <strong>
              {summary.inactive}
            </strong>
          </div>

        </div>

        <div className="customer-summary-card">

          <div className="customer-summary-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>Total Outstanding</span>

            <strong>
              ₹
              {summary.outstanding.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

        </div>

      </div>

      {/* ================= FORM ================= */}

      {showForm && (
        <div className="customer-form-card">

          <div className="customer-form-header">

            <div>
              <h2>
                {editingId !== null
                  ? "Edit Customer"
                  : "Add Customer"}
              </h2>

              <p>
                Enter customer information below.
              </p>
            </div>

            <button
              type="button"
              className="customer-close-btn"
              onClick={resetForm}
            >
              <FaTimes />
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="customer-form-grid">

              {/* CUSTOMER ID */}

              <div className="customer-form-group">

                <label htmlFor="customerId">
                  Customer ID
                </label>

                <input
                  id="customerId"
                  type="text"
                  name="customerId"
                  placeholder="Example: CUS-005"
                  value={formData.customerId}
                  onChange={handleChange}
                />

              </div>

              {/* NAME */}

              <div className="customer-form-group">

                <label htmlFor="customerName">
                  Customer Name
                </label>

                <input
                  id="customerName"
                  type="text"
                  name="name"
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              {/* PHONE */}

              <div className="customer-form-group">

                <label htmlFor="customerPhone">
                  Phone Number
                </label>

                <input
                  id="customerPhone"
                  type="tel"
                  name="phone"
                  placeholder="10 digit mobile number"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              {/* EMAIL */}

              <div className="customer-form-group">

                <label htmlFor="customerEmail">
                  Email
                </label>

                <input
                  id="customerEmail"
                  type="email"
                  name="email"
                  placeholder="customer@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

              {/* CUSTOMER TYPE */}

              <div className="customer-form-group">

                <label htmlFor="customerType">
                  Customer Type
                </label>

                <select
                  id="customerType"
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                >
                  <option value="Regular">
                    Regular
                  </option>

                  <option value="Wholesale">
                    Wholesale
                  </option>

                  <option value="Retail">
                    Retail
                  </option>

                  <option value="Distributor">
                    Distributor
                  </option>
                </select>

              </div>

              {/* BALANCE */}

              <div className="customer-form-group">

                <label htmlFor="customerBalance">
                  Outstanding Balance (₹)
                </label>

                <input
                  id="customerBalance"
                  type="number"
                  name="balance"
                  min="0"
                  step="100"
                  placeholder="Example: 2500"
                  value={formData.balance}
                  onChange={handleChange}
                />

              </div>

              {/* JOINING DATE */}

              <div className="customer-form-group">

                <label htmlFor="customerJoiningDate">
                  Joining Date
                </label>

                <input
                  id="customerJoiningDate"
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                />

              </div>

              {/* STATUS */}

              <div className="customer-form-group">

                <label htmlFor="customerStatus">
                  Status
                </label>

                <select
                  id="customerStatus"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

              {/* ADDRESS */}

              <div className="customer-form-group customer-address-group">

                <label htmlFor="customerAddress">
                  Address
                </label>

                <input
                  id="customerAddress"
                  type="text"
                  name="address"
                  placeholder="Enter customer address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* FORM BUTTONS */}

            <div className="customer-form-actions">

              <button
                type="button"
                className="customer-cancel-btn"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="customer-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                  ? "Update Customer"
                  : "Save Customer"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="customer-table-card">

        {/* FILTER */}

        <div className="customer-filter-bar">

          <div className="customer-search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <select
            className="customer-status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

          {(search || statusFilter) && (
            <button
              type="button"
              className="customer-clear-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("");
              }}
            >
              <FaTimesCircle />

              Clear
            </button>
          )}

        </div>

        {/* TABLE */}

        <div className="customer-table-wrapper">

          <table className="customer-table">

            <thead>

              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Address</th>
                <th>Balance</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer) => (

                  <tr key={customer.id}>

                    {/* CUSTOMER */}

                    <td>

                      <div className="customer-info">

                        <div className="customer-avatar">
                          {String(
                            customer.name || "C"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {customer.name}
                          </strong>

                          <small>
                            {customer.customerId}
                          </small>

                        </div>

                      </div>

                    </td>

                    {/* PHONE */}

                    <td>
                      {customer.phone}
                    </td>

                    {/* TYPE */}

                    <td>

                      <span className="customer-type">
                        {customer.customerType}
                      </span>

                    </td>

                    {/* ADDRESS */}

                    <td>
                      {customer.address}
                    </td>

                    {/* BALANCE */}

                    <td>

                      <strong
                        className={
                          Number(customer.balance) > 0
                            ? "customer-balance-due"
                            : "customer-balance-clear"
                        }
                      >
                        ₹
                        {Number(
                          customer.balance || 0
                        ).toLocaleString("en-IN")}
                      </strong>

                    </td>

                    {/* DATE */}

                    <td>
                      {formatDate(
                        customer.joiningDate
                      )}
                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`customer-status ${
                          customer.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {customer.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="customer-action-buttons">

                        <button
                          type="button"
                          className="customer-edit-btn"
                          onClick={() =>
                            handleEdit(customer)
                          }
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          className="customer-delete-btn"
                          onClick={() =>
                            handleDelete(customer.id)
                          }
                          title="Delete"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="8">

                    <div className="customer-empty-state">

                      <FaUsers size={40} />

                      <h3>
                        No customers found
                      </h3>

                      <p>
                        Add a customer or change
                        your search filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="customer-table-footer">

          Showing{" "}

          <strong>
            {filteredCustomers.length}
          </strong>{" "}

          customer
          {filteredCustomers.length !== 1
            ? "s"
            : ""}

        </div>

      </div>

    </div>
  );
};

export default CustomerManagement;