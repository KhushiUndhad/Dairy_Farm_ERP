import { useMemo, useState } from "react";
import "./Inventory.css";

const initialInventory = [
  {
    id: 1,
    itemCode: "INV-001",
    itemName: "Cattle Feed",
    category: "Feed",
    quantity: 250,
    unit: "Kg",
    minStock: 100,
    price: 32,
    supplier: "Green Feed Suppliers",
    lastUpdated: "2026-08-22",
  },
  {
    id: 2,
    itemCode: "INV-002",
    itemName: "Mineral Mixture",
    category: "Medicine",
    quantity: 45,
    unit: "Kg",
    minStock: 20,
    price: 180,
    supplier: "Farm Care",
    lastUpdated: "2026-08-21",
  },
  {
    id: 3,
    itemCode: "INV-003",
    itemName: "Milk Can 40L",
    category: "Equipment",
    quantity: 12,
    unit: "Pieces",
    minStock: 5,
    price: 850,
    supplier: "Dairy Equipment Store",
    lastUpdated: "2026-08-20",
  },
  {
    id: 4,
    itemCode: "INV-004",
    itemName: "Cleaning Liquid",
    category: "Cleaning",
    quantity: 8,
    unit: "Litres",
    minStock: 10,
    price: 120,
    supplier: "Clean Farm",
    lastUpdated: "2026-08-19",
  },
];

