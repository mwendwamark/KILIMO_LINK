import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../../services/api";
import "./Products.css";
import SecondaryNavbar from "../../Components/SecondaryNavbar/SecondaryNavbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      if (result.success) {
        setProducts(result.data.products);
      } else {
        console.error("Error fetching products:", result.error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <>
      <SecondaryNavbar />
      <div className="home_page_products-page container below_navbar">
        <h1>Our Marketplace</h1>
        <div className="home_page_products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="home_page_product-card"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="home_page_product-image-container">
                {product.product_images && product.product_images.length > 0 ? (
                  <img
                    src={product.product_images[0]}
                    alt={product.product_name}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="home_page_product-location-badge">
                  {product.category}
                </div>
              </div>
              <div className="home_page_product-info">
                <h3>{product.product_name}</h3>
                <p className="home_page_price">
                  KSh {product.price_per_unit} per {product.unit}
                </p>

                <p className="home_page_products_location">
                  {product.farm.county} County
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
