import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFarms, createFarm, updateFarm } from "../../../services/api";
import "./MyFarms.css";
import { MapPinIcon, PlusIcon } from "@phosphor-icons/react";
import { ArrowCircleUpRightIcon } from "@phosphor-icons/react/dist/ssr";

const MyFarms = () => {
  const navigate = useNavigate();
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const fetchFarms = async () => {
    const res = await getFarms();
    if (res.success) setFarms(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editing
      ? await updateFarm(editing.id, form)
      : await createFarm(form);
    if (res.success) {
      setShowForm(false);
      setEditing(null);
      setForm({});
      fetchFarms();
    } else alert(res.error);
  };

  const askForLocation = () =>
    new Promise((resolve) => {
      if (!navigator.geolocation) return resolve({ lat: null, lng: null });

      const consent = window.confirm(
        "We'd like to use your current location to pre-fill the farm coordinates. " +
          "You can change them later if you wish. Allow?"
      );
      if (!consent) return resolve({ lat: null, lng: null });

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: null, lng: null })
      );
    });

  if (loading) return <p className="my-farms-loading">Loading farms…</p>;

  const handleAddClick = async () => {
    const { lat, lng } = await askForLocation();
    setForm({
      farm_name: "",
      county: "",
      sub_county: "",
      ward: "",
      farm_description: "",
      farm_type: "",
      farm_latitude: lat,
      farm_longitude: lng,
    });
    setEditing(null);
    setShowForm(true);
  };

  return (
    <div className="my-farms-wrapper">
      <div className="my-farms-header">
        <h2>My Farms </h2>
        <button className="my-farms-add_btn" onClick={handleAddClick}>
          <PlusIcon size={20}/> Add Farm
        </button>
      </div>

      {showForm && (
        <form className="my-farms-form" onSubmit={handleSubmit}>
          <input
            placeholder="Farm name"
            value={form.farm_name || ""}
            onChange={(e) => setForm({ ...form, farm_name: e.target.value })}
            required
          />
          <input
            placeholder="County"
            value={form.county || ""}
            onChange={(e) => setForm({ ...form, county: e.target.value })}
            required
          />
          <input
            placeholder="Sub County"
            value={form.sub_county || ""}
            onChange={(e) => setForm({ ...form, sub_county: e.target.value })}
          />
          <input
            placeholder="Ward"
            value={form.ward || ""}
            onChange={(e) => setForm({ ...form, ward: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.farm_description || ""}
            onChange={(e) =>
              setForm({ ...form, farm_description: e.target.value })
            }
          />
          <select
            value={form.farm_type || ""}
            onChange={(e) => setForm({ ...form, farm_type: e.target.value })}
            required
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="dairy">Dairy</option>
            <option value="horticulture">Horticulture</option>
            <option value="poultry">Poultry</option>
            <option value="aquaculture">Aquaculture</option>
            <option value="agroforestry">Agroforestry</option>
          </select>

          <div className="my-farms-location-fields">
            <input
              type="number"
              step="any"
              placeholder="Latitude (optional)"
              value={form.farm_latitude || ""}
              onChange={(e) =>
                setForm({ ...form, farm_latitude: e.target.value })
              }
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude (optional)"
              value={form.farm_longitude || ""}
              onChange={(e) =>
                setForm({ ...form, farm_longitude: e.target.value })
              }
            />
          </div>

          <div className="my-farms-form-actions">
            <button type="submit" className="btn-primary">
              {editing ? "Update" : "Save"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setForm({});
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="my-farms-grid">
        {farms.map((f) => (
          <div
            key={f.id}
            className="my-farms-card"
            onClick={() => navigate(`/farmers/dashboard/farms/${f.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="my-farm-title-div">
              <div className="my-farm-title">
                <h3>{f.farm_name}</h3>
                <p>{f.farm_type}</p>
              </div>

              <ArrowCircleUpRightIcon size={40} color="var(--green_color)"  />
            </div>
            <div className="my-farms-location-info">
              <MapPinIcon size={20} color="var(--green_color)" />
              <p> {f.ward},</p>
              <p> {f.sub_county},</p>
              <p> {f.county}</p>
            </div>
            <p className="my-farms-desc">
              {f.farm_description
                ? f.farm_description.substring(0, 100) +
                  (f.farm_description.length > 100 ? "..." : "")
                : "No description provided"}
            </p>
            {f.created_at && (
              <p className="my-farms-date">
                Created on:{" "}
                {new Date(f.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFarms;
