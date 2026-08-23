import { useMemo, useState } from "react";
import "./MilkProduction.css";

const getToday = () => new Date().toISOString().split("T")[0];

const initialRecords = [
  {
    id: 1,
    date: "2026-08-23",
    cow: "COW-001",
    cowName: "Lakshmi",
    morning: 8,
    evening: 7,
    price: 45,
  },
  {
    id: 2,
    date: "2026-08-23",
    cow: "COW-002",
    cowName: "Ganga",
    morning: 6.5,
    evening: 6,
    price: 45,
  },
  {
    id: 3,
    date: "2026-08-22",
    cow: "COW-003",
    cowName: "Sita",
    morning: 7,
    evening: 6.5,
    price: 46,
  },
];

const createEmptyForm = () => ({
  date: getToday(),
  cow: "",
  cowName: "",
  morning: "",
  evening: "",
  price: "45",
});

const MilkProduction = () => {
  const [records, setRecords] = useState(initialRecords);
  const [formData, setFormData] = useState(createEmptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // =========================
  // FILTER RECORDS
  // =========================
  const filteredRecords = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        record.cow.toLowerCase().includes(searchText) ||
        record.cowName.toLowerCase().includes(searchText);

      const matchesDate =
        filterDate === "" || record.date === filterDate;

      return matchesSearch && matchesDate;
    });
  }, [records, search, filterDate]);

  // =========================
  // SUMMARY
  // =========================
  const summary = useMemo(() => {
    const totalMorning = filteredRecords.reduce(
      (sum, record) => sum + Number(record.morning),
      0
    );

    const totalEvening = filteredRecords.reduce(
      (sum, record) => sum + Number(record.evening),
      0
    );

    const totalMilk = totalMorning + totalEvening;

    const totalAmount = filteredRecords.reduce((sum, record) => {
      const milk =
        Number(record.morning) + Number(record.evening);

      return sum + milk * Number(record.price);
    }, 0);

    return {
      totalMorning,
      totalEvening,
      totalMilk,
      totalAmount,
    };
  }, [filteredRecords]);

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.date ||
      !formData.cow.trim() ||
      !formData.cowName.trim() ||
      formData.morning === "" ||
      formData.evening === "" ||
      formData.price === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const morning = Number(formData.morning);
    const evening = Number(formData.evening);
    const price = Number(formData.price);

    if (
      !Number.isFinite(morning) ||
      !Number.isFinite(evening) ||
      !Number.isFinite(price) ||
      morning < 0 ||
      evening < 0 ||
      price < 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const cleanedRecord = {
      date: formData.date,
      cow: formData.cow.trim(),
      cowName: formData.cowName.trim(),
      morning,
      evening,
      price,
    };

    // =========================
    // EDIT EXISTING RECORD
    // =========================
    if (editingId !== null) {
      setRecords((current) =>
        current.map((record) =>
          record.id === editingId
            ? {
                ...record,
                ...cleanedRecord,
              }
            : record
        )
      );

      resetForm();
      return;
    }

    // =========================
    // ADD NEW RECORD
    // =========================
    setRecords((current) => {
      const nextId =
        current.length === 0
          ? 1
          : Math.max(...current.map((record) => record.id)) + 1;

      const newRecord = {
        id: nextId,
        ...cleanedRecord,
      };

      return [newRecord, ...current];
    });

    resetForm();
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (record) => {
    setEditingId(record.id);

    setFormData({
      date: record.date,
      cow: record.cow,
      cowName: record.cowName,
      morning: String(record.morning),
      evening: String(record.evening),
      price: String(record.price),
    });

    setShowForm(true);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this milk production record?"
    );

    if (!confirmed) {
      return;
    }

    setRecords((current) =>
      current.filter((record) => record.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData(createEmptyForm());
    setEditingId(null);
    setShowForm(false);
  };

  // =========================
  // OPEN ADD FORM
  // =========================
  const openAddForm = () => {
    setEditingId(null);
    setFormData(createEmptyForm());
    setShowForm(true);
  };

  // =========================
  // DATE FORMAT
  // =========================
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="milk-production-page">
      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="milk-page-header">
        <div>
          <h1>Milk Production</h1>

          <p>
            Track and manage daily milk production from your cows.
          </p>
        </div>

        <button
          type="button"
          className="add-milk-btn"
          onClick={openAddForm}
        >
          <span>+</span>
          Add Production
        </button>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================== */}
      <div className="milk-summary-grid">
        <div className="milk-summary-card">
          <div className="summary-icon">🥛</div>

          <div>
            <span>Total Milk</span>

            <strong>
              {summary.totalMilk.toFixed(1)} L
            </strong>
          </div>
        </div>

        <div className="milk-summary-card">
          <div className="summary-icon">🌅</div>

          <div>
            <span>Morning Milk</span>

            <strong>
              {summary.totalMorning.toFixed(1)} L
            </strong>
          </div>
        </div>

        <div className="milk-summary-card">
          <div className="summary-icon">🌙</div>

          <div>
            <span>Evening Milk</span>

            <strong>
              {summary.totalEvening.toFixed(1)} L
            </strong>
          </div>
        </div>

        <div className="milk-summary-card">
          <div className="summary-icon">💰</div>

          <div>
            <span>Total Value</span>

            <strong>
              ₹{summary.totalAmount.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>

      {/* =========================
          ADD / EDIT FORM
      ========================== */}
      {showForm && (
        <div className="milk-form-card">
          <div className="milk-form-header">
            <div>
              <h2>
                {editingId !== null
                  ? "Edit Milk Production"
                  : "Add Milk Production"}
              </h2>

              <p>
                Enter the morning and evening milk production
                details.
              </p>
            </div>

            <button
              type="button"
              className="close-form-btn"
              onClick={resetForm}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="milk-form-grid">
              {/* DATE */}
              <div className="form-group">
                <label htmlFor="milk-date">
                  Date
                </label>

                <input
                  id="milk-date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              {/* COW ID */}
              <div className="form-group">
                <label htmlFor="milk-cow">
                  Cow ID
                </label>

                <input
                  id="milk-cow"
                  type="text"
                  name="cow"
                  placeholder="Example: COW-001"
                  value={formData.cow}
                  onChange={handleChange}
                />
              </div>

              {/* COW NAME */}
              <div className="form-group">
                <label htmlFor="milk-cow-name">
                  Cow Name
                </label>

                <input
                  id="milk-cow-name"
                  type="text"
                  name="cowName"
                  placeholder="Example: Lakshmi"
                  value={formData.cowName}
                  onChange={handleChange}
                />
              </div>

              {/* MORNING */}
              <div className="form-group">
                <label htmlFor="milk-morning">
                  Morning Milk (L)
                </label>

                <input
                  id="milk-morning"
                  type="number"
                  name="morning"
                  min="0"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.morning}
                  onChange={handleChange}
                />
              </div>

              {/* EVENING */}
              <div className="form-group">
                <label htmlFor="milk-evening">
                  Evening Milk (L)
                </label>

                <input
                  id="milk-evening"
                  type="number"
                  name="evening"
                  min="0"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.evening}
                  onChange={handleChange}
                />
              </div>

              {/* PRICE */}
              <div className="form-group">
                <label htmlFor="milk-price">
                  Price / Litre (₹)
                </label>

                <input
                  id="milk-price"
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="45"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* FORM BUTTONS */}
            <div className="milk-form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-milk-btn"
              >
                {editingId !== null
                  ? "Update Production"
                  : "Save Production"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          TABLE CARD
      ========================== */}
      <div className="milk-table-card">
        {/* FILTER BAR */}
        <div className="milk-filter-bar">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search cow ID or name..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="date-filter">
            <label htmlFor="filter-date">
              Filter Date
            </label>

            <input
              id="filter-date"
              type="date"
              value={filterDate}
              onChange={(event) =>
                setFilterDate(event.target.value)
              }
            />
          </div>

          {(search || filterDate) && (
            <button
              type="button"
              className="clear-filter-btn"
              onClick={() => {
                setSearch("");
                setFilterDate("");
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* TABLE */}
        <div className="milk-table-wrapper">
          <table className="milk-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Cow</th>
                <th>Morning</th>
                <th>Evening</th>
                <th>Total Milk</th>
                <th>Price/L</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const morning = Number(record.morning);
                  const evening = Number(record.evening);
                  const price = Number(record.price);

                  const totalMilk = morning + evening;
                  const totalAmount = totalMilk * price;

                  return (
                    <tr key={record.id}>
                      {/* DATE */}
                      <td>
                        {formatDate(record.date)}
                      </td>

                      {/* COW */}
                      <td>
                        <div className="cow-info">
                          <div className="cow-avatar">
                            🐄
                          </div>

                          <div>
                            <strong>
                              {record.cowName}
                            </strong>

                            <small>
                              {record.cow}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* MORNING */}
                      <td>
                        <span className="morning-value">
                          {morning.toFixed(1)} L
                        </span>
                      </td>

                      {/* EVENING */}
                      <td>
                        <span className="evening-value">
                          {evening.toFixed(1)} L
                        </span>
                      </td>

                      {/* TOTAL */}
                      <td>
                        <strong className="total-milk-value">
                          {totalMilk.toFixed(1)} L
                        </strong>
                      </td>

                      {/* PRICE */}
                      <td>
                        ₹{price.toFixed(2)}
                      </td>

                      {/* AMOUNT */}
                      <td>
                        <strong>
                          ₹{totalAmount.toFixed(2)}
                        </strong>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(record)
                            }
                            title="Edit"
                          >
                            ✏️
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(record.id)
                            }
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="empty-state">
                      <div>🥛</div>

                      <h3>
                        No milk production records
                      </h3>

                      <p>
                        Add a production record to see it
                        here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="milk-table-footer">
          Showing{" "}
          <strong>{filteredRecords.length}</strong>{" "}
          record
          {filteredRecords.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default MilkProduction;