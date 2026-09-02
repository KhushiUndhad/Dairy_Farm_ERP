// ========================================
// API BASE URL
// ========================================

const API_BASE_URL = "http://localhost:5000/api";

// ========================================
// COMMON API REQUEST FUNCTION
// ========================================

const apiRequest = async (url, options = {}) => {
  try {
    const token = localStorage.getItem("employeeToken");

    const response = await fetch(url, {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    });

    let data = {};

    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

// ========================================
// AUTHENTICATION API
// ========================================

// ========================================
// EMPLOYEE REGISTER
// ========================================

export const employeeRegister = async (employeeData) => {
  return await apiRequest(
    `${API_BASE_URL}/auth/employee-register`,
    {
      method: "POST",

      body: JSON.stringify({
        name:
          employeeData.name?.trim() || "",

        email:
          employeeData.email
            ?.trim()
            .toLowerCase() || "",

        phone:
          employeeData.phone?.trim() || "",

        department:
          employeeData.department?.trim() || "",

        password:
          employeeData.password || "",

        confirmPassword:
          employeeData.confirmPassword || "",
      }),
    }
  );
};

// ========================================
// EMPLOYEE LOGIN
// ========================================

export const employeeLogin = async (
  email,
  password
) => {
  return await apiRequest(
    `${API_BASE_URL}/auth/employee-login`,
    {
      method: "POST",

      body: JSON.stringify({
        email:
          email.trim().toLowerCase(),

        password: password,
      }),
    }
  );
};

// ========================================
// ADMIN LOGIN
// ========================================

export const adminLogin = async (
  email,
  password
) => {
  return await apiRequest(
    `${API_BASE_URL}/auth/admin-login`,
    {
      method: "POST",

      body: JSON.stringify({
        email:
          email.trim().toLowerCase(),

        password: password,
      }),
    }
  );
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

// GET COW BY ID

export const getCowById = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/cows/${id}`
  );
};

// ADD COW

export const addCow = async (cowData) => {
  return await apiRequest(
    `${API_BASE_URL}/cows`,
    {
      method: "POST",

      body: JSON.stringify(
        cowData
      ),
    }
  );
};

// UPDATE COW

export const updateCow = async (
  id,
  cowData
) => {
  return await apiRequest(
    `${API_BASE_URL}/cows/${id}`,
    {
      method: "PUT",

      body: JSON.stringify(
        cowData
      ),
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

export const getMilkProduction =
  async () => {
    return await apiRequest(
      `${API_BASE_URL}/milk-production`
    );
  };

// GET MILK PRODUCTION BY ID

export const getMilkProductionById =
  async (id) => {
    return await apiRequest(
      `${API_BASE_URL}/milk-production/${id}`
    );
  };

// ADD MILK PRODUCTION

export const addMilkProduction =
  async (milkData) => {
    return await apiRequest(
      `${API_BASE_URL}/milk-production`,
      {
        method: "POST",

        body: JSON.stringify(
          milkData
        ),
      }
    );
  };

// UPDATE MILK PRODUCTION

export const updateMilkProduction =
  async (
    id,
    milkData
  ) => {
    return await apiRequest(
      `${API_BASE_URL}/milk-production/${id}`,
      {
        method: "PUT",

        body: JSON.stringify(
          milkData
        ),
      }
    );
  };

// DELETE MILK PRODUCTION

export const deleteMilkProduction =
  async (id) => {
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

// GET EMPLOYEE BY ID

export const getEmployeeById = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/employees/${id}`
  );
};

// ADD EMPLOYEE

export const addEmployee = async (
  employeeData
) => {
  return await apiRequest(
    `${API_BASE_URL}/employees`,
    {
      method: "POST",

      body: JSON.stringify(
        employeeData
      ),
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

      body: JSON.stringify(
        employeeData
      ),
    }
  );
};

// DELETE EMPLOYEE

export const deleteEmployee = async (
  id
) => {
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

// GET CUSTOMER BY ID

export const getCustomerById = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/customers/${id}`
  );
};

// ADD CUSTOMER

export const addCustomer = async (
  customerData
) => {
  return await apiRequest(
    `${API_BASE_URL}/customers`,
    {
      method: "POST",

      body: JSON.stringify(
        customerData
      ),
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

      body: JSON.stringify(
        customerData
      ),
    }
  );
};

// DELETE CUSTOMER

export const deleteCustomer = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/customers/${id}`,
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

// GET SALE BY ID

export const getSaleById = async (id) => {
  return await apiRequest(
    `${API_BASE_URL}/sales/${id}`
  );
};

// ADD SALE

export const addSale = async (
  saleData
) => {
  return await apiRequest(
    `${API_BASE_URL}/sales`,
    {
      method: "POST",

      body: JSON.stringify(
        saleData
      ),
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

      body: JSON.stringify(
        saleData
      ),
    }
  );
};

// DELETE SALE

export const deleteSale = async (
  id
) => {
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

// GET ATTENDANCE BY ID

export const getAttendanceById =
  async (id) => {
    return await apiRequest(
      `${API_BASE_URL}/attendance/${id}`
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

      body: JSON.stringify(
        attendanceData
      ),
    }
  );
};

// UPDATE ATTENDANCE

export const updateAttendance =
  async (
    id,
    attendanceData
  ) => {
    return await apiRequest(
      `${API_BASE_URL}/attendance/${id}`,
      {
        method: "PUT",

        body: JSON.stringify(
          attendanceData
        ),
      }
    );
  };

// DELETE ATTENDANCE

export const deleteAttendance =
  async (id) => {
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

// GET SINGLE LEAVE

export const getLeaveById = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/leaves/${id}`
  );
};

// ADD LEAVE

export const addLeave = async (
  leaveData
) => {
  return await apiRequest(
    `${API_BASE_URL}/leaves`,
    {
      method: "POST",

      body: JSON.stringify({
        employeeId:
          leaveData.employeeId || "",

        employeeName:
          leaveData.employeeName || "",

        employeeEmail:
          leaveData.employeeEmail || "",

        type:
          leaveData.type ||
          leaveData.leaveType ||
          "",

        from:
          leaveData.from || "",

        to:
          leaveData.to || "",

        days:
          Number(
            leaveData.days
          ) || 0,

        reason:
          leaveData.reason || "",

        status:
          leaveData.status ||
          "Pending",
      }),
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

      body: JSON.stringify(
        leaveData
      ),
    }
  );
};

// DELETE LEAVE

export const deleteLeave = async (
  id
) => {
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

// GET SALARY BY ID

export const getSalaryById = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/salaries/${id}`
  );
};

// ADD SALARY

export const addSalary = async (
  salaryData
) => {
  return await apiRequest(
    `${API_BASE_URL}/salaries`,
    {
      method: "POST",

      body: JSON.stringify({
        employeeId:
          salaryData.employeeId || "",

        employeeName:
          salaryData.employeeName || "",

        month:
          salaryData.month || "",

        basicSalary:
          Number(
            salaryData.basicSalary
          ) || 0,

        allowances:
          Number(
            salaryData.allowances
          ) || 0,

        deductions:
          Number(
            salaryData.deductions
          ) || 0,

        netSalary:
          Number(
            salaryData.netSalary
          ) || 0,

        paymentDate:
          salaryData.paymentDate || "",

        status:
          salaryData.status ||
          "Pending",
      }),
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

      body: JSON.stringify({
        employeeId:
          salaryData.employeeId || "",

        employeeName:
          salaryData.employeeName || "",

        month:
          salaryData.month || "",

        basicSalary:
          Number(
            salaryData.basicSalary
          ) || 0,

        allowances:
          Number(
            salaryData.allowances
          ) || 0,

        deductions:
          Number(
            salaryData.deductions
          ) || 0,

        netSalary:
          Number(
            salaryData.netSalary
          ) || 0,

        paymentDate:
          salaryData.paymentDate || "",

        status:
          salaryData.status ||
          "Pending",
      }),
    }
  );
};

// DELETE SALARY

export const deleteSalary = async (
  id
) => {
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

// GET WORK BY ID

export const getWorkById = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/work/${id}`
  );
};

// ADD WORK

export const addWork = async (
  workData
) => {
  return await apiRequest(
    `${API_BASE_URL}/work`,
    {
      method: "POST",

      body: JSON.stringify(
        workData
      ),
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

      body: JSON.stringify(
        workData
      ),
    }
  );
};

// DELETE WORK

export const deleteWork = async (
  id
) => {
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

// GET ORDER BY ID

export const getOrderById = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/orders/${id}`
  );
};

