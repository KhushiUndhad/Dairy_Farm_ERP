// ========================================
// API BASE URL
// ========================================

const API_BASE_URL = "http://localhost:5000/api";

// ========================================
// COMMON API REQUEST FUNCTION
// ========================================

const apiRequest = async (url, options = {}) => {
  try {
    // ======================================
    // GET TOKENS FROM LOCAL STORAGE
    // ======================================

    const customerToken =
      localStorage.getItem("customerToken");

    const employeeToken =
      localStorage.getItem("employeeToken");

    const adminToken =
      localStorage.getItem("adminToken");

    // ======================================
    // SELECT TOKEN
    // ======================================

    const token =
      options.token ||
      customerToken ||
      employeeToken ||
      adminToken;

    // ======================================
    // COPY REQUEST OPTIONS
    // ======================================

    const requestOptions = {
      ...options,
    };

    // token is only used internally
    delete requestOptions.token;

    // remove custom headers from requestOptions
    delete requestOptions.headers;

    // ======================================
    // REQUEST HEADERS
    // ======================================

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // ======================================
    // ADD JWT TOKEN
    // ======================================

    if (token) {
      headers.Authorization =
        `Bearer ${token}`;
    }

    // ======================================
    // ADD CUSTOM HEADERS
    // ======================================

    if (options.headers) {
      Object.assign(
        headers,
        options.headers
      );
    }

    // ======================================
    // SEND REQUEST
    // ======================================

    const response = await fetch(url, {
      ...requestOptions,
      headers,
    });

    // ======================================
    // GET RESPONSE DATA
    // ======================================

    let data = {};

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    try {
      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data = await response.json();
      } else {
        const text =
          await response.text();

        data = {
          message: text,
        };
      }
    } catch (error) {
      data = {};
    }

    // ======================================
    // HANDLE UNAUTHORIZED
    // ======================================

    if (response.status === 401) {
      localStorage.removeItem(
        "customerToken"
      );

      localStorage.removeItem(
        "customerLoggedIn"
      );
    }

    // ======================================
    // CHECK RESPONSE
    // ======================================

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          data.detail ||
          `Request failed with status ${response.status}`
      );
    }

    // ======================================
    // RETURN RESPONSE
    // ======================================

    return data;

  } catch (error) {

    console.error(
      "API ERROR:",
      error
    );

    throw error;
  }
};


// ======================================================
// AUTHENTICATION API
// ======================================================


// ========================================
// EMPLOYEE REGISTER
// ========================================

export const employeeRegister = async (
  employeeData
) => {

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

      headers: {
        Authorization: "",
      },

      body: JSON.stringify({
        email:
          email?.trim().toLowerCase() || "",

        password:
          password || "",
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

      headers: {
        Authorization: "",
      },

      body: JSON.stringify({
        email:
          email?.trim().toLowerCase() || "",

        password:
          password || "",
      }),
    }
  );
};


// ======================================================
// COW API
// ======================================================


// ========================================
// GET ALL COWS
// ========================================

export const getCows = async () => {

  return await apiRequest(
    `${API_BASE_URL}/cows`
  );
};


// ========================================
// GET COW BY ID
// ========================================

export const getCowById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Cow ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/cows/${id}`
  );
};


// ========================================
// ADD COW
// ========================================

export const addCow = async (
  cowData
) => {

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


// ========================================
// UPDATE COW
// ========================================

export const updateCow = async (
  id,
  cowData
) => {

  if (!id) {
    throw new Error(
      "Cow ID is required"
    );
  }

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


// ========================================
// DELETE COW
// ========================================

export const deleteCow = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Cow ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/cows/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// MILK PRODUCTION API
// ======================================================


// ========================================
// GET ALL MILK PRODUCTION
// ========================================

export const getMilkProduction =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/milk-production`
    );
  };


// ========================================
// GET MILK PRODUCTION BY ID
// ========================================

export const getMilkProductionById =
  async (id) => {

    if (!id) {
      throw new Error(
        "Milk production ID is required"
      );
    }

    return await apiRequest(
      `${API_BASE_URL}/milk-production/${id}`
    );
  };


// ========================================
// ADD MILK PRODUCTION
// ========================================

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


// ========================================
// UPDATE MILK PRODUCTION
// ========================================

