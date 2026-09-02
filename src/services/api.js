// ========================================
// API BASE URL
// ========================================

const API_BASE_URL = "http://localhost:5000/api";

// ========================================
// COMMON API REQUEST FUNCTION
// ========================================

const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong"
      );
    }

    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

// ========================================
// COW API
// ========================================

// GET ALL COWS
export const getCows = async () => {
  return await apiRequest(
    `${API_BASE_URL}/cows`
  );
};

// ADD COW
export const addCow = async (cowData) => {
  return await apiRequest(
    `${API_BASE_URL}/cows`,
    {
      method: "POST",
      body: JSON.stringify(cowData),
    }
  );
};

// UPDATE COW
export const updateCow = async (id, cowData) => {
  return await apiRequest(
    `${API_BASE_URL}/cows/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(cowData),
    }
  );
};

// DELETE COW
export const deleteCow = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/cows/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// MILK PRODUCTION API
// ========================================

// GET ALL MILK PRODUCTION
export const getMilkProduction = async () => {
  return await apiRequest(
    `${API_BASE_URL}/milk-production`
  );
};

// ADD MILK PRODUCTION
export const addMilkProduction = async (milkData) => {
  return await apiRequest(
    `${API_BASE_URL}/milk-production`,
    {
      method: "POST",
      body: JSON.stringify(milkData),
    }
  );
};

// UPDATE MILK PRODUCTION
export const updateMilkProduction = async (
  id,
  milkData
) => {
  return await apiRequest(
    `${API_BASE_URL}/milk-production/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(milkData),
    }
  );
};

// DELETE MILK PRODUCTION
export const deleteMilkProduction = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/milk-production/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// EMPLOYEE API
// ========================================

// GET ALL EMPLOYEES
export const getEmployees = async () => {
  return await apiRequest(
    `${API_BASE_URL}/employees`
  );
};

// ADD EMPLOYEE
export const addEmployee = async (employeeData) => {
  return await apiRequest(
    `${API_BASE_URL}/employees`,
    {
      method: "POST",
      body: JSON.stringify(employeeData),
    }
  );
};

// UPDATE EMPLOYEE
export const updateEmployee = async (
  id,
  employeeData
) => {
  return await apiRequest(
    `${API_BASE_URL}/employees/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(employeeData),
    }
  );
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/employees/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// CUSTOMER API
// ========================================

// GET ALL CUSTOMERS
export const getCustomers = async () => {
  return await apiRequest(
    `${API_BASE_URL}/customers`
  );
};

// ADD CUSTOMER
export const addCustomer = async (customerData) => {
  return await apiRequest(
    `${API_BASE_URL}/customers`,
    {
      method: "POST",
      body: JSON.stringify(customerData),
    }
  );
};

// UPDATE CUSTOMER
export const updateCustomer = async (
  id,
  customerData
) => {
  return await apiRequest(
    `${API_BASE_URL}/customers/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(customerData),
    }
  );
};

// DELETE CUSTOMER
export const deleteCustomer = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/customers/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// INVENTORY API
// ========================================

// GET ALL INVENTORY
export const getInventory = async () => {
  return await apiRequest(
    `${API_BASE_URL}/inventory`
  );
};

// ADD INVENTORY
export const addInventory = async (inventoryData) => {
  return await apiRequest(
    `${API_BASE_URL}/inventory`,
    {
      method: "POST",
      body: JSON.stringify(inventoryData),
    }
  );
};

// UPDATE INVENTORY
export const updateInventory = async (
  id,
  inventoryData
) => {
  return await apiRequest(
    `${API_BASE_URL}/inventory/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(inventoryData),
    }
  );
};

// DELETE INVENTORY
export const deleteInventory = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/inventory/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// SALES API
// ========================================

// GET ALL SALES
export const getSales = async () => {
  return await apiRequest(
    `${API_BASE_URL}/sales`
  );
};

// ADD SALE
export const addSale = async (saleData) => {
  return await apiRequest(
    `${API_BASE_URL}/sales`,
    {
      method: "POST",
      body: JSON.stringify(saleData),
    }
  );
};

// UPDATE SALE
export const updateSale = async (
  id,
  saleData
) => {
  return await apiRequest(
    `${API_BASE_URL}/sales/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(saleData),
    }
  );
};

// DELETE SALE
export const deleteSale = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/sales/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// ATTENDANCE API
// ========================================

