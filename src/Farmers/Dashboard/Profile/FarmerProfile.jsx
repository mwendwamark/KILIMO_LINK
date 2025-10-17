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
  CameraIcon,
} from "@phosphor-icons/react";
import "./FarmerProfile.css";

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bio: "",
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
    const res = await getFarmerProfile();
    if (res.success) {
      setProfile(res.data);
      setForm({
        bio: res.data.bio || "",
        county: res.data.county || "",
        country: res.data.country || "Kenya",
      });
      setPreviewUrl(res.data.profile_picture_url);
    } else {
      // Profile doesn't exist yet - show create form
      setProfile(null);
      setForm({
        bio: "",
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

      // Create the nested farmer_profile object structure
      const farmerProfileData = {
        bio: form.bio,
        county: form.county,
        country: form.country,
      };

      // Append the nested farmer_profile parameters
      Object.keys(farmerProfileData).forEach((key) => {
        if (
          farmerProfileData[key] !== null &&
          farmerProfileData[key] !== undefined &&
          farmerProfileData[key] !== ""
        ) {
          formData.append(`farmer_profile[${key}]`, farmerProfileData[key]);
        }
      });

      // Append file if selected
      if (selectedFile) {
        formData.append(`farmer_profile[profile_picture]`, selectedFile);
      }

      console.log("Sending FormData with:", {
        bio: form.bio,
        county: form.county,
        country: form.country,
        hasFile: !!selectedFile,
      });

      const res = await updateFarmerProfile(formData);
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
        <h1 className="dashboard_body-title">My Profile</h1>
        {profile && !editing && (
          <div className="farmerprofile-action-buttons">
            <button
              className="dashboard-edit_btn"
              onClick={() => setEditing(true)}
            >
              <PencilIcon size={16} />
              Edit Profile
            </button>
            <button className="dashboard-delete_btn" onClick={handleDelete}>
              <TrashIcon size={16} />
              Delete Profile
            </button>
          </div>
        )}
      </div>

      {editing || !profile ? (
        <form className="farmerprofile-edit-form" onSubmit={handleSubmit}>
          <h2>{profile ? "Edit Profile" : "Create Your Profile"}</h2>

          {/* File Upload Section */}
          <div className="farmerprofile-form-group">
            <label
              htmlFor="profile-picture"
              className="farmerprofile-file-upload-label"
            >
              Profile Picture
            </label>
            <div className="farmerprofile-file-upload-area">
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="farmerprofile-file-input"
              />
              <div className="farmerprofile-upload-preview">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="farmerprofile-upload-preview-image"
                  />
                ) : (
                  <div className="farmerprofile-upload-placeholder">
                    <CameraIcon size={32} />
                    <span>Click to upload profile picture</span>
                  </div>
                )}
              </div>
            </div>
            <span className="farmerprofile-field-hint">
              Supported formats: JPEG, PNG, WebP, GIF. Max size: 5MB
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
            <button
              type="submit"
              className="dashboard-outline_btn"
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
                className="dashboard-cancel_btn"
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
        <div className="farmerprofile-content-wrapper">
          <div className="farmerprofile-main-content">
            <div className="farmerprofile-header-section">
              <div className="farmerprofile-avatar-wrapper">
                {profile.profile_picture_url ? (
                  <img
                    src={profile.profile_picture_url}
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
                  style={{
                    display: profile.profile_picture_url ? "none" : "flex",
                  }}
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