export const updateMilkProduction =
  async (
    id,
    milkData
  ) => {

    if (!id) {
      throw new Error(
        "Milk production ID is required"
      );
    }

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


// ========================================
// DELETE MILK PRODUCTION
// ========================================

export const deleteMilkProduction =
  async (id) => {

    if (!id) {
      throw new Error(
        "Milk production ID is required"
      );
    }

    return await apiRequest(
      `${API_BASE_URL}/milk-production/${id}`,
      {
        method: "DELETE",
      }
    );
  };


// ======================================================
// EMPLOYEE API
// ======================================================


// ========================================
// GET ALL EMPLOYEES
// ========================================

export const getEmployees = async () => {

  return await apiRequest(
    `${API_BASE_URL}/employees`
  );
};


// ========================================
// GET EMPLOYEE BY ID
// ========================================

export const getEmployeeById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Employee ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/employees/${id}`
  );
};


// ========================================
// ADD EMPLOYEE
// ========================================

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


// ========================================
// UPDATE EMPLOYEE
// ========================================

export const updateEmployee = async (
  id,
  employeeData
) => {

  if (!id) {
    throw new Error(
      "Employee ID is required"
    );
  }

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


// ========================================
// DELETE EMPLOYEE
// ========================================

export const deleteEmployee = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Employee ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/employees/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// CUSTOMER API - ADMIN PANEL
// ======================================================


// ========================================
// GET ALL CUSTOMERS
// ========================================

export const getCustomers = async () => {

  return await apiRequest(
    `${API_BASE_URL}/customers`
  );
};


// ========================================
// GET CUSTOMER BY ID
// ========================================

export const getCustomerById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Customer ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/customers/${id}`
  );
};


// ========================================
// ADD CUSTOMER
// ========================================

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


// ========================================
// UPDATE CUSTOMER
// ========================================

export const updateCustomer = async (
  id,
  customerData
) => {

  if (!id) {
    throw new Error(
      "Customer ID is required"
    );
  }

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


// ========================================
// DELETE CUSTOMER
// ========================================

export const deleteCustomer = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Customer ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/customers/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// SALES API
// ======================================================


// ========================================
// GET ALL SALES
// ========================================

export const getSales = async () => {

  return await apiRequest(
    `${API_BASE_URL}/sales`
  );
};


// ========================================
// GET SALE BY ID
// ========================================

export const getSaleById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Sale ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/sales/${id}`
  );
};


// ========================================
// ADD SALE
// ========================================

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


// ========================================
// UPDATE SALE
// ========================================

export const updateSale = async (
  id,
  saleData
) => {

  if (!id) {
    throw new Error(
      "Sale ID is required"
    );
  }

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


// ========================================
// DELETE SALE
// ========================================

export const deleteSale = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Sale ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/sales/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// ATTENDANCE API
// ======================================================


// ========================================
// GET ALL ATTENDANCE
// ========================================

export const getAttendance = async () => {

  return await apiRequest(
    `${API_BASE_URL}/attendance`
  );
};


// ========================================
// GET ATTENDANCE BY ID
// ========================================

export const getAttendanceById =
  async (id) => {

    if (!id) {
      throw new Error(
        "Attendance ID is required"
      );
    }

    return await apiRequest(
      `${API_BASE_URL}/attendance/${id}`
    );
  };


// ========================================
// ADD ATTENDANCE
// ========================================

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


// ========================================
// UPDATE ATTENDANCE
// ========================================

export const updateAttendance =
  async (
    id,
    attendanceData
  ) => {

    if (!id) {
      throw new Error(
        "Attendance ID is required"
      );
    }

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


// ========================================
// DELETE ATTENDANCE
// ========================================

export const deleteAttendance =
  async (id) => {

    if (!id) {
      throw new Error(
        "Attendance ID is required"
      );
    }

    return await apiRequest(
      `${API_BASE_URL}/attendance/${id}`,
      {
        method: "DELETE",
      }
    );
  };


// ======================================================
// LEAVE API
// ======================================================


// ========================================
// GET ALL LEAVES
// ========================================

export const getLeaves = async () => {

  return await apiRequest(
    `${API_BASE_URL}/leaves`
  );
};


// ========================================
// GET LEAVE BY ID
// ========================================

export const getLeaveById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Leave ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/leaves/${id}`
  );
};


// ========================================
// ADD LEAVE
// ========================================

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


// ========================================
// UPDATE LEAVE
// ========================================

