import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFarmerProfile,
  updateFarmerProfile,
  deleteFarmerProfile,
} from "../../../services/api";
import {
  PencilIcon,
  TrashIcon,
  UserIcon,
  MapPinIcon,
  ShieldCheckIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import "./FarmerProfile.css";

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await getFarmerProfile();
    if (res.success) {
      setProfile(res.data);
      setForm({
        avatar: res.data.avatar || "",
        bio: res.data.bio || "",
        county: res.data.county || "",
        country: res.data.country || "Kenya",
      });
    } else {
      // Profile doesn't exist yet - show create form
      setProfile(null);
      setForm({
        avatar: "",
        bio: "",
        county: "",
        country: "Kenya",
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateFarmerProfile(form);
    if (res.success) {
      setProfile(res.data);
      setEditing(false);
      alert(res.message || "Profile updated successfully!");
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      return;
    }
    const res = await deleteFarmerProfile();
    if (res.success) {
      alert("Profile deleted successfully");
      fetchProfile();
    } else {
      alert("Delete failed: " + res.error);
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
      <div className="farmerprofile-loading-state">
        <div className="farmerprofile-loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="farmerprofile-page-container">
      <div className="farmerprofile-page-header">
        <h1 className="farmerprofile-page-title">My Profile</h1>
        {profile && !editing && (
          <div className="farmerprofile-action-buttons">
            <button
              className="farmerprofile-edit-button"
              onClick={() => setEditing(true)}
            >
              <PencilIcon size={18} />
              Edit Profile
            </button>
            <button
              className="farmerprofile-delete-button"
              onClick={handleDelete}
            >
              <TrashIcon size={18} />
              Delete Profile
            </button>
          </div>
        )}
      </div>

      {editing || !profile ? (
        <form className="farmerprofile-edit-form" onSubmit={handleSubmit}>
          <h2>{profile ? "Edit Profile" : "Create Your Profile"}</h2>

          <div className="farmerprofile-form-group">
            <label htmlFor="avatar">Avatar URL</label>
            <input
              id="avatar"
              type="text"
              placeholder="https://example.com/avatar.jpg"
              value={form.avatar || ""}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            />
            <span className="farmerprofile-field-hint">
              Enter a URL to your profile picture
            </span>
          </div>

          <div className="farmerprofile-form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows="4"
              placeholder="Tell us about yourself and your farming experience..."
              value={form.bio || ""}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <div className="farmerprofile-form-row">
            <div className="farmerprofile-form-group">
              <label htmlFor="county">County *</label>
              <input
                id="county"
                type="text"
                placeholder="e.g., Nairobi"
                value={form.county || ""}
                onChange={(e) => setForm({ ...form, county: e.target.value })}
                required
              />
            </div>

            <div className="farmerprofile-form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value={form.country || "Kenya"}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
          </div>

          <div className="farmerprofile-form-actions">
            <button type="submit" className="farmerprofile-save-button">
              {profile ? "Save Changes" : "Create Profile"}
            </button>
            {profile && (
              <button
                type="button"
                className="farmerprofile-cancel-button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="farmerprofile-content-wrapper">
          <div className="farmerprofile-main-content">
            <div className="farmerprofile-header-section">
              <div className="farmerprofile-avatar-wrapper">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="farmerprofile-avatar-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="farmerprofile-avatar-placeholder"
                  style={{ display: profile.avatar ? "none" : "flex" }}
                >
                  <UserIcon size={64} weight="duotone" />
                </div>
              </div>
              <div className="farmerprofile-header-info">
                <h2 className="farmerprofile-user-name">
                  {user
                    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                    : "User"}
                </h2>
                {profile.is_verified && (
                  <div className="farmerprofile-verified-badge">
                    <ShieldCheckIcon size={20} weight="fill" />
                    Verified Farmer
                  </div>
                )}
                <div className="farmerprofile-user-meta">
                  <span className="farmerprofile-meta-item">
                    <MapPinIcon size={16} weight="bold" />
                    {profile.county}, {profile.country}
                  </span>
                  <span className="farmerprofile-meta-item">
                    <CalendarIcon size={16} weight="bold" />
                    Joined {formatDate(profile.created_at)}
                  </span>
                </div>
              </div>
            </div>

            {profile.bio && (
              <div className="farmerprofile-info-section">
                <h3>About Me</h3>
                <p className="farmerprofile-bio-text">{profile.bio}</p>
              </div>
            )}

            <div className="farmerprofile-info-section">
              <h3>Contact Information</h3>
              <div className="farmerprofile-contact-grid">
                <div className="farmerprofile-contact-item">
                  <strong>Email:</strong>
                  <span>{user?.email || "N/A"}</span>
                </div>
                <div className="farmerprofile-contact-item">
                  <strong>Phone:</strong>
                  <span>{user?.phone_number || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="farmerprofile-sidebar-content">
            <div className="farmerprofile-sidebar-card">
              <h3>Profile Stats</h3>
              <div className="farmerprofile-stat-item">
                <span className="farmerprofile-stat-label">
                  Profile Created
                </span>
                <span className="farmerprofile-stat-value">
                  {formatDate(profile.created_at)}
                </span>
              </div>
              <div className="farmerprofile-stat-item">
                <span className="farmerprofile-stat-label">Last Updated</span>
                <span className="farmerprofile-stat-value">
                  {formatDate(profile.updated_at)}
                </span>
              </div>
              <div className="farmerprofile-stat-item">
                <span className="farmerprofile-stat-label">
                  Verification Status
                </span>
                <span className="farmerprofile-stat-value">
                  {profile.is_verified ? "Verified" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerProfile;
