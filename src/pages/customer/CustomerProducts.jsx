import "./CustomerProducts.css";

const CustomerProducts = () => {
  const products = [
    {
      id: 1,
      name: "Fresh Cow Milk",
      category: "Milk",
      description: "Fresh and pure cow milk collected from our dairy farm.",
      price: 60,
      unit: "1 Litre",
      icon: "🥛",
      available: true,
    },
    {
      id: 2,
      name: "Buffalo Milk",
      category: "Milk",
      description: "Rich and creamy buffalo milk with high nutritional value.",
      price: 75,
      unit: "1 Litre",
      icon: "🥛",
      available: true,
    },
    {
      id: 3,
      name: "Fresh Curd",
      category: "Dairy",
      description: "Fresh homemade-style curd prepared from pure milk.",
      price: 40,
      unit: "500 Gram",
      icon: "🥣",
      available: true,
    },
    {
      id: 4,
      name: "Paneer",
      category: "Dairy",
      description: "Soft and fresh paneer made from high-quality milk.",
      price: 90,
      unit: "250 Gram",
      icon: "🧀",
      available: true,
    },
    {
      id: 5,
      name: "Pure Ghee",
      category: "Dairy",
      description: "Pure dairy ghee with rich taste and natural aroma.",
      price: 280,
      unit: "500 Gram",
      icon: "🫙",
      available: true,
    },
    {
      id: 6,
      name: "Fresh Butter",
      category: "Dairy",
      description: "Fresh creamy butter prepared from quality dairy milk.",
      price: 120,
      unit: "250 Gram",
      icon: "🧈",
      available: true,
    },
    {
      id: 7,
      name: "Flavoured Milk",
      category: "Milk",
      description: "Refreshing flavoured milk available in different flavours.",
      price: 45,
      unit: "250 ML",
      icon: "🥤",
      available: true,
    },
    {
      id: 8,
      name: "Lassi",
      category: "Beverage",
      description: "Refreshing and creamy traditional dairy lassi.",
      price: 50,
      unit: "300 ML",
      icon: "🥛",
      available: false,
    },
  ];

  const handleOrder = (product) => {
    alert(
      `${product.name} selected.\nPrice: ₹${product.price} / ${product.unit}`
    );
  };

  return (
    <div className="customer-products-page">

      {/* PAGE HEADER */}

      <div className="customer-products-header">

        <div>
          <h1>Browse Products</h1>

          <p>
            Explore our fresh and high-quality dairy products.
          </p>
        </div>

        <div className="customer-products-count">
          <span>{products.length}</span>
          <small>Products</small>
        </div>

      </div>


      {/* SEARCH AND FILTER */}

      <div className="customer-products-toolbar">

        <div className="customer-product-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search dairy products..."
          />
        </div>


        <select className="customer-product-filter">
          <option value="all">
            All Categories
          </option>

          <option value="milk">
            Milk
          </option>

          <option value="dairy">
            Dairy
          </option>

          <option value="beverage">
            Beverage
          </option>
        </select>

      </div>


      {/* PRODUCTS */}

      <div className="customer-products-grid">

        {products.map((product) => (

          <div
            className="customer-product-card"
            key={product.id}
          >

            {/* PRODUCT IMAGE */}

            <div className="customer-product-image">

              <span>
                {product.icon}
              </span>

              {!product.available && (
                <div className="customer-product-unavailable">
                  Out of Stock
                </div>
              )}

            </div>


            {/* PRODUCT CONTENT */}

            <div className="customer-product-content">

              <div className="customer-product-category">
                {product.category}
              </div>

              <h2>
                {product.name}
              </h2>

              <p>
                {product.description}
              </p>


              {/* PRICE */}

              <div className="customer-product-price-row">

                <div>
                  <strong>
                    ₹{product.price}
                  </strong>

                  <span>
                    / {product.unit}
                  </span>
                </div>

              </div>


              {/* ORDER BUTTON */}

              <button
                type="button"
                className="customer-product-order-button"
                disabled={!product.available}
                onClick={() => handleOrder(product)}
              >
                {product.available
                  ? "🛒 Add to Order"
                  : "Out of Stock"}
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* INFORMATION SECTION */}

      <div className="customer-products-info">

        <div className="customer-products-info-icon">
          🥛
        </div>

        <div>

          <h2>
            Fresh Dairy Products
          </h2>

          <p>
            All our dairy products are prepared with fresh,
            high-quality milk and delivered directly to your doorstep.
          </p>

        </div>

      </div>

    </div>
  );
};

export default CustomerProducts;