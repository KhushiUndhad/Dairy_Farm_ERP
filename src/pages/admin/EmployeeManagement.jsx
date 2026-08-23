import { useMemo, useState } from "react";
import "./EmployeeManagement.css";

const getToday = () => new Date().toISOString().split("T")[0];

const initialEmployees = [
  {
    id: 1,
    employeeId: "EMP-001",
    name: "Ravi Kumar",
    phone: "9876543210",
    role: "Farm Manager",
    salary: 28000,
    joiningDate: "2025-06-15",
    status: "Active",
  },
  {
    id: 2,
    employeeId: "EMP-002",
    name: "Suresh",
    phone: "9876543211",
    role: "Cow Caretaker",
    salary: 22000,
    joiningDate: "2025-08-10",
    status: "Active",
  },
  {
    id: 3,
    employeeId: "EMP-003",
    name: "Manoj",
    phone: "9876543212",
    role: "Milking Staff",
    salary: 20000,
    joiningDate: "2026-01-20",
    status: "Active",
  },
  {
    id: 4,
    employeeId: "EMP-004",
    name: "Arun",
    phone: "9876543213",
    role: "Farm Worker",
    salary: 18000,
    joiningDate: "2025-11-05",
    status: "Inactive",
  },
];

const createEmptyForm = () => ({
  employeeId: "",
  name: "",
  phone: "",
  role: "",
  salary: "",
  joiningDate: getToday(),
  status: "Active",
});

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [formData, setFormData] = useState(createEmptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // =========================
  // FILTER EMPLOYEES
  // =========================
  const filteredEmployees = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch =
        employee.employeeId.toLowerCase().includes(searchText) ||
        employee.name.toLowerCase().includes(searchText) ||
        employee.phone.includes(searchText) ||
        employee.role.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "" ||
        employee.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employees, search, statusFilter]);

  // =========================
  // SUMMARY
  // =========================
  const summary = useMemo(() => {
    const total = employees.length;

    const active = employees.filter(
      (employee) => employee.status === "Active"
    ).length;

    const inactive = employees.filter(
      (employee) => employee.status === "Inactive"
    ).length;

    const monthlySalary = employees
      .filter((employee) => employee.status === "Active")
      .reduce(
        (sum, employee) => sum + Number(employee.salary),
        0
      );

    return {
      total,
      active,
      inactive,
      monthlySalary,
    };
  }, [employees]);

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
  // SUBMIT
  // =========================
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.employeeId.trim() ||
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.role.trim() ||
      formData.salary === "" ||
      !formData.joiningDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const salary = Number(formData.salary);

    if (!Number.isFinite(salary) || salary < 0) {
      alert("Please enter a valid salary.");
      return;
    }

    const phone = formData.phone.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const employeeData = {
      employeeId: formData.employeeId.trim(),
      name: formData.name.trim(),
      phone,
      role: formData.role.trim(),
      salary,
      joiningDate: formData.joiningDate,
      status: formData.status,
    };

    // EDIT
    if (editingId !== null) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                ...employeeData,
              }
            : employee
        )
      );

      resetForm();
      return;
    }

    // ADD
    setEmployees((current) => {
      const nextId =
        current.length === 0
          ? 1
          : Math.max(...current.map((employee) => employee.id)) + 1;

      return [
        {
          id: nextId,
          ...employeeData,
        },
        ...current,
      ];
    });

    resetForm();
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setFormData({
      employeeId: employee.employeeId,
      name: employee.name,
      phone: employee.phone,
      role: employee.role,
      salary: String(employee.salary),
      joiningDate: employee.joiningDate,
      status: employee.status,
    });

    setShowForm(true);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    setEmployees((current) =>
      current.filter((employee) => employee.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  };

  // =========================
  // RESET
  // =========================
  const resetForm = () => {
    setFormData(createEmptyForm());
    setEditingId(null);
    setShowForm(false);
  };

  // =========================
  // OPEN ADD
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
    <div className="employee-page">

      {/* HEADER */}
      <div className="employee-page-header">
        <div>
          <h1>Employee Management</h1>
          <p>
            Manage farm employees, roles, salaries and employment status.
          </p>
        </div>

        <button
          type="button"
          className="add-employee-btn"
          onClick={openAddForm}
        >
          <span>+</span>
          Add Employee
        </button>
      </div>

      {/* SUMMARY */}
      <div className="employee-summary-grid">

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            👥
          </div>

          <div>
            <span>Total Employees</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            ✅
          </div>

          <div>
            <span>Active Employees</span>
            <strong>{summary.active}</strong>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            ⏸️
          </div>

          <div>
            <span>Inactive Employees</span>
            <strong>{summary.inactive}</strong>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            💰
          </div>

          <div>
            <span>Monthly Salary</span>
            <strong>
              ₹{summary.monthlySalary.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="employee-form-card">

          <div className="employee-form-header">
            <div>
              <h2>
                {editingId !== null
                  ? "Edit Employee"
                  : "Add Employee"}
              </h2>

              <p>
                Enter employee information below.
              </p>
            </div>

            <button
              type="button"
              className="employee-close-btn"
              onClick={resetForm}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="employee-form-grid">

              {/* EMPLOYEE ID */}
              <div className="employee-form-group">
                <label htmlFor="employeeId">
                  Employee ID
                </label>

                <input
                  id="employeeId"
                  type="text"
                  name="employeeId"
                  placeholder="Example: EMP-005"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </div>

              {/* NAME */}
              <div className="employee-form-group">
                <label htmlFor="employeeName">
                  Employee Name
                </label>

                <input
                  id="employeeName"
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* PHONE */}
              <div className="employee-form-group">
                <label htmlFor="employeePhone">
                  Phone Number
                </label>

                <input
                  id="employeePhone"
                  type="tel"
                  name="phone"
                  placeholder="10 digit mobile number"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* ROLE */}
              <div className="employee-form-group">
                <label htmlFor="employeeRole">
                  Role
                </label>

                <select
                  id="employeeRole"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">
                    Select role
                  </option>
                  <option value="Farm Manager">
                    Farm Manager
                  </option>
                  <option value="Cow Caretaker">
                    Cow Caretaker
                  </option>
                  <option value="Milking Staff">
                    Milking Staff
                  </option>
                  <option value="Farm Worker">
                    Farm Worker
                  </option>
                  <option value="Driver">
                    Driver
                  </option>
                  <option value="Veterinary Assistant">
                    Veterinary Assistant
                  </option>
                </select>
              </div>

              {/* SALARY */}
              <div className="employee-form-group">
                <label htmlFor="employeeSalary">
                  Monthly Salary (₹)
                </label>

                <input
                  id="employeeSalary"
                  type="number"
                  name="salary"
                  min="0"
                  step="100"
                  placeholder="Example: 25000"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              {/* JOINING DATE */}
              <div className="employee-form-group">
                <label htmlFor="joiningDate">
                  Joining Date
                </label>

                <input
                  id="joiningDate"
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
              </div>

              {/* STATUS */}
              <div className="employee-form-group">
                <label htmlFor="employeeStatus">
                  Status
                </label>

                <select
                  id="employeeStatus"
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

            </div>

            {/* FORM BUTTONS */}
            <div className="employee-form-actions">

              <button
                type="button"
                className="employee-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="employee-save-btn"
              >
                {editingId !== null
                  ? "Update Employee"
                  : "Save Employee"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="employee-table-card">

        {/* FILTER BAR */}
        <div className="employee-filter-bar">

          <div className="employee-search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            className="employee-status-filter"
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
              className="employee-clear-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("");
              }}
            >
              Clear
            </button>
          )}

        </div>

        {/* TABLE */}
        <div className="employee-table-wrapper">

          <table className="employee-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>

                    {/* EMPLOYEE */}
                    <td>
                      <div className="employee-info">

                        <div className="employee-avatar">
                          {employee.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {employee.name}
                          </strong>

                          <small>
                            {employee.employeeId}
                          </small>
                        </div>

                      </div>
                    </td>

                    {/* PHONE */}
                    <td>
                      {employee.phone}
                    </td>

                    {/* ROLE */}
                    <td>
                      <span className="employee-role">
                        {employee.role}
                      </span>
                    </td>

                    {/* SALARY */}
                    <td>
                      <strong>
                        ₹
                        {Number(
                          employee.salary
                        ).toLocaleString("en-IN")}
                      </strong>
                    </td>

                    {/* JOINING DATE */}
                    <td>
                      {formatDate(
                        employee.joiningDate
                      )}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`employee-status ${
                          employee.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="employee-action-buttons">

                        <button
                          type="button"
                          className="employee-edit-btn"
                          onClick={() =>
                            handleEdit(employee)
                          }
                          title="Edit"
                        >
                          ✏️
                        </button>

                        <button
                          type="button"
                          className="employee-delete-btn"
                          onClick={() =>
                            handleDelete(employee.id)
                          }
                          title="Delete"
                        >
                          🗑️
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">

                    <div className="employee-empty-state">
                      <div>👥</div>

                      <h3>
                        No employees found
                      </h3>

                      <p>
                        Add an employee or change
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
        <div className="employee-table-footer">
          Showing{" "}
          <strong>
            {filteredEmployees.length}
          </strong>{" "}
          employee
          {filteredEmployees.length !== 1
            ? "s"
            : ""}
        </div>

      </div>

    </div>
  );
};

export default EmployeeManagement;