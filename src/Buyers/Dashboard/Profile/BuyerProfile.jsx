import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBuyerProfile,
  updateBuyerProfile,
  deleteBuyerProfile,
} from "../../../services/api";
import {
  PencilIcon,
  TrashIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  CameraIcon,
} from "@phosphor-icons/react";
import "./BuyerProfile.css";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    location: "",
    county: "",
    country: "Kenya",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    const res = await getBuyerProfile();
    if (res.success) {
      setProfile(res.data);
      setForm({
        location: res.data.location || "",
        county: res.data.county || "",
        country: res.data.country || "Kenya",
      });
      setPreviewUrl(res.data.profile_picture_url);
    } else {
      // Profile doesn't exist yet - show create form
      setProfile(null);
      setForm({
        location: "",
        county: "",
        country: "Kenya",
      });
    }
    setLoading(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, WebP, or GIF)");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();

      // Create the nested buyer_profile object structure
      const buyerProfileData = {
        location: form.location,
        county: form.county,
        country: form.country,
      };

      // Append the nested buyer_profile parameters
      Object.keys(buyerProfileData).forEach((key) => {
        if (
          buyerProfileData[key] !== null &&
          buyerProfileData[key] !== undefined &&
          buyerProfileData[key] !== ""
        ) {
          formData.append(`buyer_profile[${key}]`, buyerProfileData[key]);
        }
      });

      // Append file if selected
      if (selectedFile) {
        formData.append(`buyer_profile[profile_picture]`, selectedFile);
      }

      console.log("Sending FormData with:", {
        location: form.location,
        county: form.county,
        country: form.country,
        hasFile: !!selectedFile,
      });

      const res = await updateBuyerProfile(formData);
      if (res.success) {
        setProfile(res.data);
        setEditing(false);
        setSelectedFile(null);
        setPreviewUrl(res.data.profile_picture_url);
        alert(res.message || "Profile updated successfully!");
        fetchProfile(); // Refresh to get the updated image URL
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
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
    const res = await deleteBuyerProfile();
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
      <div className="buyerprofile-loading-state">
        <div className="buyerprofile-loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="buyerprofile-page-container">
      <div className="buyerprofile-page-header">
        <h1 className="buyerprofile-page-title">My Profile</h1>
        {profile && !editing && (
          <div className="buyerprofile-action-buttons">
            <button
              className="buyerprofile-edit-button"
              onClick={() => setEditing(true)}
            >
              <PencilIcon size={14} />
              Edit Profile
            </button>
            <button
              className="buyerprofile-delete-button"
              onClick={handleDelete}
            >
              <TrashIcon size={14} />
              Delete Profile
            </button>
          </div>
        )}
      </div>

      {editing || !profile ? (
        <form className="buyerprofile-edit-form" onSubmit={handleSubmit}>
          <h2>{profile ? "Edit Profile" : "Create Your Profile"}</h2>

          {/* File Upload Section */}
          <div className="buyerprofile-form-group">
            <label
              htmlFor="profile-picture"
              className="buyerprofile-file-upload-label"
            >
              Profile Picture
            </label>
            <div className="buyerprofile-file-upload-area">
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="buyerprofile-file-input"
              />
              <div className="buyerprofile-upload-preview">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="buyerprofile-upload-preview-image"
                  />
                ) : (
                  <div className="buyerprofile-upload-placeholder">
                    <CameraIcon size={32} />
                    <span>Click to upload profile picture</span>
                  </div>
                )}
              </div>
            </div>
            <span className="buyerprofile-field-hint">
              Supported formats: JPEG, PNG, WebP, GIF. Max size: 5MB
            </span>
          </div>

          <div className="buyerprofile-form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g., Westlands, Nairobi"
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <span className="buyerprofile-field-hint">
              Your specific location or neighborhood
            </span>
          </div>

          <div className="buyerprofile-form-row">
            <div className="buyerprofile-form-group">
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

            <div className="buyerprofile-form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value={form.country || "Kenya"}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
          </div>

          <div className="buyerprofile-form-actions">
            <button
              type="submit"
              className="buyerprofile-save-button"
              disabled={uploading}
            >
              {uploading
                ? "Uploading..."
                : profile
                ? "Save Changes"
                : "Create Profile"}
            </button>
            {profile && (
              <button
                type="button"
                className="buyerprofile-cancel-button"
                onClick={() => {
                  setEditing(false);
                  setSelectedFile(null);
                  setPreviewUrl(profile.profile_picture_url);
                }}
                disabled={uploading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="buyerprofile-content-wrapper">
          <div className="buyerprofile-main-content">
            <div className="buyerprofile-header-section">
              <div className="buyerprofile-avatar-wrapper">
                {profile.profile_picture_url ? (
                  <img
                    src={profile.profile_picture_url}
                    alt="Profile"
                    className="buyerprofile-avatar-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="buyerprofile-avatar-placeholder"
                  style={{
                    display: profile.profile_picture_url ? "none" : "flex",
                  }}
                >
                  <UserIcon size={64} weight="duotone" />
                </div>
              </div>
              <div className="buyerprofile-header-info">
                <h2 className="buyerprofile-user-name">
                  {user
                    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                    : "User"}
                </h2>
                <div className="buyerprofile-role-badge">Buyer</div>
                <div className="buyerprofile-user-meta">
                  <span className="buyerprofile-meta-item">
                    <MapPinIcon size={16} weight="bold" />
                    {profile.location || profile.county}, {profile.country}
                  </span>
                  <span className="buyerprofile-meta-item">
                    <CalendarIcon size={16} weight="bold" />
                    Joined {formatDate(profile.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="buyerprofile-info-section">
              <h3>Location Details</h3>
              <div className="buyerprofile-location-grid">
                {profile.location && (
                  <div className="buyerprofile-location-item">
                    <strong>Specific Location:</strong>
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="buyerprofile-location-item">
                  <strong>County:</strong>
                  <span>{profile.county}</span>
                </div>
                <div className="buyerprofile-location-item">
                  <strong>Country:</strong>
                  <span>{profile.country}</span>
                </div>
              </div>
            </div>

            <div className="buyerprofile-info-section">
              <h3>Contact Information</h3>
              <div className="buyerprofile-contact-grid">
                <div className="buyerprofile-contact-item">
                  <div className="buyerprofile-contact-icon">
                    <EnvelopeIcon size={20} weight="bold" />
                  </div>
                  <div className="buyerprofile-contact-details">
                    <strong>Email</strong>
                    <span>{user?.email || "N/A"}</span>
                  </div>
                </div>
                <div className="buyerprofile-contact-item">
                  <div className="buyerprofile-contact-icon">
                    <PhoneIcon size={20} weight="bold" />
                  </div>
                  <div className="buyerprofile-contact-details">
                    <strong>Phone</strong>
                    <span>{user?.phone_number || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="buyerprofile-sidebar-content">
            <div className="buyerprofile-sidebar-card">
              <h3>Profile Stats</h3>
              <div className="buyerprofile-stat-item">
                <span className="buyerprofile-stat-label">Profile Created</span>
                <span className="buyerprofile-stat-value">
                  {formatDate(profile.created_at)}
                </span>
              </div>
              <div className="buyerprofile-stat-item">
                <span className="buyerprofile-stat-label">Last Updated</span>
                <span className="buyerprofile-stat-value">
                  {formatDate(profile.updated_at)}
                </span>
              </div>
              <div className="buyerprofile-stat-item">
                <span className="buyerprofile-stat-label">Account Type</span>
                <span className="buyerprofile-stat-value">Buyer</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerProfile;
