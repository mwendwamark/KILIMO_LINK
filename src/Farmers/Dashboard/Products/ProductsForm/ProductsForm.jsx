// components/Products/ProductsForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, updateProduct, getProduct } from "../../../../services/api";
import "./ProductsForm.css";

const CATEGORIES = [
  "livestock",
  "crops",
  "fruits",
  "vegetables",
  "dairy",
  "poultry",
  "aquaculture",
];

const UNITS = [
  "kg",
  "g",
  "ton",
  "liter",
  "piece",
  "animal",
  "acre",
  "bunch",
  "dozen",
];

const ProductsForm = ({ farmId, isEdit = false }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    description: "",
    quantity: "",
    unit: "",
    price_per_unit: "",
    age: "",
    harvest_date: "",
  });

  useEffect(() => {
    if (isEdit && productId) {
      fetchProduct();
    }
  }, [isEdit, productId]);

  const fetchProduct = async () => {
    const result = await getProduct(farmId, productId);
    if (result.success) {
      const product = result.data;
      setFormData({
        product_name: product.product_name || "",
        category: product.category || "",
        description: product.description || "",
        quantity: product.quantity || "",
        unit: product.unit || "",
        price_per_unit: product.price_per_unit || "",
        age: product.age || "",
        harvest_date: product.harvest_date || "",
      });
      if (product.product_images) {
        setImagePreviews(product.product_images);
      }
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = new FormData();

    // Add all form fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        payload.append(`product[${key}]`, formData[key]);
      }
    });

    // Add images
    images.forEach((file) => {
      payload.append("product[product_images][]", file);
    });

    const result = isEdit
      ? await updateProduct(farmId, productId, payload)
      : await createProduct(farmId, payload);

    if (result.success) {
      alert(result.message || "Product saved successfully!");
      navigate(`/farmers/dashboard/farms/${farmId}/products`);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const isAnimalCategory = ["livestock", "poultry", "aquaculture"].includes(
    formData.category
  );
  const isCropCategory = ["crops", "fruits", "vegetables"].includes(
    formData.category
  );

  return (
    <div className="product-form-container">
      <div className="product-form-header">
        <h2 className="dashboard_body-title">
          {isEdit ? "Edit Product" : "Create New Product"}
        </h2>
        <button
          className="dashboard-cancel_btn"
          onClick={() => navigate(`/farmers/dashboard/farms/${farmId}/products`)}
        >
          Cancel
        </button>
      </div>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="product_name">Product Name *</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="unit">Unit *</label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            >
              <option value="">Select unit</option>
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price_per_unit">Price per Unit (KES) *</label>
            <input
              type="number"
              id="price_per_unit"
              name="price_per_unit"
              value={formData.price_per_unit}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        {isAnimalCategory && (
          <div className="form-group">
            <label htmlFor="age">Age (in months) *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        )}

        {isCropCategory && (
          <div className="form-group">
            <label htmlFor="harvest_date">Harvest Date *</label>
            <input
              type="date"
              id="harvest_date"
              name="harvest_date"
              value={formData.harvest_date}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="product_images">Product Images</label>
          <input
            type="file"
            id="product_images"
            accept="image/jpeg,image/jpg,image/png,image/gif"
            multiple
            onChange={handleImageChange}
          />
          <small>You can select multiple images (JPEG, PNG, GIF)</small>
        </div>

        {imagePreviews.length > 0 && (
          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="dashboard-cancel_btn"
            onClick={() => navigate(`/farmers/dashboard/farms/${farmId}/products`)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="dashboard-green_btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Product"
              : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;
