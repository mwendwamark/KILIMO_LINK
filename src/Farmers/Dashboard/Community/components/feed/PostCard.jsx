import React, { useState } from "react";
import {
  ChatCircleText,
  Heart,
  ArrowSquareUpRight,
  UserCircle,
  Clock,
  DotsThreeVertical,
  Trash,
} from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { toggleLikePost } from "/src/services/api";

const PostCard = ({ post, currentUser, onDelete, onCommentClick }) => {
  const [isLiked, setIsLiked] = useState(post.liked_by_current_user);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // Optimistic update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

    const result = await toggleLikePost(post.id);
    if (!result.success) {
      // Rollback on failure
      setIsLiked(!newIsLiked);
      setLikesCount((prev) => (!newIsLiked ? prev + 1 : prev - 1));
    }

    setIsLoading(false);
  };

  const getAuthorInitials = () => {
    if (!post.author) return "?";
    return `${post.author.first_name?.[0] || ""}${post.author.last_name?.[0] || ""}`.toUpperCase();
  };

  const isAuthor = currentUser?.id === post.author.id;

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">
          {post.author.avatar_url ? (
            <img src={post.author.avatar_url} alt={post.author.first_name} />
          ) : (
            getAuthorInitials()
          )}
        </div>
        <div className="post-meta">
          <span className="post-author">
            {post.author.first_name} {post.author.last_name}
            {post.author.roles?.includes("farmer") && (
              <span className="author-badge farmer">Farmer</span>
            )}
          </span>
          <span className="post-time">
            <Clock size={14} weight="bold" />
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>

        {isAuthor && (
          <button
            className="post-options-btn"
            onClick={() => onDelete(post.id)}
          >
            <Trash size={18} />
          </button>
        )}
      </div>

      <div className="post-content">{post.content}</div>

      {post.post_images && post.post_images.length > 0 && (
        <div className="post-images">
          {post.post_images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Post attachment ${idx}`}
              className="post-image"
            />
          ))}
        </div>
      )}

      <div className="post-actions">
        <button
          className={`action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          disabled={isLoading}
        >
          <Heart size={20} weight={isLiked ? "fill" : "bold"} />
          <span>{likesCount}</span>
        </button>

        <button className="action-btn" onClick={() => onCommentClick(post)}>
          <ChatCircleText size={20} weight="bold" />
          <span>{post.comments_count}</span>
        </button>

        <button className="action-btn">
          <ArrowSquareUpRight size={20} weight="bold" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
