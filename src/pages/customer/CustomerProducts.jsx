import {
  useEffect,
  useState,
} from "react";

import {
  FaSearch,
  FaShoppingCart,
  FaBox,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  getCustomerProducts,
  createCustomerOrder,
} from "../../api/customerApi";

import "./CustomerProducts.css";

const CustomerProducts = () => {
  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [orderingId, setOrderingId] =
    useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data =
          await getCustomerProducts();

        setProducts(
          data.products ||
          data ||
          []
        );
      } catch (err) {
        console.error(
          "Products Error:",
          err
        );

        setError(
          err.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts =
    products.filter((product) => {
      const text = `
        ${product.name || ""}
        ${product.productName || ""}
        ${product.category || ""}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  const handleOrder = async (
    product
  ) => {
    const customer =
      JSON.parse(
        localStorage.getItem(
          "customerUser"
        ) || "{}"
      );

    const productId =
      product.id ||
      product.productId ||
      product._id;

    setOrderingId(productId);

    try {
      await createCustomerOrder({
        productId: productId,
        product:
          product.name ||
          product.productName,
        quantity: 1,
        rate:
          product.price ||
          product.rate ||
          0,
        customerId:
          customer.id ||
          customer.customerId ||
          customer._id,
      });

      alert(
        "Order placed successfully."
      );

    } catch (err) {
      alert(
        err.message ||
          "Unable to place order."
      );
    } finally {
      setOrderingId(null);
    }
  };

  if (loading) {
    return (
      <div className="customer-products-page">
        <h2>
          Loading products...
        </h2>
      </div>
    );
  }

  return (
    <div className="customer-products-page">

      {/* HEADER */}

      <div className="customer-products-header">

        <div>
          <h1>
            Dairy Products
          </h1>

          <p>
            Browse available dairy products
            and place your order.
          </p>
        </div>

        <div className="customer-products-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="customer-login-error">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      {/* PRODUCTS */}

      {filteredProducts.length === 0 ? (

        <div className="customer-products-empty">

          <FaBox />

          <h2>
            No Products Found
          </h2>

          <p>
            No dairy products are currently
            available.
          </p>

        </div>

      ) : (

        <div className="customer-products-grid">

          {filteredProducts.map(
            (product, index) => {

              const productId =
                product.id ||
                product.productId ||
                product._id ||
                index;

              const name =
                product.name ||
                product.productName ||
                "Dairy Product";

              const category =
                product.category ||
                "Dairy";

              const price =
                product.price ??
                product.rate ??
                0;

              const unit =
                product.unit ||
                "L";

              const stock =
                product.stock ??
                product.quantity ??
                0;

              const image =
                product.image ||
                product.imageUrl;

              return (
                <div
                  className="customer-product-card"
                  key={productId}
                >

                  <div className="customer-product-image">

                    {image ? (
                      <img
                        src={image}
                        alt={name}
                      />
                    ) : (
                      <FaBox />
                    )}

                  </div>

                  <div className="customer-product-content">

                    <span className="customer-product-category">
                      {category}
                    </span>

                    <h3>
                      {name}
                    </h3>

                    <p>
                      Fresh quality dairy
                      product.
                    </p>

                    <div className="customer-product-bottom">

                      <div>
                        <strong>
                          ₹{price}
                        </strong>

                        <span>
                          / {unit}
                        </span>
                      </div>

                      <span>
                        Stock: {stock}
                      </span>

                    </div>

                    <button
                      type="button"
                      disabled={
                        orderingId ===
                        productId ||
                        Number(stock) <= 0
                      }
                      onClick={() =>
                        handleOrder(
                          product
                        )
                      }
                    >
                      <FaShoppingCart />

                      {orderingId ===
                      productId
                        ? "Ordering..."
                        : Number(stock) <= 0
                        ? "Out of Stock"
                        : "Place Order"}
                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
};

export default CustomerProducts;