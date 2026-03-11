import React, { useState, useRef } from "react";
import { X, Image, PaperPlaneTilt } from "@phosphor-icons/react";
import { createCommunityPost } from "/src/services/api";

const CreatePostModal = ({ isOpen, onClose, onSuccess }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const result = await createCommunityPost({
      content,
      post_images: images,
    });

    if (result.success) {
      setContent("");
      setImages([]);
      setPreviews([]);
      onSuccess(result.post);
      onClose();
    } else {
      alert(result.error || "Failed to create post");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Post</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          {previews.length > 0 && (
            <div className="attachment-preview">
              {previews.map((url, idx) => (
                <div key={idx} className="preview-item">
                  <img src={url} alt="Preview" />
                  <div className="remove-img" onClick={() => removeImage(idx)}>
                    <X size={12} weight="bold" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="modal-actions">
            <div
              className="upload-trigger"
              onClick={() => fileInputRef.current.click()}
            >
              <Image size={24} weight="bold" />
              <span>Add Images</span>
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>

            <button
              type="submit"
              className="dashboard-green_btn"
              disabled={isSubmitting || !content.trim()}
            >
              <PaperPlanePlaneTilt size={20} weight="bold" />
              <span>{isSubmitting ? "Posting..." : "Post"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Fix for icon name typo in prompt if needed, checked phosphor icons: PaperPlaneTilt is correct.
import { PaperPlaneTilt as PaperPlanePlaneTilt } from "@phosphor-icons/react";

export default CreatePostModal;
