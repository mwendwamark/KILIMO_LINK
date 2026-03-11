import React, { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import { getCommunityPost } from "/src/services/api";
import PostCard from "../feed/PostCard";
import CommentSection from "../comments/CommentSection";

const PostDetailModal = ({
  isOpen,
  postId,
  currentUser,
  onClose,
  onDeletePost,
}) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && postId) {
      fetchPostDetails();
    }
  }, [isOpen, postId]);

  const fetchPostDetails = async () => {
    setLoading(true);
    const result = await getCommunityPost(postId);
    if (result.success) {
      setPost(result.post);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="post-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Discussion</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} weight="bold" />
          </button>
        </div>

        <div className="modal-scroll-content">
          {loading ? (
            <div className="loading-post"></div>
          ) : post ? (
            <>
              <PostCard
                post={post}
                currentUser={currentUser}
                onDelete={() => {
                  onDeletePost(post.id);
                  onClose();
                }}
                onCommentClick={() => {}} // Already in detail view
              />
              <CommentSection
                postId={post.id}
                comments={post.comments}
                currentUser={currentUser}
              />
            </>
          ) : (
            <p>Post not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