export const updateLeave = async (
  id,
  leaveData
) => {

  if (!id) {
    throw new Error(
      "Leave ID is required"
    );
  }

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


// ========================================
// DELETE LEAVE
// ========================================

export const deleteLeave = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Leave ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/leaves/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// SALARY API
// ======================================================


// ========================================
// GET ALL SALARIES
// ========================================

export const getSalaries = async () => {

  return await apiRequest(
    `${API_BASE_URL}/salaries`
  );
};


// ========================================
// GET SALARY BY ID
// ========================================

export const getSalaryById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Salary ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/salaries/${id}`
  );
};


// ========================================
// ADD SALARY
// ========================================

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


// ========================================
// UPDATE SALARY
// ========================================

export const updateSalary = async (
  id,
  salaryData
) => {

  if (!id) {
    throw new Error(
      "Salary ID is required"
    );
  }

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


// ========================================
// DELETE SALARY
// ========================================

export const deleteSalary = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Salary ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/salaries/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// WORK API
// ======================================================


// ========================================
// GET ALL WORK
// ========================================

export const getWork = async () => {

  return await apiRequest(
    `${API_BASE_URL}/work`
  );
};


// ========================================
// GET WORK BY ID
// ========================================

export const getWorkById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Work ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/work/${id}`
  );
};


// ========================================
// ADD WORK
// ========================================

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


// ========================================
// UPDATE WORK
// ========================================

export const updateWork = async (
  id,
  workData
) => {

  if (!id) {
    throw new Error(
      "Work ID is required"
    );
  }

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


// ========================================
// DELETE WORK
// ========================================

export const deleteWork = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Work ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/work/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// ORDER API - ADMIN PANEL
// ======================================================


// ========================================
// GET ALL ORDERS
// ========================================

export const getOrders = async () => {

  return await apiRequest(
    `${API_BASE_URL}/orders`
  );
};


// ========================================
// GET ORDER BY ID
// ========================================

export const getOrderById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Order ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/orders/${id}`
  );
};


// ========================================
// ADD ORDER
// ========================================

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


// ========================================
// UPDATE ORDER
// ========================================

export const updateOrder = async (
  id,
  orderData
) => {

  if (!id) {
    throw new Error(
      "Order ID is required"
    );
  }

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


// ========================================
// DELETE ORDER
// ========================================

export const deleteOrder = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Order ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/orders/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// PAYMENT API - ADMIN PANEL
// ======================================================


// ========================================
// GET ALL PAYMENTS
// ========================================

export const getPayments = async () => {

  return await apiRequest(
    `${API_BASE_URL}/payments`
  );
};


// ========================================
// GET PAYMENT BY ID
// ========================================

export const getPaymentById = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Payment ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/payments/${id}`
  );
};


// ========================================
// ADD PAYMENT
// ========================================

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


// ========================================
// UPDATE PAYMENT
// ========================================

export const updatePayment = async (
  id,
  paymentData
) => {

  if (!id) {
    throw new Error(
      "Payment ID is required"
    );
  }

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


// ========================================
// DELETE PAYMENT
// ========================================

export const deletePayment = async (
  id
) => {

  if (!id) {
    throw new Error(
      "Payment ID is required"
    );
  }

  return await apiRequest(
    `${API_BASE_URL}/payments/${id}`,
    {
      method: "DELETE",
    }
  );
};


// ======================================================
// ADMIN DASHBOARD API
// ======================================================


// ========================================
// GET ADMIN DASHBOARD SUMMARY
// ========================================

export const getDashboardSummary =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/dashboard/summary`
    );
  };


// ======================================================
// EMPLOYEE PROFILE API
// ======================================================


// ========================================
// GET EMPLOYEE PROFILE
// ========================================

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


// ========================================
// UPDATE EMPLOYEE PROFILE
// ========================================

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


// ======================================================
// CUSTOMER PANEL API
// ======================================================


// ======================================================
// CUSTOMER REGISTER
// ======================================================

export const customerRegister = async (
  customerData
) => {

  return await apiRequest(
    `${API_BASE_URL}/customer-auth/register`,
    {
      method: "POST",

      // Login/register should not use
      // an old customer JWT token.
      token: "",

      headers: {
        Authorization: "",
      },

      body: JSON.stringify({
        name:
          customerData.name?.trim() || "",

        email:
          customerData.email
            ?.trim()
            .toLowerCase() || "",

        phone:
          customerData.phone?.trim() || "",

        password:
          customerData.password || "",

        confirmPassword:
          customerData.confirmPassword || "",
      }),
    }
  );
};


// ======================================================
// CUSTOMER LOGIN
// ======================================================

export const customerLogin = async (
  username,
  password
) => {

  return await apiRequest(
    `${API_BASE_URL}/customer-auth/login`,
    {
      method: "POST",

      // Login does not need old JWT.
      token: "",

      headers: {
        Authorization: "",
      },

      body: JSON.stringify({
        username:
          username?.trim().toLowerCase() || "",

        password:
          password || "",
      }),
    }
  );
};


// ======================================================
// CUSTOMER DASHBOARD
// ======================================================

export const getCustomerDashboard =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/customer-panel/dashboard`,
      {
        method: "GET",
      }
    );
  };


