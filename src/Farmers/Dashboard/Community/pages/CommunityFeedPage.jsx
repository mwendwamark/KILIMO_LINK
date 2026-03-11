import React, { useState, useEffect, useRef } from "react";
import { Plus, UsersThree, Globe } from "@phosphor-icons/react";
import { getCommunityPosts, deleteCommunityPost } from "/src/services/api";
import PostCard from "../components/feed/PostCard";
import CreatePostModal from "../components/feed/CreatePostModal";
import PostDetailModal from "../components/feed/PostDetailModal";
import "../Community.css";

const CommunityFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [feedType, setFeedType] = useState("all"); // 'all' or 'following'
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    fetchPosts(true);
  }, [feedType]);

  const fetchPosts = async (isNew = false) => {
    setLoading(true);
    const currentPage = isNew ? 1 : page;
    const result = await getCommunityPosts(feedType, currentPage);

    if (result.success) {
      if (isNew) {
        setPosts(result.posts);
      } else {
        setPosts((prev) => [...prev, ...result.posts]);
      }
      setHasMore(result.meta.has_next_page);
      setPage(currentPage + 1);
    }
    setLoading(false);
  };

  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  const handlePostSuccess = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const result = await deleteCommunityPost(postId);
      if (result.success) {
        setPosts((prev) => prev.filter((p) => p.id !== postId));
      } else {
        alert(result.error || "Failed to delete post");
      }
    }
  };

  return (
    <div className="community-container">
      <div className="community-header">
        <h1 className="dashboard_body-title">Community Feed</h1>
        <div className="community-tabs">
          <button
            className={`community-tab ${feedType === "all" ? "active" : ""}`}
            onClick={() => setFeedType("all")}
          >
            <Globe size={18} weight="bold" />
            <span>All Posts</span>
          </button>
          <button
            className={`community-tab ${feedType === "following" ? "active" : ""}`}
            onClick={() => setFeedType("following")}
          >
            <UsersThree size={18} weight="bold" />
            <span>Following</span>
          </button>
        </div>
      </div>

      <div className="create-post-trigger" onClick={handleCreatePost}>
        <div className="trigger-avatar">
          {user &&
            `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()}
        </div>
        <div className="trigger-input">
          Share an update with the community...
        </div>
        <Plus size={20} weight="bold" color="var(--green_color)" />
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={user}
            onDelete={handleDeletePost}
            onCommentClick={(p) => setSelectedPostId(p.id)}
          />
        ))}

        {loading && (
          <>
            <div className="loading-post"></div>
            <div className="loading-post"></div>
          </>
        )}

        {!loading && hasMore && (
          <button
            className="dashboard-outline_btn"
            style={{ margin: "1rem auto", display: "block" }}
            onClick={() => fetchPosts()}
          >
            Load More
          </button>
        )}

        {!hasMore && posts.length > 0 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--light_grey_color)",
              marginTop: "2rem",
            }}
          >
            You've reached the end of the field! 🌱
          </p>
        )}

        {!loading && posts.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <UsersThree size={64} color="var(--grey_alt_color)" />
            <p style={{ marginTop: "1rem", color: "var(--light_grey_color)" }}>
              No posts found in this feed yet.
            </p>
          </div>
        )}
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePostSuccess}
      />
      <PostDetailModal
        isOpen={!!selectedPostId}
        postId={selectedPostId}
        currentUser={user}
        onClose={() => setSelectedPostId(null)}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default CommunityFeedPage;
