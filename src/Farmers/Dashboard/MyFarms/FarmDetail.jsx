import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFarm, updateFarm, deleteFarm } from "../../../services/api";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import "./FarmDetail.css";

const FarmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchFarm();
  }, [id]);

  const fetchFarm = async () => {
    const res = await getFarm(id);
    if (res.success) {
      setFarm(res.data);
      setForm({
        farm_name: res.data.farm_name,
        county: res.data.county,
        sub_county: res.data.sub_county,
        ward: res.data.ward,
        farm_description: res.data.farm_description,
        farm_type: res.data.farm_type,
        farm_latitude: res.data.farm_latitude,
        farm_longitude: res.data.farm_longitude,
      });
    } else {
      alert("Failed to load farm details");
      navigate("/farmers/dashboard/farms");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateFarm(id, form);
    if (res.success) {
      setFarm(res.data);
      setEditing(false);
      alert("Farm updated successfully!");
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${farm.farm_name}"? This action cannot be undone.`
      )
    ) {
      return;
    }
    const res = await deleteFarm(id);
    if (res.success) {
      alert("Farm deleted successfully");
      navigate("/farmers/dashboard/farms");
    } else {
      alert("Delete failed");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="farmdetail-loading-state">
        <div className="farmdetail-loading-spinner"></div>
        <p>Loading farm details...</p>
      </div>
    );
  }

  if (!farm) {
    return (
      <div className="farmdetail-error-state">
        <p>Farm not found</p>
        <button onClick={() => navigate("/farmers/dashboard/farms")}>
          Back to Farms
        </button>
      </div>
    );
  }

  return (
    <div className="farmdetail-page-container">
      <div className="farmdetail-page-header">
        <button
          className="farmdetail-back-button"
          onClick={() => navigate("/farmers/dashboard/farms")}
        >
          <ArrowLeftIcon size={16}  />
          Back to Farms
        </button>

        {!editing && (
          <div className="farmdetail-action-buttons">
            <button
              className="farmdetail-edit-button"
              onClick={() => setEditing(true)}
            >
              <PencilIcon size={16} />
              Edit Farm
            </button>
            <button className="farmdetail-delete-button" onClick={handleDelete}>
              <TrashIcon size={16} />
              Delete Farm
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <form className="farmdetail-edit-form" onSubmit={handleSubmit}>
          <h2>Edit Farm Details</h2>

          <div className="farmdetail-form-group">
            <label htmlFor="farm_name">Farm Name *</label>
            <input
              id="farm_name"
              type="text"
              value={form.farm_name || ""}
              onChange={(e) => setForm({ ...form, farm_name: e.target.value })}
              required
            />
          </div>

          <div className="farmdetail-form-row">
            <div className="farmdetail-form-group">
              <label htmlFor="county">County *</label>
              <input
                id="county"
                type="text"
                value={form.county || ""}
                onChange={(e) => setForm({ ...form, county: e.target.value })}
                required
              />
            </div>

            <div className="farmdetail-form-group">
              <label htmlFor="sub_county">Sub County</label>
              <input
                id="sub_county"
                type="text"
                value={form.sub_county || ""}
                onChange={(e) =>
                  setForm({ ...form, sub_county: e.target.value })
                }
              />
            </div>
          </div>

          <div className="farmdetail-form-row">
            <div className="farmdetail-form-group">
              <label htmlFor="ward">Ward</label>
              <input
                id="ward"
                type="text"
                value={form.ward || ""}
                onChange={(e) => setForm({ ...form, ward: e.target.value })}
              />
            </div>

            <div className="farmdetail-form-group">
              <label htmlFor="farm_type">Farm Type *</label>
              <select
                id="farm_type"
                value={form.farm_type || ""}
                onChange={(e) =>
                  setForm({ ...form, farm_type: e.target.value })
                }
                required
              >
                <option value="">Select type</option>
                <option value="dairy">Dairy</option>
                <option value="horticulture">Horticulture</option>
                <option value="poultry">Poultry</option>
                <option value="aquaculture">Aquaculture</option>
                <option value="agroforestry">Agroforestry</option>
              </select>
            </div>
          </div>

          <div className="farmdetail-form-group">
            <label htmlFor="farm_description">Description</label>
            <textarea
              id="farm_description"
              rows="4"
              value={form.farm_description || ""}
              onChange={(e) =>
                setForm({ ...form, farm_description: e.target.value })
              }
            />
          </div>

          <div className="farmdetail-form-row">
            <div className="farmdetail-form-group">
              <label htmlFor="farm_latitude">Latitude</label>
              <input
                id="farm_latitude"
                type="number"
                step="any"
                value={form.farm_latitude || ""}
                onChange={(e) =>
                  setForm({ ...form, farm_latitude: e.target.value })
                }
              />
            </div>

            <div className="farmdetail-form-group">
              <label htmlFor="farm_longitude">Longitude</label>
              <input
                id="farm_longitude"
                type="number"
                step="any"
                value={form.farm_longitude || ""}
                onChange={(e) =>
                  setForm({ ...form, farm_longitude: e.target.value })
                }
              />
            </div>
          </div>

          <div className="farmdetail-form-actions">
            <button type="submit" className="farmdetail-save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="farmdetail-cancel-button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="farmdetail-content-wrapper">
          <div className="farmdetail-main-content">
            <h1 className="farmdetail-farm-name dashboard_body-title">{farm.farm_name}</h1>

            <div className="farmdetail-meta-info">
              <span className="farmdetail-type-badge">{farm.farm_type}</span>
              <span className="farmdetail-created-date">
                <CalendarIcon size={16} weight="bold" />
                Created {formatDate(farm.created_at)}
              </span>
            </div>

            <div className="farmdetail-info-section">
              <h3>Location</h3>
              <div className="farmdetail-location-details">
                <p>
                  <strong>County:</strong> {farm.county}
                </p>
                {farm.sub_county && (
                  <p>
                    <strong>Sub County:</strong> {farm.sub_county}
                  </p>
                )}
                {farm.ward && (
                  <p>
                    <strong>Ward:</strong> {farm.ward}
                  </p>
                )}
              </div>
            </div>

            {farm.farm_description && (
              <div className="farmdetail-info-section">
                <h3>Description</h3>
                <p className="farmdetail-description-text">
                  {farm.farm_description}
                </p>
              </div>
            )}

            {(farm.farm_latitude || farm.farm_longitude) && (
              <div className="farmdetail-info-section">
                <h3>Coordinates</h3>
                <div className="farmdetail-coordinates-wrapper">
                  <MapPinIcon size={20} weight="bold" />
                  <span>
                    {farm.farm_latitude}, {farm.farm_longitude}
                  </span>
                  <a
                    href={`https://www.google.com/maps?q=${farm.farm_latitude},${farm.farm_longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="farmdetail-map-link"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="farmdetail-sidebar-content">
            <div className="farmdetail-sidebar-card">
              <h3>Farm Statistics</h3>
              <div className="farmdetail-stat-item">
                <span className="farmdetail-stat-label">Products</span>
                <span className="farmdetail-stat-value">0</span>
              </div>
              <div className="farmdetail-stat-item">
                <span className="farmdetail-stat-label">Last Updated</span>
                <span className="farmdetail-stat-value">
                  {formatDate(farm.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmDetail;
