import { useEffect, useState } from "react";
import "./HomeProducts.css";
import "../../../Shared.css";
import productsData from "./HomeProductsData";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = [
    "All Products",
    "Crops",
    "Livestock",
    "Poultry",
    "Fruit",
    "Machinery",
    "Fertilizers",
  ];

  const filteredProducts =
    selectedCategory === "All Products"
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="home-products-section section">
      <div className="home-products-container container">
        <div className="home-products-headers">
          <div className="home-products-left-header">
            <div className="header-left section-headers" data-aos="fade-up">
              <div className="pre-title">
                <span className="pre-title-line green"></span>
                <span className="pre-title-text green">Marketplace</span>
              </div>
              <h1 className="section-title home-products-title">
                View what <span className="highlight-text">Farmers</span> are
                selling on the platform
              </h1>
            </div>
          </div>
          <div className="home-products-right-header" data-aos="fade-left" data-aos-delay="200">
            <p className="home-products-description">
              Experience the power of direct farmer-to-buyer connections that
              strengthen Kenya's agricultural community and promote sustainable
              farming practices.
            </p>
          </div>
        </div>

        <div className="home-products-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="home-products-grid">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                loading="lazy"
                  src={product.image}
                  alt={product.productName}
                  className="product-image"
                />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.productName}</h3>
                <div className="product-price">
                  <span className="price">
                    KES {product.price}
                    {product.unit}
                  </span>
                </div>
                <div className="product-info-grid">
                  <div className="info-item">
                    <i className="fa-solid fa-box-open"></i>
                    <span>{product.available}</span>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-calendar-alt"></i>
                    <span>
                      {product.harvestDate
                        ? `Harvest: ${product.harvestDate}`
                        : `Age: ${product.age} years`}
                    </span>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="load-more-container">
            <button
              className="load-more-button"
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + 6, filteredProducts.length)
                )
              }
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