// GET ALL ATTENDANCE
export const getAttendance = async () => {
  return await apiRequest(
    `${API_BASE_URL}/attendance`
  );
};

// ADD ATTENDANCE
export const addAttendance = async (
  attendanceData
) => {
  return await apiRequest(
    `${API_BASE_URL}/attendance`,
    {
      method: "POST",
      body: JSON.stringify(attendanceData),
    }
  );
};

// UPDATE ATTENDANCE
export const updateAttendance = async (
  id,
  attendanceData
) => {
  return await apiRequest(
    `${API_BASE_URL}/attendance/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(attendanceData),
    }
  );
};

// DELETE ATTENDANCE
export const deleteAttendance = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/attendance/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// LEAVE API
// ========================================

// GET ALL LEAVES
export const getLeaves = async () => {
  return await apiRequest(
    `${API_BASE_URL}/leaves`
  );
};

// ADD LEAVE
export const addLeave = async (leaveData) => {
  return await apiRequest(
    `${API_BASE_URL}/leaves`,
    {
      method: "POST",
      body: JSON.stringify(leaveData),
    }
  );
};

// UPDATE LEAVE
export const updateLeave = async (
  id,
  leaveData
) => {
  return await apiRequest(
    `${API_BASE_URL}/leaves/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(leaveData),
    }
  );
};

// DELETE LEAVE
export const deleteLeave = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/leaves/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// SALARY API
// ========================================

// GET ALL SALARIES
export const getSalaries = async () => {
  return await apiRequest(
    `${API_BASE_URL}/salaries`
  );
};

// ADD SALARY
export const addSalary = async (salaryData) => {
  return await apiRequest(
    `${API_BASE_URL}/salaries`,
    {
      method: "POST",
      body: JSON.stringify(salaryData),
    }
  );
};

// UPDATE SALARY
export const updateSalary = async (
  id,
  salaryData
) => {
  return await apiRequest(
    `${API_BASE_URL}/salaries/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(salaryData),
    }
  );
};

// DELETE SALARY
export const deleteSalary = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/salaries/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// WORK API
// ========================================

// GET ALL WORK
export const getWork = async () => {
  return await apiRequest(
    `${API_BASE_URL}/work`
  );
};

// ADD WORK
export const addWork = async (workData) => {
  return await apiRequest(
    `${API_BASE_URL}/work`,
    {
      method: "POST",
      body: JSON.stringify(workData),
    }
  );
};

// UPDATE WORK
export const updateWork = async (
  id,
  workData
) => {
  return await apiRequest(
    `${API_BASE_URL}/work/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(workData),
    }
  );
};

// DELETE WORK
export const deleteWork = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/work/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// ORDER API
// ========================================

// GET ALL ORDERS
export const getOrders = async () => {
  return await apiRequest(
    `${API_BASE_URL}/orders`
  );
};

// ADD ORDER
export const addOrder = async (orderData) => {
  return await apiRequest(
    `${API_BASE_URL}/orders`,
    {
      method: "POST",
      body: JSON.stringify(orderData),
    }
  );
};

// UPDATE ORDER
export const updateOrder = async (
  id,
  orderData
) => {
  return await apiRequest(
    `${API_BASE_URL}/orders/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(orderData),
    }
  );
};

// DELETE ORDER
export const deleteOrder = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/orders/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// PAYMENT API
// ========================================

// GET ALL PAYMENTS
export const getPayments = async () => {
  return await apiRequest(
    `${API_BASE_URL}/payments`
  );
};

// ADD PAYMENT
export const addPayment = async (
  paymentData
) => {
  return await apiRequest(
    `${API_BASE_URL}/payments`,
    {
      method: "POST",
      body: JSON.stringify(paymentData),
    }
  );
};

// UPDATE PAYMENT
export const updatePayment = async (
  id,
  paymentData
) => {
  return await apiRequest(
    `${API_BASE_URL}/payments/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(paymentData),
    }
  );
};

// DELETE PAYMENT
export const deletePayment = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/payments/${id}`,
    {
      method: "DELETE",
    }
  );
};

// ========================================
// DASHBOARD API
// ========================================

export const getDashboardSummary = async () => {
  return await apiRequest(
    `${API_BASE_URL}/dashboard/summary`
  );
};

// ========================================
// REPORT API
// ========================================

export const getReportsOverview = async () => {
  return await apiRequest(
    `${API_BASE_URL}/reports/overview`
  );
};