const emptyForm = {
  itemCode: "",
  itemName: "",
  category: "Feed",
  quantity: "",
  unit: "Kg",
  minStock: "",
  price: "",
  supplier: "",
};

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const Inventory = () => {
  const [inventory, setInventory] =
    useState(initialInventory);

  const [formData, setFormData] =
    useState(emptyForm);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  // ==========================================
  // FILTER INVENTORY
  // ==========================================

  const filteredInventory = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return inventory.filter((item) => {
      const matchesSearch =
        item.itemCode
          .toLowerCase()
          .includes(searchText) ||
        item.itemName
          .toLowerCase()
          .includes(searchText) ||
        item.category
          .toLowerCase()
          .includes(searchText) ||
        item.supplier
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        categoryFilter === "" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    inventory,
    search,
    categoryFilter,
  ]);

  // ==========================================
  // SUMMARY
  // ==========================================

  const summary = useMemo(() => {
    const totalItems = inventory.length;

    const totalStockValue =
      inventory.reduce(
        (sum, item) =>
          sum +
          Number(item.quantity || 0) *
            Number(item.price || 0),
        0
      );

    const lowStockItems =
      inventory.filter(
        (item) =>
          Number(item.quantity) > 0 &&
          Number(item.quantity) <=
            Number(item.minStock)
      ).length;

    const outOfStockItems =
      inventory.filter(
        (item) =>
          Number(item.quantity) <= 0
      ).length;

    const totalQuantity =
      inventory.reduce(
        (sum, item) =>
          sum + Number(item.quantity || 0),
        0
      );

    return {
      totalItems,
      totalStockValue,
      lowStockItems,
      outOfStockItems,
      totalQuantity,
    };
  }, [inventory]);

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
    const nextNumber =
      inventory.length + 1;

    setEditingId(null);

    setFormData({
      ...emptyForm,
      itemCode: `INV-${String(
        nextNumber
      ).padStart(3, "0")}`,
    });

    setShowForm(true);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.itemCode.trim() ||
      !formData.itemName.trim() ||
      !formData.quantity ||
      !formData.minStock ||
      !formData.price ||
      !formData.supplier.trim()
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    const quantity =
      Number(formData.quantity);

    const minStock =
      Number(formData.minStock);

    const price =
      Number(formData.price);

    if (quantity < 0) {
      alert(
        "Quantity cannot be negative."
      );
      return;
    }

    if (minStock < 0) {
      alert(
        "Minimum stock cannot be negative."
      );
      return;
    }

    if (price < 0) {
      alert(
        "Price cannot be negative."
      );
      return;
    }

    const itemData = {
      itemCode:
        formData.itemCode.trim(),

      itemName:
        formData.itemName.trim(),

      category:
        formData.category,

      quantity,

      unit:
        formData.unit,

      minStock,

      price,

      supplier:
        formData.supplier.trim(),

      lastUpdated: getToday(),
    };

    // UPDATE
    if (editingId !== null) {
      setInventory((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...itemData,
              }
            : item
        )
      );

      resetForm();
      return;
    }

    // ADD
    setInventory((current) => {
      const nextId =
        current.length === 0
          ? 1
          : Math.max(
              ...current.map(
                (item) => item.id
              )
            ) + 1;

      return [
        {
          id: nextId,
          ...itemData,
        },
        ...current,
      ];
    });

    resetForm();
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      itemCode: item.itemCode,
      itemName: item.itemName,
      category: item.category,
      quantity: String(
        item.quantity
      ),
      unit: item.unit,
      minStock: String(
        item.minStock
      ),
      price: String(
        item.price
      ),
      supplier: item.supplier,
    });

    setShowForm(true);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this inventory item?"
      );

    if (!confirmed) {
      return;
    }

    setInventory((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    if (editingId === id) {
      resetForm();
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
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
  // DATE FORMAT
  // ==========================================

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

  // ==========================================
  // STOCK STATUS
  // ==========================================

  const getStockStatus = (item) => {
    const quantity =
      Number(item.quantity);

    const minStock =
      Number(item.minStock);

    if (quantity <= 0) {
      return "Out of Stock";
    }

    if (quantity <= minStock) {
      return "Low Stock";
    }

    return "In Stock";
  };

  // ==========================================
  // STOCK VALUE
  // ==========================================

  const getStockValue = (item) => {
    return (
      Number(item.quantity || 0) *
      Number(item.price || 0)
    );
  };

  return (
    <div className="inventory-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="inventory-page-header">

        <div>
          <h1>
            Inventory Management
          </h1>

          <p>
            Manage feed, equipment,
            medicines and farm supplies.
          </p>
        </div>

        <button
          type="button"
          className="add-inventory-btn"
          onClick={openAddForm}
        >
          <span>+</span>
          Add Inventory
        </button>

      </div>

      {/* ========================================
          SUMMARY
      ======================================== */}

      <div className="inventory-summary-grid">

        {/* TOTAL ITEMS */}

        <div className="inventory-summary-card">

          <div className="inventory-summary-icon">
            📦
          </div>

          <div>
            <span>
              Total Items
            </span>

            <strong>
              {summary.totalItems}
            </strong>
          </div>

        </div>

        {/* STOCK VALUE */}

        <div className="inventory-summary-card">

          <div className="inventory-summary-icon">
            💰
          </div>

          <div>
            <span>
              Stock Value
            </span>

            <strong>
              {currency(
                summary.totalStockValue
              )}
            </strong>
          </div>

        </div>

        {/* LOW STOCK */}

        <div className="inventory-summary-card">

          <div className="inventory-summary-icon low">
            ⚠️
          </div>

          <div>
            <span>
              Low Stock
            </span>

            <strong className="low-stock-number">
              {summary.lowStockItems}
            </strong>
          </div>

        </div>

        {/* OUT OF STOCK */}

        <div className="inventory-summary-card">

          <div className="inventory-summary-icon out">
            🚫
          </div>

          <div>
            <span>
              Out of Stock
            </span>

            <strong className="out-stock-number">
              {summary.outOfStockItems}
            </strong>
          </div>

        </div>

      </div>

      {/* ========================================
          ADD / EDIT FORM
      ======================================== */}

      {showForm && (
        <div className="inventory-form-card">

          <div className="inventory-form-header">

            <div>

              <h2>
                {editingId !== null
                  ? "Edit Inventory"
                  : "Add Inventory Item"}
              </h2>

              <p>
                Enter inventory item details
                below.
              </p>

            </div>

            <button
              type="button"
              className="inventory-close-btn"
              onClick={resetForm}
            >
              ×
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
          >

            <div className="inventory-form-grid">

              {/* ITEM CODE */}

              <div className="inventory-form-group">

                <label>
                  Item Code
                </label>

                <input
                  type="text"
                  name="itemCode"
                  value={
                    formData.itemCode
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="INV-001"
                />

              </div>

              {/* ITEM NAME */}

              <div className="inventory-form-group">

                <label>
                  Item Name
                </label>

                <input
                  type="text"
                  name="itemName"
                  value={
                    formData.itemName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Cattle Feed"
                />

              </div>

              {/* CATEGORY */}

              <div className="inventory-form-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="Feed">
                    Feed
                  </option>

                  <option value="Medicine">
                    Medicine
                  </option>

                  <option value="Equipment">
                    Equipment
                  </option>

                  <option value="Cleaning">
                    Cleaning
                  </option>

                  <option value="Packaging">
                    Packaging
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* QUANTITY */}

              <div className="inventory-form-group">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  min="0"
                  step="0.01"
                  value={
                    formData.quantity
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="100"
                />

              </div>

              {/* UNIT */}

              <div className="inventory-form-group">

                <label>
                  Unit
                </label>

                <select
                  name="unit"
                  value={
                    formData.unit
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="Kg">
                    Kg
                  </option>

                  <option value="Litres">
                    Litres
                  </option>

                  <option value="Pieces">
                    Pieces
                  </option>

                  <option value="Packets">
                    Packets
                  </option>

                  <option value="Bags">
                    Bags
                  </option>

                  <option value="Boxes">
                    Boxes
                  </option>

                </select>

              </div>

              {/* MIN STOCK */}

              <div className="inventory-form-group">

                <label>
                  Minimum Stock
                </label>

                <input
                  type="number"
                  name="minStock"
                  min="0"
                  step="0.01"
                  value={
                    formData.minStock
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="20"
                />

              </div>

              {/* PRICE */}

              <div className="inventory-form-group">

                <label>
                  Price / Unit (₹)
                </label>

                <input
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
                  placeholder="50"
                />

              </div>

              {/* SUPPLIER */}

              <div className="inventory-form-group">

                <label>
                  Supplier
                </label>

                <input
                  type="text"
                  name="supplier"
                  value={
                    formData.supplier
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Supplier name"
                />

              </div>

            </div>

            {/* FORM ACTIONS */}

            <div className="inventory-form-actions">

              <button
                type="button"
                className="inventory-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inventory-save-btn"
              >
                {editingId !== null
                  ? "Update Item"
                  : "Save Item"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ========================================
          INVENTORY TABLE
      ======================================== */}

      <div className="inventory-table-card">

        {/* FILTER BAR */}

        <div className="inventory-filter-bar">

          <div className="inventory-search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search inventory..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          <select
            className="inventory-category-filter"
            value={
              categoryFilter
            }
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >

            <option value="">
              All Categories
            </option>

            <option value="Feed">
              Feed
            </option>

            <option value="Medicine">
              Medicine
            </option>

            <option value="Equipment">
              Equipment
            </option>

            <option value="Cleaning">
              Cleaning
            </option>

            <option value="Packaging">
              Packaging
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {(search ||
            categoryFilter) && (
            <button
              type="button"
              className="inventory-clear-btn"
              onClick={() => {
                setSearch("");
                setCategoryFilter("");
              }}
            >
              Clear
            </button>
          )}

        </div>

        {/* TABLE */}

        <div className="inventory-table-wrapper">

          <table className="inventory-table">

            <thead>

              <tr>

                <th>
                  Item Code
                </th>

                <th>
                  Item
                </th>

                <th>
                  Category
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Min Stock
                </th>

                <th>
                  Price
                </th>

                <th>
                  Stock Value
                </th>

                <th>
                  Supplier
                </th>

                <th>
                  Status
                </th>

                <th>
                  Updated
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredInventory.length >
              0 ? (

                filteredInventory.map(
                  (item) => {

                    const status =
                      getStockStatus(
                        item
                      );

                    return (
                      <tr
                        key={item.id}
                      >

                        {/* CODE */}

                        <td>

                          <strong className="inventory-code">
                            {
                              item.itemCode
                            }
                          </strong>

                        </td>

                        {/* ITEM */}

                        <td>

                          <div className="inventory-item">

                            <div className="inventory-item-icon">
                              📦
                            </div>

                            <strong>
                              {
                                item.itemName
                              }
                            </strong>

                          </div>

                        </td>

                        {/* CATEGORY */}

                        <td>

                          <span className="inventory-category">
                            {
                              item.category
                            }
                          </span>

                        </td>

                        {/* QUANTITY */}

                        <td>

                          <strong>
                            {
                              item.quantity
                            }{" "}
                            {
                              item.unit
                            }
                          </strong>

                        </td>

                        {/* MIN STOCK */}

                        <td>
                          {
                            item.minStock
                          }{" "}
                          {
                            item.unit
                          }
                        </td>

                        {/* PRICE */}

                        <td>
                          {currency(
                            item.price
                          )}
                        </td>

                        {/* VALUE */}

                        <td>

                          <strong>
                            {currency(
                              getStockValue(
                                item
                              )
                            )}
                          </strong>

                        </td>

                        {/* SUPPLIER */}

                        <td>
                          {
                            item.supplier
                          }
                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`inventory-status ${
                              status ===
                              "In Stock"
                                ? "in-stock"
                                : status ===
                                  "Low Stock"
                                ? "low-stock"
                                : "out-of-stock"
                            }`}
                          >
                            {status}
                          </span>

                        </td>

                        {/* DATE */}

                        <td>
                          {formatDate(
                            item.lastUpdated
                          )}
                        </td>

                        {/* ACTIONS */}

                        <td>

                          <div className="inventory-actions">

                            <button
                              type="button"
                              className="inventory-edit-btn"
                              onClick={() =>
                                handleEdit(
                                  item
                                )
                              }
                              title="Edit"
                            >
                              ✏️
                            </button>

                            <button
                              type="button"
                              className="inventory-delete-btn"
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              title="Delete"
                            >
                              🗑️
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="11"
                  >

                    <div className="inventory-empty">

                      <div>
                        📦
                      </div>

                      <h3>
                        No inventory found
                      </h3>

                      <p>
                        Add inventory or
                        change your
                        search filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="inventory-table-footer">

          Showing{" "}
          <strong>
            {
              filteredInventory.length
            }
          </strong>{" "}
          of{" "}
          <strong>
            {inventory.length}
          </strong>{" "}
          inventory items

        </div>

      </div>

    </div>
  );
};

export default Inventory;