// ADD ORDER

export const addOrder = async (
  orderData
) => {
  return await apiRequest(
    `${API_BASE_URL}/orders`,
    {
      method: "POST",

      body: JSON.stringify(
        orderData
      ),
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

      body: JSON.stringify(
        orderData
      ),
    }
  );
};

// DELETE ORDER

export const deleteOrder = async (
  id
) => {
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

// GET PAYMENT BY ID

export const getPaymentById = async (
  id
) => {
  return await apiRequest(
    `${API_BASE_URL}/payments/${id}`
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

      body: JSON.stringify(
        paymentData
      ),
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

      body: JSON.stringify(
        paymentData
      ),
    }
  );
};

// DELETE PAYMENT

export const deletePayment = async (
  id
) => {
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

// GET DASHBOARD SUMMARY

export const getDashboardSummary =
  async () => {
    return await apiRequest(
      `${API_BASE_URL}/dashboard/summary`
    );
  };

// ========================================
// PROFILE API
// ========================================

// GET EMPLOYEE PROFILE

export const getProfile = async (
  employeeId
) => {
  if (!employeeId) {
    throw new Error(
      "Employee ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/profile/${employeeId}`,
    {
      method: "GET",
    }
  );
};

// UPDATE EMPLOYEE PROFILE

export const updateProfile = async (
  employeeId,
  profileData
) => {
  if (!employeeId) {
    throw new Error(
      "Employee ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/profile/${employeeId}`,
    {
      method: "PUT",

      body: JSON.stringify({
        name:
          profileData.name?.trim() || "",

        email:
          profileData.email
            ?.trim()
            .toLowerCase() || "",

        phone:
          profileData.phone?.trim() || "",

        department:
          profileData.department?.trim() || "",
      }),
    }
  );
};

// ========================================
// EMPLOYEE LOGOUT
// ========================================

export const employeeLogout = () => {
  localStorage.removeItem(
    "employeeLoggedIn"
  );

  localStorage.removeItem(
    "employeeToken"
  );

  localStorage.removeItem(
    "employeeData"
  );
};

// ========================================
// DEFAULT EXPORT
// ========================================

export default apiRequest;