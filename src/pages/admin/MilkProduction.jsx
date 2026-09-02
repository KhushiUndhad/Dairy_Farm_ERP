import { useEffect, useState } from "react";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import {
  getMilkProduction,
  addMilkProduction,
  updateMilkProduction,
  deleteMilkProduction,
} from "../../services/api";

import "./MilkProduction.css";

const MilkProduction = () => {
  // ========================================
  // STATES
  // ========================================

  const [records, setRecords] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [editingRecord, setEditingRecord] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({
      date: "",
      cow: "",
      cowName: "",
      morning: "",
      evening: "",
      price: "",
    });

  // ========================================
  // LOAD DATA
  // ========================================

  const loadMilkProduction = async () => {
    try {
      setLoading(true);

      const data =
        await getMilkProduction();

      console.log(
        "MILK DATA:",
        data
      );

      setRecords(
        data.map((record) => ({
          ...record,
          id: record._id,
        }))
      );
    } catch (error) {
      console.error(
        "LOAD MILK ERROR:",
        error
      );

      alert(
        "Unable to load milk production: " +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // PAGE LOAD
  // ========================================

  useEffect(() => {
    loadMilkProduction();
  }, []);

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ========================================
  // ADD FORM
  // ========================================

  const handleAdd = () => {
    setEditingRecord(null);

    setFormData({
      date: "",
      cow: "",
      cowName: "",
      morning: "",
      evening: "",
      price: "",
    });

    setShowForm(true);
  };

  // ========================================
  // EDIT FORM
  // ========================================

  const handleEdit = (record) => {
    setEditingRecord(record);

    setFormData({
      date: record.date,
      cow: record.cow,
      cowName: record.cowName,
      morning: record.morning,
      evening: record.evening,
      price: record.price,
    });

    setShowForm(true);
  };

  // ========================================
  // SAVE
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.date ||
      !formData.cow.trim() ||
      !formData.cowName.trim() ||
      formData.morning === "" ||
      formData.evening === "" ||
      formData.price === ""
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    try {
      setSaving(true);

      const data = {
        date: formData.date,

        cow: formData.cow.trim(),

        cowName:
          formData.cowName.trim(),

        morning: Number(
          formData.morning
        ),

        evening: Number(
          formData.evening
        ),

        price: Number(
          formData.price
        ),
      };

      // UPDATE
      if (editingRecord) {
        await updateMilkProduction(
          editingRecord.id,
          data
        );

        alert(
          "Milk production updated successfully"
        );
      }

      // ADD
      else {
        await addMilkProduction(
          data
        );

        alert(
          "Milk production added successfully"
        );
      }

      // RELOAD
      await loadMilkProduction();

      // CLOSE
      handleClose();
    } catch (error) {
      console.error(
        "SAVE MILK ERROR:",
        error
      );

      alert(
        "Failed to save milk production: " +
          error.message
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // DELETE
  // ========================================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this record?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteMilkProduction(
        id
      );

      alert(
        "Milk production deleted successfully"
      );

      await loadMilkProduction();
    } catch (error) {
      console.error(
        "DELETE MILK ERROR:",
        error
      );

      alert(
        "Failed to delete record: " +
          error.message
      );
    }
  };

  // ========================================
  // CLOSE
  // ========================================

  const handleClose = () => {
    setShowForm(false);

    setEditingRecord(null);

    setFormData({
      date: "",
      cow: "",
      cowName: "",
      morning: "",
      evening: "",
      price: "",
    });
  };

  // ========================================
  // TOTAL MILK
  // ========================================

  const getTotalMilk = (record) => {
    return (
      Number(record.morning || 0) +
      Number(record.evening || 0)
    );
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="milk-production">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h1>
            Milk Production
          </h1>

          <p>
            Manage daily milk production
          </p>
        </div>

        <button
          className="add-cow-btn"
          onClick={handleAdd}
        >
          <FaPlus />

          <span>
            Add Production
          </span>
        </button>

      </div>

      {/* TABLE */}

      <div className="cow-table-container">

        <table className="cow-table">

          <thead>
            <tr>

              <th>
                ID
              </th>

              <th>
                Date
              </th>

              <th>
                Cow
              </th>

              <th>
                Morning
              </th>

              <th>
                Evening
              </th>

              <th>
                Total
              </th>

              <th>
                Price
              </th>

              <th>
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan="8"
                  className="empty-table"
                >
                  Loading...
                </td>
              </tr>

            ) : records.length > 0 ? (

              records.map(
                (record, index) => (

                  <tr
                    key={record.id}
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {record.date}
                    </td>

                    <td>
                      <strong>
                        {record.cowName}
                      </strong>
                    </td>

                    <td>
                      {record.morning} L
                    </td>

                    <td>
                      {record.evening} L
                    </td>

                    <td>
                      <strong>
                        {
                          getTotalMilk(
                            record
                          )
                        }{" "}
                        L
                      </strong>
                    </td>

                    <td>
                      ₹{record.price}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(
                              record
                            )
                          }
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              record.id
                            )
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="empty-table"
                >
                  No milk production
                  records available
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {showForm && (

        <div className="modal-overlay">

          <div className="cow-modal">

            <div className="modal-header">

              <h2>
                {editingRecord
                  ? "Edit Milk Production"
                  : "Add Milk Production"}
              </h2>

              <button
                className="close-btn"
                onClick={handleClose}
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="cow-form"
            >

              {/* DATE */}

              <div className="form-group">

                <label>
                  Date
                </label>

                <input
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

              {/* COW ID */}

              <div className="form-group">

                <label>
                  Cow ID
                </label>

                <input
                  type="text"
                  name="cow"
                  placeholder="Enter cow ID"
                  value={
                    formData.cow
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* COW NAME */}

              <div className="form-group">

                <label>
                  Cow Name
                </label>

                <input
                  type="text"
                  name="cowName"
                  placeholder="Enter cow name"
                  value={
                    formData.cowName
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* MORNING */}

              <div className="form-group">

                <label>
                  Morning Production (L)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  name="morning"
                  placeholder="Example: 6"
                  value={
                    formData.morning
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* EVENING */}

              <div className="form-group">

                <label>
                  Evening Production (L)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  name="evening"
                  placeholder="Example: 6"
                  value={
                    formData.evening
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* PRICE */}

              <div className="form-group">

                <label>
                  Price per Liter
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  placeholder="Example: 50"
                  value={
                    formData.price
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* BUTTONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={
                    handleClose
                  }
                  disabled={saving}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  <FaSave />

                  {saving
                    ? "Saving..."
                    : editingRecord
                    ? "Update"
                    : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default MilkProduction;