const API_BASE_URL = "http://localhost:5000/api";

// ======================================================
// COMMON API REQUEST
// ======================================================

const apiRequest = async (
  endpoint,
  options = {}
) => {
  const token =
    localStorage.getItem("customerToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch {
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
};

// ======================================================
// CUSTOMER REGISTER
// ======================================================

export const registerCustomer = async (
  customerData
) => {
  return apiRequest(
    "/customer-auth/register",
    {
      method: "POST",
      body: JSON.stringify(customerData),
    }
  );
};

// ======================================================
// CUSTOMER LOGIN
// ======================================================

export const loginCustomer = async (
  email,
  password
) => {
  const data = await apiRequest(
    "/customer-auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  // Save token
  const token =
    data.token ||
    data.accessToken ||
    data.jwt;

  if (token) {
    localStorage.setItem(
      "customerToken",
      token
    );
  }

  // Save customer
  const customer =
    data.customer ||
    data.user ||
    data.data;

  if (customer) {
    localStorage.setItem(
      "customerUser",
      JSON.stringify(customer)
    );
  }

  localStorage.setItem(
    "customerLoggedIn",
    "true"
  );

  return data;
};

// ======================================================
// CUSTOMER DASHBOARD
// ======================================================

export const getCustomerDashboard =
  async () => {
    return apiRequest(
      "/customer-panel/dashboard",
      {
        method: "GET",
      }
    );
  };

// ======================================================
// PRODUCTS
// ======================================================

export const getCustomerProducts =
  async () => {
    return apiRequest(
      "/products",
      {
        method: "GET",
      }
    );
  };

// ======================================================
// CUSTOMER PROFILE
// ======================================================

export const getCustomerProfile =
  async () => {
    return apiRequest(
      "/customer/profile",
      {
        method: "GET",
      }
    );
  };

export const updateCustomerProfile =
  async (profileData) => {
    return apiRequest(
      "/customer/profile",
      {
        method: "PUT",
        body: JSON.stringify(
          profileData
        ),
      }
    );
  };

// ======================================================
// CUSTOMER ORDERS
// ======================================================

export const getCustomerOrders =
  async () => {
    return apiRequest(
      "/customer/orders",
      {
        method: "GET",
      }
    );
  };

export const createCustomerOrder =
  async (orderData) => {
    return apiRequest(
      "/customer/orders",
      {
        method: "POST",
        body: JSON.stringify(
          orderData
        ),
      }
    );
  };

export const getCustomerOrderById =
  async (orderId) => {
    return apiRequest(
      `/customer/orders/${orderId}`,
      {
        method: "GET",
      }
    );
  };

// ======================================================
// CUSTOMER PAYMENTS
// ======================================================

export const getCustomerPayments =
  async () => {
    return apiRequest(
      "/customer/payments",
      {
        method: "GET",
      }
    );
  };

export const getCustomerPaymentById =
  async (paymentId) => {
    return apiRequest(
      `/customer/payments/${paymentId}`,
      {
        method: "GET",
      }
    );
  };

// ======================================================
// CUSTOMER SALES
// ======================================================

export const getCustomerSales =
  async () => {
    return apiRequest(
      "/customer/sales",
      {
        method: "GET",
      }
    );
  };

export const getCustomerSaleById =
  async (saleId) => {
    return apiRequest(
      `/customer/sales/${saleId}`,
      {
        method: "GET",
      }
    );
  };

// ======================================================
// CUSTOMER LOGOUT
// ======================================================

export const logoutCustomer = () => {
  localStorage.removeItem(
    "customerToken"
  );

  localStorage.removeItem(
    "customerUser"
  );

  localStorage.removeItem(
    "customerLoggedIn"
  );

  window.location.href =
    "/customer/login";
};

// ======================================================
// GET LOGGED-IN CUSTOMER
// ======================================================

export const getLoggedInCustomer = () => {
  const customer =
    localStorage.getItem(
      "customerUser"
    );

  if (!customer) {
    return null;
  }

  try {
    return JSON.parse(customer);
  } catch {
    return null;
  }
};

// ======================================================
// CHECK CUSTOMER LOGIN
// ======================================================

export const isCustomerLoggedIn =
  () => {
    return Boolean(
      localStorage.getItem(
        "customerToken"
      )
    );
  };