import { useEffect, useMemo, useState } from "react";
import "./Sales.css";

import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
  FaMoneyBillWave,
  FaGlassWhiskey,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import {
  getSales,
  addSale,
  updateSale,
  deleteSale,
} from "../../services/api";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const emptyForm = {
  invoiceNo: "",
  date: getToday(),
  customer: "",
  saleType: "Retail",
  quantity: "",
  price: "",
  paid: "",
  paymentMethod: "Cash",
  notes: "",
};

const Sales = () => {
  const [sales, setSales] = useState([]);

  const [formData, setFormData] =
    useState(emptyForm);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [paymentFilter, setPaymentFilter] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // ==========================================
  // LOAD SALES FROM MONGODB
  // ==========================================

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setLoading(true);

      const data = await getSales();

      const formattedSales = data.map(
        (sale) => ({
          ...sale,
          id: sale._id,
        })
      );

      setSales(formattedSales);
    } catch (error) {
      console.error(
        "LOAD SALES ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to load sales."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CALCULATE FORM TOTAL
  // ==========================================

  const quantity = Number(
    formData.quantity || 0
  );

  const price = Number(
    formData.price || 0
  );

  const formTotal =
    quantity * price;

  const paidAmount = Number(
    formData.paid || 0
  );

  const pendingAmount = Math.max(
    formTotal - paidAmount,
    0
  );

  // ==========================================
  // FILTER SALES
  // ==========================================

  const filteredSales = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return sales.filter((sale) => {
      const matchesSearch =
        String(
          sale.invoiceNo || ""
        )
          .toLowerCase()
          .includes(searchText) ||
        String(
          sale.customer || ""
        )
          .toLowerCase()
          .includes(searchText) ||
        String(
          sale.saleType || ""
        )
          .toLowerCase()
          .includes(searchText);

      const matchesPayment =
        paymentFilter === "" ||
        sale.paymentStatus ===
          paymentFilter;

      return (
        matchesSearch &&
        matchesPayment
      );
    });
  }, [
    sales,
    search,
    paymentFilter,
  ]);

  // ==========================================
  // SUMMARY
  // ==========================================

  const summary = useMemo(() => {
    const totalSales =
      sales.reduce(
        (sum, sale) =>
          sum +
          Number(sale.total || 0),
        0
      );

    const totalPaid =
      sales.reduce(
        (sum, sale) =>
          sum +
          Number(sale.paid || 0),
        0
      );

    const totalPending =
      sales.reduce(
        (sum, sale) =>
          sum +
          Math.max(
            Number(sale.total || 0) -
              Number(sale.paid || 0),
            0
          ),
        0
      );

    const totalLitres =
      sales.reduce(
        (sum, sale) =>
          sum +
          Number(
            sale.quantity || 0
          ),
        0
      );

    return {
      totalSales,
      totalPaid,
      totalPending,
      totalLitres,
    };
  }, [sales]);

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const openAddForm = () => {
    setEditingId(null);

    const nextNumber =
      sales.length + 1;

    setFormData({
      ...emptyForm,
      invoiceNo: `INV-${String(
        nextNumber
      ).padStart(3, "0")}`,
      date: getToday(),
    });

    setShowForm(true);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.invoiceNo.trim() ||
      !formData.date ||
      !formData.customer.trim() ||
      !formData.quantity ||
      !formData.price
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    const saleQuantity =
      Number(formData.quantity);

    const salePrice =
      Number(formData.price);

    const salePaid =
      Number(formData.paid || 0);

    if (saleQuantity <= 0) {
      alert(
        "Quantity must be greater than 0."
      );
      return;
    }

    if (salePrice <= 0) {
      alert(
        "Price must be greater than 0."
      );
      return;
    }

    if (salePaid < 0) {
      alert(
        "Paid amount cannot be negative."
      );
      return;
    }

    const total =
      saleQuantity * salePrice;

    if (salePaid > total) {
      alert(
        "Paid amount cannot be greater than total amount."
      );
      return;
    }

    let paymentStatus = "Pending";

    if (salePaid >= total) {
      paymentStatus = "Paid";
    } else if (salePaid > 0) {
      paymentStatus = "Partial";
    }

    const saleData = {
      invoiceNo:
        formData.invoiceNo.trim(),

      date: formData.date,

      customer:
        formData.customer.trim(),

      saleType:
        formData.saleType,

      quantity:
        saleQuantity,

      price:
        salePrice,

      total,

      paid:
        salePaid,

      paymentMethod:
        formData.paymentMethod,

      paymentStatus,

      notes:
        formData.notes.trim(),
    };

    try {
      setSaving(true);

      // ========================================
      // UPDATE
      // ========================================

      if (editingId !== null) {
        const updatedSale =
          await updateSale(
            editingId,
            saleData
          );

        setSales((current) =>
          current.map((sale) =>
            sale.id === editingId
              ? {
                  ...updatedSale,
                  id: updatedSale._id,
                }
              : sale
          )
        );

        alert(
          "Sale updated successfully."
        );

        resetForm();
        return;
      }

      // ========================================
      // ADD
      // ========================================

      const savedSale =
        await addSale(saleData);

      setSales((current) => [
        {
          ...savedSale,
          id: savedSale._id,
        },
        ...current,
      ]);

      alert(
        "Sale saved successfully."
      );

      resetForm();
    } catch (error) {
      console.error(
        "SAVE SALE ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to save sale."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (sale) => {
    setEditingId(sale.id);

    setFormData({
      invoiceNo:
        sale.invoiceNo || "",

      date:
        sale.date || getToday(),

      customer:
        sale.customer || "",

      saleType:
        sale.saleType || "Retail",

      quantity:
        String(sale.quantity || ""),

      price:
        String(sale.price || ""),

      paid:
        String(sale.paid || ""),

      paymentMethod:
        sale.paymentMethod ||
        "Cash",

      notes:
        sale.notes || "",
    });

    setShowForm(true);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this sale?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSale(id);

      setSales((current) =>
        current.filter(
          (sale) =>
            sale.id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      alert(
        "Sale deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE SALE ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to delete sale."
      );
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      date: getToday(),
    });

    setEditingId(null);
    setShowForm(false);
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // CURRENCY
  // ==========================================

  const currency = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="sales-page">
        <div className="sales-empty-state">
          <div>
            <FaMoneyBillWave />
          </div>

          <h3>
            Loading sales...
          </h3>

          <p>
            Please wait while sales
            are loaded from MongoDB.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sales-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="sales-page-header">

        <div>
          <h1>
            Sales Management
          </h1>

          <p>
            Manage milk sales, invoices,
            payments and customer
            transactions.
          </p>
        </div>

        <button
          type="button"
          className="add-sale-btn"
          onClick={openAddForm}
        >
          <span>
            <FaPlus />
          </span>

          New Sale
        </button>

      </div>

      {/* ========================================
          SUMMARY
      ======================================== */}

      <div className="sales-summary-grid">

        {/* TOTAL SALES */}

        <div className="sales-summary-card">

          <div className="sales-summary-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>
              Total Sales
            </span>

            <strong>
              {currency(
                summary.totalSales
              )}
            </strong>
          </div>

        </div>

        {/* TOTAL MILK */}

        <div className="sales-summary-card">

          <div className="sales-summary-icon">
            <FaGlassWhiskey />
          </div>

          <div>
            <span>
              Total Milk Sold
            </span>

            <strong>
              {summary.totalLitres.toLocaleString(
                "en-IN"
              )}{" "}
              L
            </strong>
          </div>

        </div>

        {/* TOTAL RECEIVED */}

        <div className="sales-summary-card">

          <div className="sales-summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>
              Total Received
            </span>

            <strong>
              {currency(
                summary.totalPaid
              )}
            </strong>
          </div>

        </div>

        {/* TOTAL PENDING */}

        <div className="sales-summary-card">

          <div className="sales-summary-icon">
            <FaClock />
          </div>

          <div>
            <span>
              Total Pending
            </span>

            <strong className="sales-pending-total">
              {currency(
                summary.totalPending
              )}
            </strong>
          </div>

        </div>

      </div>

      {/* ========================================
          FORM
      ======================================== */}

      {showForm && (
        <div className="sales-form-card">

          <div className="sales-form-header">

            <div>

              <h2>
                {editingId !== null
                  ? "Edit Sale"
                  : "Create New Sale"}
              </h2>

              <p>
                Enter the milk sale and
                payment details.
              </p>

            </div>

            <button
              type="button"
              className="sales-close-btn"
              onClick={resetForm}
            >
              <FaTimes />
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
          >

            <div className="sales-form-grid">

              {/* INVOICE */}

              <div className="sales-form-group">

                <label htmlFor="invoiceNo">
                  Invoice Number
                </label>

                <input
                  id="invoiceNo"
                  type="text"
                  name="invoiceNo"
                  value={
                    formData.invoiceNo
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="INV-001"
                />

              </div>

              {/* DATE */}

              <div className="sales-form-group">

                <label htmlFor="saleDate">
                  Sale Date
                </label>

                <input
                  id="saleDate"
                  type="date"
                  name="date"
                  value={
                    formData.date
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* CUSTOMER */}

              <div className="sales-form-group">

                <label htmlFor="customer">
                  Customer
                </label>

                <input
                  id="customer"
                  type="text"
                  name="customer"
                  value={
                    formData.customer
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Customer name"
                />

              </div>

              {/* SALE TYPE */}

              <div className="sales-form-group">

                <label htmlFor="saleType">
                  Sale Type
                </label>

                <select
                  id="saleType"
                  name="saleType"
                  value={
                    formData.saleType
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="Retail">
                    Retail
                  </option>

                  <option value="Wholesale">
                    Wholesale
                  </option>

                  <option value="Distributor">
                    Distributor
                  </option>

                </select>

              </div>

              {/* QUANTITY */}

              <div className="sales-form-group">

                <label htmlFor="quantity">
                  Milk Quantity (Litres)
                </label>

                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  min="0"
                  step="0.1"
                  value={
                    formData.quantity
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: 25"
                />

              </div>

              {/* PRICE */}

              <div className="sales-form-group">

                <label htmlFor="price">
                  Price / Litre (₹)
                </label>

                <input
                  id="price"
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={
                    formData.price
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: 55"
                />

              </div>

              {/* PAID */}

              <div className="sales-form-group">

                <label htmlFor="paid">
                  Paid Amount (₹)
                </label>

                <input
                  id="paid"
                  type="number"
                  name="paid"
                  min="0"
                  step="0.01"
                  value={
                    formData.paid
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: 1000"
                />

              </div>

              {/* PAYMENT METHOD */}

              <div className="sales-form-group">

                <label htmlFor="paymentMethod">
                  Payment Method
                </label>

                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={
                    formData.paymentMethod
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                  <option value="Card">
                    Card
                  </option>

                </select>

              </div>

              {/* TOTAL */}

              <div className="sales-calculation-box">

                <span>
                  Total Amount
                </span>

                <strong>
                  {currency(
                    formTotal
                  )}
                </strong>

              </div>

              {/* PENDING */}

              <div className="sales-calculation-box pending">

                <span>
                  Pending Amount
                </span>

                <strong>
                  {currency(
                    pendingAmount
                  )}
                </strong>

              </div>

              {/* NOTES */}

              <div className="sales-form-group sales-notes-group">

                <label htmlFor="notes">
                  Notes
                </label>

                <input
                  id="notes"
                  type="text"
                  name="notes"
                  value={
                    formData.notes
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Optional notes"
                />

              </div>

            </div>

            {/* FORM ACTIONS */}

            <div className="sales-form-actions">

              <button
                type="button"
                className="sales-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="sales-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                  ? "Update Sale"
                  : "Save Sale"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ========================================
          TABLE
      ======================================== */}

      <div className="sales-table-card">

        {/* FILTER BAR */}

        <div className="sales-filter-bar">

          <div className="sales-search-box">

            <span>
              <FaSearch />
            </span>

            <input
              type="text"
              placeholder="Search invoice or customer..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          <select
            className="sales-payment-filter"
            value={
              paymentFilter
            }
            onChange={(event) =>
              setPaymentFilter(
                event.target.value
              )
            }
          >

            <option value="">
              All Payments
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Partial">
              Partial
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

          {(search ||
            paymentFilter) && (
            <button
              type="button"
              className="sales-clear-btn"
              onClick={() => {
                setSearch("");
                setPaymentFilter("");
              }}
            >
              Clear
            </button>
          )}

        </div>

        {/* TABLE */}

        <div className="sales-table-wrapper">

          <table className="sales-table">

            <thead>

              <tr>

                <th>
                  Invoice
                </th>

                <th>
                  Date
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Type
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Rate
                </th>

                <th>
                  Total
                </th>

                <th>
                  Paid
                </th>

                <th>
                  Pending
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSales.length > 0 ? (

                filteredSales.map(
                  (sale) => {

                    const pending =
                      Math.max(
                        Number(
                          sale.total || 0
                        ) -
                          Number(
                            sale.paid || 0
                          ),
                        0
                      );

                    return (
                      <tr
                        key={sale.id}
                      >

                        {/* INVOICE */}

                        <td>

                          <strong className="sales-invoice">
                            {
                              sale.invoiceNo
                            }
                          </strong>

                        </td>

                        {/* DATE */}

                        <td>
                          {formatDate(
                            sale.date
                          )}
                        </td>

                        {/* CUSTOMER */}

                        <td>

                          <div className="sales-customer">

                            <div className="sales-customer-avatar">
                              {sale.customer
                                ?.charAt(
                                  0
                                )
                                .toUpperCase()}
                            </div>

                            <strong>
                              {
                                sale.customer
                              }
                            </strong>

                          </div>

                        </td>

                        {/* TYPE */}

                        <td>

                          <span className="sales-type">
                            {
                              sale.saleType
                            }
                          </span>

                        </td>

                        {/* QUANTITY */}

                        <td>

                          <strong>
                            {
                              sale.quantity
                            }{" "}
                            L
                          </strong>

                        </td>

                        {/* RATE */}

                        <td>
                          {currency(
                            sale.price
                          )}
                        </td>

                        {/* TOTAL */}

                        <td>

                          <strong>
                            {currency(
                              sale.total
                            )}
                          </strong>

                        </td>

                        {/* PAID */}

                        <td className="sales-paid">
                          {currency(
                            sale.paid
                          )}
                        </td>

                        {/* PENDING */}

                        <td>

                          <strong
                            className={
                              pending > 0
                                ? "sales-pending"
                                : "sales-clear"
                            }
                          >
                            {currency(
                              pending
                            )}
                          </strong>

                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`sales-payment-status ${
                              sale.paymentStatus ===
                              "Paid"
                                ? "paid"
                                : sale.paymentStatus ===
                                  "Partial"
                                ? "partial"
                                : "pending"
                            }`}
                          >
                            {
                              sale.paymentStatus
                            }
                          </span>

                        </td>

                        {/* ACTIONS */}

                        <td>

                          <div className="sales-action-buttons">

                            <button
                              type="button"
                              className="sales-edit-btn"
                              onClick={() =>
                                handleEdit(
                                  sale
                                )
                              }
                              title="Edit"
                            >
                              <FaEdit />
                            </button>

                            <button
                              type="button"
                              className="sales-delete-btn"
                              onClick={() =>
                                handleDelete(
                                  sale.id
                                )
                              }
                              title="Delete"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td colSpan="11">

                    <div className="sales-empty-state">

                      <div>
                        <FaMoneyBillWave />
                      </div>

                      <h3>
                        No sales found
                      </h3>

                      <p>
                        Add a new sale or
                        change your search
                        filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="sales-table-footer">

          Showing{" "}

          <strong>
            {
              filteredSales.length
            }
          </strong>{" "}

          sale
          {filteredSales.length !==
          1
            ? "s"
            : ""}

        </div>

      </div>

    </div>
  );
};

export default Sales;