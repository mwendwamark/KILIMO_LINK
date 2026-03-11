import React, { useState } from "react";
import { PaperPlaneTilt, Trash, ChatCircleDots } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { createComment, deleteCommunityComment } from "/src/services/api";

const CommentCard = ({ comment, postId, currentUser, onDeleteSuccess }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;

    const result = await createComment(postId, {
      comment_body: replyBody,
      parent_id: comment.id,
    });

    if (result.success) {
      setReplyBody("");
      setShowReply(false);
      // In a real app we'd refresh or append the reply.
      // For now, let's assume the parent will re-fetch or we simply alert.
      alert("Reply added!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this comment?")) {
      const result = await deleteCommunityComment(postId, comment.id);
      if (result.success) onDeleteSuccess(comment.id);
    }
  };

  return (
    <div className={`comment-card ${comment.parent_id ? "is-reply" : ""}`}>
      <div className="comment-header">
        <div className="comment-avatar">
          {comment.author.avatar_url ? (
            <img
              src={comment.author.avatar_url}
              alt={comment.author.first_name}
            />
          ) : (
            comment.author.first_name?.[0]
          )}
        </div>
        <div className="comment-meta">
          <span className="comment-author">
            {comment.author.first_name} {comment.author.last_name}
          </span>
          <span className="comment-time">
            {formatDistanceToNow(new Date(comment.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>
        {currentUser?.id === comment.author.id && (
          <button className="comment-delete" onClick={handleDelete}>
            <Trash size={14} />
          </button>
        )}
      </div>

      <div className="comment-body">{comment.comment_body}</div>

      <div className="comment-actions">
        <button
          className="comment-action-btn"
          onClick={() => setShowReply(!showReply)}
        >
          <ChatCircleDots size={16} />
          <span>Reply</span>
        </button>
      </div>

      {showReply && (
        <form className="reply-form" onSubmit={handleReply}>
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={!replyBody.trim()}>
            <PaperPlaneTilt size={16} />
          </button>
        </form>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-container">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              postId={postId}
              currentUser={currentUser}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ postId, comments: initialComments, currentUser }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const result = await createComment(postId, { comment_body: newComment });

    if (result.success) {
      setComments((prev) => [result.comment, ...prev]);
      setNewComment("");
    }
    setIsSubmitting(false);
  };

  const handleDeleted = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="comment-section">
      <form className="main-comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="dashboard-green_btn"
          disabled={isSubmitting || !newComment.trim()}
        >
          Post Comment
        </button>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            postId={postId}
            currentUser={currentUser}
            onDeleteSuccess={handleDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
