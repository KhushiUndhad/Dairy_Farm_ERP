import { useEffect, useState } from "react";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import {
  getCows,
  addCow,
  updateCow,
  deleteCow,
} from "../../services/api";

import "./CowManagement.css";

const CowManagement = () => {
  // ========================================
  // STATES
  // ========================================

  const [cows, setCows] = useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [editingCow, setEditingCow] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      breed: "",
      age: "",
      milk: "",
    });

  // ========================================
  // LOAD COWS FROM MONGODB
  // ========================================

  const loadCows = async () => {
    try {
      setLoading(true);

      const data = await getCows();

      console.log(
        "COWS FROM BACKEND:",
        data
      );

      setCows(
        data.map((cow, index) => ({
          ...cow,

          // MongoDB ID
          id: cow._id,

          // Display ID
          displayId: index + 1,
        }))
      );
    } catch (error) {
      console.error(
        "LOAD COWS ERROR:",
        error
      );

      alert(
        "Unable to load cows: " +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD DATA WHEN PAGE OPENS
  // ========================================

  useEffect(() => {
    loadCows();
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
  // OPEN ADD FORM
  // ========================================

  const handleAddCow = () => {
    setEditingCow(null);

    setFormData({
      name: "",
      breed: "",
      age: "",
      milk: "",
    });

    setShowForm(true);
  };

  // ========================================
  // OPEN EDIT FORM
  // ========================================

  const handleEdit = (cow) => {
    setEditingCow(cow);

    setFormData({
      name: cow.name,
      breed: cow.breed,
      age: cow.age,
      milk: cow.milk,
    });

    setShowForm(true);
  };

  // ========================================
  // SAVE / UPDATE COW
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (
      !formData.name.trim() ||
      !formData.breed.trim() ||
      !formData.age ||
      !formData.milk.trim()
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    try {
      setSaving(true);

      const cowData = {
        name: formData.name.trim(),

        breed: formData.breed.trim(),

        age: Number(formData.age),

        milk: formData.milk.trim(),
      };

      // ====================================
      // UPDATE
      // ====================================

      if (editingCow) {
        await updateCow(
          editingCow.id,
          cowData
        );

        alert(
          "Cow updated successfully"
        );
      }

      // ====================================
      // ADD
      // ====================================

      else {
        await addCow(cowData);

        alert(
          "Cow added successfully"
        );
      }

      // ====================================
      // RELOAD FROM DATABASE
      // ====================================

      await loadCows();

      // ====================================
      // CLOSE FORM
      // ====================================

      setShowForm(false);

      setEditingCow(null);

      setFormData({
        name: "",
        breed: "",
        age: "",
        milk: "",
      });
    } catch (error) {
      console.error(
        "SAVE COW ERROR:",
        error
      );

      alert(
        "Failed to save cow: " +
          error.message
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // DELETE COW
  // ========================================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this cow?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteCow(id);

      alert(
        "Cow deleted successfully"
      );

      await loadCows();
    } catch (error) {
      console.error(
        "DELETE COW ERROR:",
        error
      );

      alert(
        "Failed to delete cow: " +
          error.message
      );
    }
  };

  // ========================================
  // CLOSE FORM
  // ========================================

  const handleClose = () => {
    setShowForm(false);

    setEditingCow(null);

    setFormData({
      name: "",
      breed: "",
      age: "",
      milk: "",
    });
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="cow-management">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="page-header">

        <div>
          <h1>
            Cow Management
          </h1>

          <p>
            Manage all cows and their milk
            production
          </p>
        </div>

        <button
          className="add-cow-btn"
          onClick={handleAddCow}
        >
          <FaPlus />

          <span>
            Add Cow
          </span>
        </button>

      </div>

      {/* =====================================
          TABLE
      ====================================== */}

      <div className="cow-table-container">

        <table className="cow-table">

          <thead>
            <tr>

              <th>
                ID
              </th>

              <th>
                Name
              </th>

              <th>
                Breed
              </th>

              <th>
                Age
              </th>

              <th>
                Milk
              </th>

              <th>
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {/* LOADING */}

            {loading ? (

              <tr>
                <td
                  colSpan="6"
                  className="empty-table"
                >
                  Loading cows...
                </td>
              </tr>

            ) : cows.length > 0 ? (

              cows.map(
                (cow, index) => (

                  <tr
                    key={cow.id}
                  >

                    {/* ID */}

                    <td>
                      {index + 1}
                    </td>

                    {/* NAME */}

                    <td>
                      <strong>
                        {cow.name}
                      </strong>
                    </td>

                    {/* BREED */}

                    <td>
                      <span className="breed-badge">
                        {cow.breed}
                      </span>
                    </td>

                    {/* AGE */}

                    <td>
                      {cow.age} Years
                    </td>

                    {/* MILK */}

                    <td>
                      <span className="milk-value">
                        {cow.milk}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(
                              cow
                            )
                          }
                          title="Edit Cow"
                        >
                          <FaEdit />

                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              cow.id
                            )
                          }
                          title="Delete Cow"
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
                  colSpan="6"
                  className="empty-table"
                >
                  No cows available
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* =====================================
          ADD / EDIT MODAL
      ====================================== */}

      {showForm && (

        <div className="modal-overlay">

          <div className="cow-modal">

            {/* MODAL HEADER */}

            <div className="modal-header">

              <h2>
                {editingCow
                  ? "Edit Cow"
                  : "Add New Cow"}
              </h2>

              <button
                className="close-btn"
                onClick={
                  handleClose
                }
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
              className="cow-form"
            >

              {/* NAME */}

              <div className="form-group">

                <label>
                  Cow Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter cow name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* BREED */}

              <div className="form-group">

                <label>
                  Breed
                </label>

                <input
                  type="text"
                  name="breed"
                  placeholder="Enter breed"
                  value={
                    formData.breed
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* AGE */}

              <div className="form-group">

                <label>
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  min="0"
                  placeholder="Enter age"
                  value={
                    formData.age
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* MILK */}

              <div className="form-group">

                <label>
                  Milk Production
                </label>

                <input
                  type="text"
                  name="milk"
                  placeholder="Example: 12L"
                  value={
                    formData.milk
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
                    : editingCow
                    ? "Update Cow"
                    : "Save Cow"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default CowManagement;