// ======================================================
// CUSTOMER PRODUCTS
// ======================================================


// ========================================
// GET CUSTOMER PRODUCTS
// ========================================

export const getCustomerProducts =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/products`,
      {
        method: "GET",
      }
    );
  };


// ======================================================
// CUSTOMER PROFILE
// ======================================================


// ========================================
// GET CUSTOMER PROFILE
// ========================================

export const getCustomerProfile =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/customer/profile`,
      {
        method: "GET",
      }
    );
  };


// ========================================
// UPDATE CUSTOMER PROFILE
// ========================================

export const updateCustomerProfile =
  async (profileData) => {

    return await apiRequest(
      `${API_BASE_URL}/customer/profile`,
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

          address:
            profileData.address?.trim() || "",

          city:
            profileData.city?.trim() || "",

          state:
            profileData.state?.trim() || "",

          pincode:
            profileData.pincode?.trim() || "",
        }),
      }
    );
  };


// ======================================================
// CUSTOMER ORDERS
// ======================================================


// ========================================
// GET CUSTOMER ORDERS
// ========================================

export const getCustomerOrders =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/customer/orders`,
      {
        method: "GET",
      }
    );
  };


// ========================================
// CREATE CUSTOMER ORDER
// ========================================

export const createCustomerOrder =
  async (orderData) => {

    return await apiRequest(
      `${API_BASE_URL}/customer/orders`,
      {
        method: "POST",

        body: JSON.stringify(
          orderData
        ),
      }
    );
  };


// ========================================
// GET CUSTOMER ORDER BY ID
// ========================================

export const getCustomerOrderById =
  async (id) => {

    if (!id) {
      throw new Error(
        "Order ID is required"
      );
    }

    return await apiRequest(
      `${API_BASE_URL}/customer/orders/${id}`,
      {
        method: "GET",
      }
    );
  };


// ======================================================
// CUSTOMER PAYMENTS
// ======================================================


// ========================================
// GET CUSTOMER PAYMENTS
// ========================================

export const getCustomerPayments =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/customer/payments`,
      {
        method: "GET",
      }
    );
  };


// ========================================
// GET CUSTOMER PAYMENT BY ID
// ========================================

export const getCustomerPaymentById =
  async (id) => {

    if (!id) {
      throw new Error(
        "Payment ID is required"
      );
    }

    return await apiRequest(
      `${API_BASE_URL}/customer/payments/${id}`,
      {
        method: "GET",
      }
    );
  };


// ======================================================
// CUSTOMER SALES
// ======================================================


// ========================================
// GET CUSTOMER SALES
// ========================================

export const getCustomerSales =
  async () => {

    return await apiRequest(
      `${API_BASE_URL}/customer/sales`,
      {
        method: "GET",
      }
    );
  };


// ========================================
// GET CUSTOMER SALE BY ID
// ========================================

export const getCustomerSaleById =
  async (id) => {

    if (!id) {
      throw new Error(
        "Sale ID is required"
      );
    }

    return await apiRequest(
      `${API_BASE_URL}/customer/sales/${id}`,
      {
        method: "GET",
      }
    );
  };


// ======================================================
// CUSTOMER LOGOUT
// ======================================================

export const customerLogout = () => {

  localStorage.removeItem(
    "customerLoggedIn"
  );

  localStorage.removeItem(
    "customerToken"
  );

  localStorage.removeItem(
    "customerData"
  );

  localStorage.removeItem(
    "customerUser"
  );

  localStorage.removeItem(
    "customerRememberMe"
  );
};


// ======================================================
// EMPLOYEE LOGOUT
// ======================================================

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


// ======================================================
// ADMIN LOGOUT
// ======================================================

export const adminLogout = () => {

  localStorage.removeItem(
    "adminLoggedIn"
  );

  localStorage.removeItem(
    "adminToken"
  );

  localStorage.removeItem(
    "adminData"
  );
};


// ======================================================
// DEFAULT EXPORT
// ======================================================

export default apiRequest;