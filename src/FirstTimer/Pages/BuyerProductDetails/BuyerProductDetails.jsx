import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  Minus,
  Plus,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Share2,
  MapPin,
  Package,
  Calendar,
  Clock,
  Layers,
  Phone,
  MessageSquare,
  X,
  Check,
  Edit3,
  Trash2,
} from "lucide-react";
import {
  getPublicProduct,
  getProductReviews,
  createProductReview,
  getCurrentUser,
  getAuthToken,
  deleteProduct,
} from "../../../services/api";
import { formatCurrency } from "../../../utils/formatters";
import "./BuyerProductDetails.css";
import SecondaryNavbar from "../../Components/SecondaryNavbar/SecondaryNavbar";

const BuyerProductDetails = ({ dashboardMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDescExpanded, setIsDescExpanded] = useState(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const currentUser = getCurrentUser();
  const authToken = getAuthToken();

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getPublicProduct(id);
      if (result.success) {
        setProduct(result.data.product);
      }
      setLoading(false);
    };
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    const result = await getProductReviews(id);
    if (result.success) {
      setReviews(result.data?.reviews || []);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product?.product_name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 3000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "plus")
      setQuantity((p) => Math.min(p + 1, product?.quantity || 99));
    else setQuantity((p) => Math.max(p - 1, 1));
  };

  const handleContactFarmer = () => {
    if (!authToken) {
      return navigate(dashboardMode ? "/farmers/login" : "/buyers/login");
    }
    const messagesRoute = dashboardMode
      ? `/farmers/dashboard/messages?userId=${product?.farm?.user_id}`
      : `/community/messages?userId=${product?.farm?.user_id}`;
    navigate(messagesRoute);
  };

  const handleBack = () => {
    if (dashboardMode) navigate("/farmers/dashboard/marketplace");
    else navigate("/products");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!authToken) return navigate("/buyers/login");
    if (reviewRating === 0) {
      setReviewError("Please select a rating.");
      return;
    }
    setReviewLoading(true);
    setReviewError("");
    try {
      const result = await createProductReview(id, {
        rating: reviewRating,
        comment: reviewComment,
      });

      if (result.success) {
        setReviewSuccess(true);
        setReviewRating(0);
        setReviewComment("");
        setShowReviewForm(false);
        fetchReviews();
        setTimeout(() => setReviewSuccess(false), 3000);
      } else {
        setReviewError(result.error || "Failed to submit review.");
      }
    } catch {
      setReviewError("Network error. Please try again.");
    }
    setReviewLoading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    const result = await deleteProduct(product.farm_id || product.farm?.id, id);
    if (result.success) {
      if (dashboardMode) navigate("/farmers/dashboard/my-listings");
      else navigate("/products");
    } else {
      alert(`Error: ${result.error}`);
      setDeleting(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((n) => ({
    level: n,
    count: reviews.filter((r) => r.rating === n).length,
    pct: reviews.length
      ? Math.round(
          (reviews.filter((r) => r.rating === n).length / reviews.length) * 100,
        )
      : 0,
  }));

  const isOwnProduct = currentUser && product?.farm?.user_id === currentUser.id;

  if (loading)
    return (
      <div className="buyer_product_details__loading">
        <div className="buyer_product_details__spinner"></div>
        <p>Loading product details...</p>
      </div>
    );

  if (!product)
    return (
      <div className="buyer_product_details__error">
        <ArrowLeft onClick={handleBack} />
        <h2>Product not found</h2>
        <button onClick={handleBack}>
          Back to {dashboardMode ? "Marketplace" : "Shop"}
        </button>
      </div>
    );

  return (
    <>
      {!dashboardMode && <SecondaryNavbar />}

      {/* Share Toast */}
      {shareToast && (
        <div className="buyer_product_details__toast">
          <Check size={16} />
          Link copied to clipboard!
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="buyer_product_details__modal-overlay">
          <div className="buyer_product_details__modal">
            <h3>Delete Product?</h3>
            <p>
              This will permanently remove{" "}
              <strong>{product.product_name}</strong>. This action cannot be
              undone.
            </p>
            <div className="buyer_product_details__modal-actions">
              <button
                className="buyer_product_details__modal-cancel"
                onClick={() => setDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="buyer_product_details__modal-delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`buyer_product_details__page container ${!dashboardMode ? "below_navbar" : ""}`}
      >
        <div className="buyer_product_details__top-controls">
          {dashboardMode && (
            <button
              className="buyer_product_details__back-btn"
              onClick={handleBack}
            >
              <ArrowLeft size={17} />
              Back to Marketplace
            </button>
          )}

          {/* Owner Actions */}
          {isOwnProduct && (
            <div className="buyer_product_details__owner-actions">
              <button
                className="buyer_product_details__edit-btn"
                onClick={() =>
                  navigate(
                    `/farmers/dashboard/farms/${product.farm_id || product.farm?.id}/products/${id}/edit`,
                  )
                }
              >
                <Edit3 size={17} />
                <span>Edit Listing</span>
              </button>
              <button
                className="buyer_product_details__delete-btn"
                onClick={() => setDeleteConfirm(true)}
              >
                <Trash2 size={17} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Breadcrumb - only on public pages */}
        {!dashboardMode && (
          <nav className="buyer_product_details__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products">Products</Link>
            <ChevronRight size={14} />
            <span className="buyer_product_details__breadcrumb-category">
              {product.category}
            </span>
            <ChevronRight size={14} />
            <span>{product.product_name}</span>
          </nav>
        )}

        <div className="buyer_product_details__layout">
          {/* ── LEFT: Images ── */}
          <div className="buyer_product_details__visuals">
            <div className="buyer_product_details__main-image-card">
              <button
                className="buyer_product_details__share-btn"
                onClick={handleShare}
                title="Share this product"
              >
                <Share2 size={18} />
              </button>

              {product.product_images?.length > 0 ? (
                <img
                  src={product.product_images[currentImageIndex]}
                  alt={product.product_name}
                  className="buyer_product_details__hero-img"
                />
              ) : (
                <div className="buyer_product_details__no-image">
                  No Image Available
                </div>
              )}
            </div>

            {product.product_images?.length > 1 && (
              <div className="buyer_product_details__thumbnails">
                {product.product_images.map((img, i) => (
                  <div
                    key={i}
                    className={`buyer_product_details__thumb ${i === currentImageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(i)}
                  >
                    <img src={img} alt={`thumb-${i}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info ── */}
          <div className="buyer_product_details__info">
            {/* Header */}
            <div className="buyer_product_details__header">
              <span className="buyer_product_details__category-badge">
                {product.category}
              </span>
              <h1 className="buyer_product_details__name">
                {product.product_name}
              </h1>
              <div className="buyer_product_details__price">
                {formatCurrency(product.price_per_unit)}
                <span className="buyer_product_details__price-unit">
                  per {product.unit}
                </span>
              </div>
              {reviews.length > 0 && (
                <div className="buyer_product_details__rating-inline">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= Math.round(avgRating) ? "#F59E0B" : "none"}
                      color="#F59E0B"
                    />
                  ))}
                  <span>
                    {avgRating} ({reviews.length} review
                    {reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="buyer_product_details__section">
              <button
                className="buyer_product_details__section-trigger"
                onClick={() => setIsDescExpanded(!isDescExpanded)}
              >
                <span>Description</span>
                {isDescExpanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {isDescExpanded && (
                <div className="buyer_product_details__section-body">
                  <p>
                    {product.description ||
                      "No description provided for this product."}
                  </p>
                </div>
              )}
            </div>

            {/* Product Details — real data only */}
            <div className="buyer_product_details__section">
              <button
                className="buyer_product_details__section-trigger"
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
              >
                <span>Product Details</span>
                {isDetailsExpanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {isDetailsExpanded && (
                <div className="buyer_product_details__section-body">
                  <div className="buyer_product_details__details-grid">
                    <div className="buyer_product_details__detail-item">
                      <Package
                        size={18}
                        className="buyer_product_details__detail-icon"
                      />
                      <div>
                        <label>Available Stock</label>
                        <span>
                          {product.quantity} {product.unit}
                        </span>
                      </div>
                    </div>
                    <div className="buyer_product_details__detail-item">
                      <MapPin
                        size={18}
                        className="buyer_product_details__detail-icon"
                      />
                      <div>
                        <label>Location</label>
                        <span>{product.farm?.county || "Not specified"}</span>
                      </div>
                    </div>
                    {product.harvest_date && (
                      <div className="buyer_product_details__detail-item">
                        <Calendar
                          size={18}
                          className="buyer_product_details__detail-icon"
                        />
                        <div>
                          <label>Harvest Date</label>
                          <span>
                            {new Date(product.harvest_date).toLocaleDateString(
                              "en-KE",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    {product.age && (
                      <div className="buyer_product_details__detail-item">
                        <Layers
                          size={18}
                          className="buyer_product_details__detail-icon"
                        />
                        <div>
                          <label>Age / Stage</label>
                          <span>{product.age} months</span>
                        </div>
                      </div>
                    )}
                    <div className="buyer_product_details__detail-item">
                      <Clock
                        size={18}
                        className="buyer_product_details__detail-icon"
                      />
                      <div>
                        <label>Listed</label>
                        <span>
                          {new Date(product.created_at).toLocaleDateString(
                            "en-KE",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Farm info */}
                  {product.farm && (
                    <div className="buyer_product_details__farm-card">
                      <div className="buyer_product_details__farm-info">
                        <strong>{product.farm.farm_name}</strong>
                        <span>
                          <MapPin size={12} /> {product.farm.county}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className="buyer_product_details__purchase">
              <div className="buyer_product_details__qty-row">
                <span className="buyer_product_details__qty-label">
                  Quantity
                </span>
                <div className="buyer_product_details__qty-control">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={() => handleQuantityChange("plus")}>
                    <Plus size={16} />
                  </button>
                </div>
                <span className="buyer_product_details__qty-total">
                  Total: {formatCurrency(product.price_per_unit * quantity)}
                </span>
              </div>

              <div className="buyer_product_details__actions">
                <button
                  className="buyer_product_details__contact-btn"
                  onClick={handleContactFarmer}
                >
                  <MessageSquare size={18} />
                  Contact Farmer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── REVIEWS SECTION ── */}
        <section className="buyer_product_details__reviews">
          <h2 className="buyer_product_details__section-title">
            Ratings & Reviews
          </h2>

          <div className="buyer_product_details__reviews-grid">
            {/* Summary */}
            <div className="buyer_product_details__rating-summary">
              <div className="buyer_product_details__big-score">
                <span className="buyer_product_details__score-num">
                  {reviews.length ? avgRating : "—"}
                </span>
                <span className="buyer_product_details__score-denom">/5</span>
              </div>
              <div className="buyer_product_details__stars-row">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={20}
                    fill={s <= Math.round(avgRating) ? "#F59E0B" : "none"}
                    color="#F59E0B"
                  />
                ))}
              </div>
              <p className="buyer_product_details__review-count">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Bars */}
            <div className="buyer_product_details__rating-bars">
              {ratingCounts.map(({ level, count, pct }) => (
                <div key={level} className="buyer_product_details__bar-row">
                  <span className="buyer_product_details__bar-level">
                    {level} <Star size={11} fill="#666" color="#666" />
                  </span>
                  <div className="buyer_product_details__bar-bg">
                    <div
                      className="buyer_product_details__bar-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="buyer_product_details__bar-count">
                    {count}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="buyer_product_details__review-cta">
              {reviewSuccess && (
                <div className="buyer_product_details__review-success">
                  <Check size={16} /> Review submitted!
                </div>
              )}
              {!isOwnProduct ? (
                <>
                  <h3>Review this product</h3>
                  <p>Share your experience with other buyers</p>
                  {!showReviewForm ? (
                    <button
                      className="buyer_product_details__write-btn"
                      onClick={() => {
                        if (!authToken) navigate("/buyers/login");
                        else setShowReviewForm(true);
                      }}
                    >
                      Write a Review
                    </button>
                  ) : (
                    <form
                      className="buyer_product_details__review-form"
                      onSubmit={handleSubmitReview}
                    >
                      <div className="buyer_product_details__star-picker">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={28}
                            fill={
                              s <= (hoverRating || reviewRating)
                                ? "#F59E0B"
                                : "none"
                            }
                            color="#F59E0B"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setReviewRating(s)}
                          />
                        ))}
                      </div>
                      <textarea
                        className="buyer_product_details__review-textarea"
                        placeholder="Share your thoughts about this product..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                      />
                      {reviewError && (
                        <p className="buyer_product_details__review-error">
                          {reviewError}
                        </p>
                      )}
                      <div className="buyer_product_details__form-actions">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="buyer_product_details__cancel-btn"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="buyer_product_details__submit-btn"
                          disabled={reviewLoading}
                        >
                          {reviewLoading ? "Submitting..." : "Submit Review"}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <p className="buyer_product_details__own-product-note">
                  You cannot review your own product.
                </p>
              )}
            </div>
          </div>

          {/* Review List */}
          {reviews.length > 0 && (
            <div className="buyer_product_details__review-list">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="buyer_product_details__review-card"
                >
                  <div className="buyer_product_details__review-header">
                    <div className="buyer_product_details__reviewer-avatar">
                      {review.user?.avatar_url ? (
                        <img
                          src={review.user.avatar_url}
                          alt={review.user.first_name}
                        />
                      ) : (
                        <span>
                          {review.user?.first_name?.[0]}
                          {review.user?.last_name?.[0]}
                        </span>
                      )}
                    </div>
                    <div className="buyer_product_details__reviewer-info">
                      <strong>
                        {review.user?.first_name} {review.user?.last_name}
                      </strong>
                      {review.user?.roles && (
                        <span className="buyer_product_details__reviewer-role">
                          {review.user.roles[0]}
                        </span>
                      )}
                      <div className="buyer_product_details__review-stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={13}
                            fill={s <= review.rating ? "#F59E0B" : "none"}
                            color="#F59E0B"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="buyer_product_details__review-date">
                      {new Date(review.created_at).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="buyer_product_details__review-body">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {reviews.length === 0 && (
            <div className="buyer_product_details__no-reviews">
              <Star size={32} color="#ccc" />
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default BuyerProductDetails;
