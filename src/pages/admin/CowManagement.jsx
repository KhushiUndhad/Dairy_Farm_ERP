import { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
//   FaCow,
} from "react-icons/fa";

import "./CowManagement.css";

const CowManagement = () => {

  const [cows, setCows] = useState([
    {
      id: 1,
      name: "Ganga",
      breed: "Gir",
      age: 5,
      milk: "12L",
    },
    {
      id: 2,
      name: "Radha",
      breed: "HF",
      age: 4,
      milk: "15L",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [editingCow, setEditingCow] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    milk: "",
  });


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // ==========================================
  // OPEN ADD FORM
  // ==========================================

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


  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

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


  // ==========================================
  // SAVE COW
  // ==========================================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.breed ||
      !formData.age ||
      !formData.milk
    ) {
      alert("Please fill all fields");
      return;
    }


    // EDIT
    if (editingCow) {

      setCows(
        cows.map((cow) =>
          cow.id === editingCow.id
            ? {
                ...cow,
                name: formData.name,
                breed: formData.breed,
                age: formData.age,
                milk: formData.milk,
              }
            : cow
        )
      );

    }

    // ADD
    else {

      const newCow = {
        id:
          cows.length > 0
            ? Math.max(...cows.map((cow) => cow.id)) + 1
            : 1,

        name: formData.name,
        breed: formData.breed,
        age: formData.age,
        milk: formData.milk,
      };

      setCows([...cows, newCow]);
    }


    setShowForm(false);

    setEditingCow(null);

    setFormData({
      name: "",
      breed: "",
      age: "",
      milk: "",
    });
  };


  // ==========================================
  // DELETE COW
  // ==========================================

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cow?"
    );

    if (!confirmDelete) return;

    setCows(
      cows.filter((cow) => cow.id !== id)
    );
  };


  // ==========================================
  // CLOSE FORM
  // ==========================================

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


  return (
    <div className="cow-management">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="page-header">

        <div>
          <h1>Cow Management</h1>

          <p>
            Manage all cows and their milk production
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
              <th>ID</th>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Milk</th>
              <th>Action</th>
            </tr>

          </thead>


          <tbody>

            {cows.length > 0 ? (

              cows.map((cow) => (

                <tr key={cow.id}>

                  <td>
                    {cow.id}
                  </td>

                  <td>
                    <strong>
                      {cow.name}
                    </strong>
                  </td>

                  <td>
                    <span className="breed-badge">
                      {cow.breed}
                    </span>
                  </td>

                  <td>
                    {cow.age} Years
                  </td>

                  <td>
                    <span className="milk-value">
                      {cow.milk}
                    </span>
                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(cow)
                        }
                        title="Edit Cow"
                      >
                        <FaEdit />
                        Edit
                      </button>


                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(cow.id)
                        }
                        title="Delete Cow"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

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
                onClick={handleClose}
              >
                <FaTimes />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.breed}
                  onChange={handleChange}
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
                  value={formData.age}
                  onChange={handleChange}
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
                  value={formData.milk}
                  onChange={handleChange}
                />

              </div>


              {/* BUTTONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleClose}
                >
                  <FaTimes />

                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-btn"
                >
                  <FaSave />

                  {editingCow
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