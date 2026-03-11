import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  Package,
  Calendar,
  Layers,
  MapPin,
  Share2,
  Star,
  Check,
  Clock,
} from "lucide-react";
import {
  getProduct,
  deleteProduct,
  getProductReviews,
  createProductReview,
  getCurrentUser,
  getAuthToken,
} from "../../../../services/api";
import { formatCurrency } from "../../../../utils/formatters";
import "./FarmerProductDetail.css";

const FarmerProductDetails = ({ farmId }) => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [shareToast, setShareToast] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Review form (farmers can review other farmers' products)
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  const authToken = getAuthToken();
  const currentUser = getCurrentUser();

  const fromMyListings = location.state?.from === "my-listings";
  const backTo = fromMyListings
    ? "/farmers/dashboard/my-listings"
    : `/farmers/dashboard/farms/${farmId}/products`;
  const backLabel = fromMyListings ? "My Listings" : "Products";

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [farmId, productId]);

  const fetchProduct = async () => {
    setLoading(true);
    const result = await getProduct(farmId, productId);
    if (result.success) setProduct(result.data);
    else setError(result.error);
    setLoading(false);
  };

  const fetchReviews = async () => {
    const result = await getProductReviews(productId);
    if (result.success) {
      setReviews(result.data?.reviews || []);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/products/${productId}`;
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

  const handleDelete = async () => {
    setDeleting(true);
    const result = await deleteProduct(farmId, productId);
    if (result.success) navigate(backTo);
    else {
      alert(`Error: ${result.error}`);
      setDeleting(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (reviewRating === 0) {
      setReviewError("Please select a rating.");
      return;
    }
    setReviewLoading(true);
    setReviewError("");
    try {
      const result = await createProductReview(productId, {
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

  // Is this the farmer's own product?
  const isOwnProduct = product?.farm?.user_id === currentUser?.id;

  // ── Loading ──
  if (loading)
    return (
      <div className="farmer_product_details__loading">
        <div className="farmer_product_details__spinner" />
        <p>Loading product details...</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="farmer_product_details__error">
        <h2>{error || "Product not found"}</h2>
        <button onClick={() => navigate(backTo)}>Back to Dashboard</button>
      </div>
    );

  return (
    <div className="farmer_product_details__wrapper">
      {/* Share Toast */}
      {shareToast && (
        <div className="farmer_product_details__toast">
          <Check size={15} /> Public link copied!
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="farmer_product_details__modal-overlay">
          <div className="farmer_product_details__modal">
            <h3>Delete Product?</h3>
            <p>
              This will permanently remove{" "}
              <strong>{product.product_name}</strong> and cannot be undone.
            </p>
            <div className="farmer_product_details__modal-actions">
              <button
                className="farmer_product_details__modal-cancel"
                onClick={() => setDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="farmer_product_details__modal-delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top Nav ── */}
      <div className="farmer_product_details__top-nav">
        <button
          className="farmer_product_details__back-btn"
          onClick={() => navigate(backTo)}
        >
          <ArrowLeft size={17} />
          <span>Back to {backLabel}</span>
        </button>

        <div className="farmer_product_details__top-actions">
          <button
            className="farmer_product_details__share-action"
            onClick={handleShare}
            title="Share public link"
          >
            <Share2 size={17} />
            <span>Share</span>
          </button>
          {isOwnProduct && (
            <>
              <button
                className="farmer_product_details__edit-btn"
                onClick={() =>
                  navigate(
                    `/farmers/dashboard/farms/${farmId}/products/${productId}/edit`,
                  )
                }
              >
                <Edit3 size={17} />
                <span>Edit</span>
              </button>
              <button
                className="farmer_product_details__delete-btn"
                onClick={() => setDeleteConfirm(true)}
              >
                <Trash2 size={17} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="farmer_product_details__content">
        {/* Images */}
        <div className="farmer_product_details__visuals">
          <div className="farmer_product_details__main-image">
            {product.product_images?.length > 0 ? (
              <img
                src={product.product_images[currentImageIndex]}
                alt={product.product_name}
              />
            ) : (
              <div className="farmer_product_details__no-image">
                No Image Added
              </div>
            )}
          </div>
          {product.product_images?.length > 1 && (
            <div className="farmer_product_details__thumbs">
              {product.product_images.map((img, i) => (
                <div
                  key={i}
                  className={`farmer_product_details__thumb ${i === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(i)}
                >
                  <img src={img} alt={`thumb-${i}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="farmer_product_details__info">
          <div className="farmer_product_details__header">
            <span className="farmer_product_details__category-badge">
              {product.category}
            </span>
            <h1 className="farmer_product_details__name">
              {product.product_name}
            </h1>
            <div className="farmer_product_details__price">
              {formatCurrency(product.price_per_unit)}
              <span className="farmer_product_details__price-unit">
                / {product.unit}
              </span>
            </div>
            {reviews.length > 0 && (
              <div className="farmer_product_details__rating-row">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    fill={s <= Math.round(avgRating) ? "#F59E0B" : "none"}
                    color="#F59E0B"
                  />
                ))}
                <span>
                  {avgRating} · {reviews.length} review
                  {reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="farmer_product_details__section">
            <button
              className="farmer_product_details__section-tab"
              onClick={() => setIsDescExpanded(!isDescExpanded)}
            >
              <span>Description</span>
              {isDescExpanded ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>
            {isDescExpanded && (
              <div className="farmer_product_details__section-body">
                <p>{product.description || "No description provided."}</p>
              </div>
            )}
          </div>

          {/* Inventory & Details */}
          <div className="farmer_product_details__section">
            <button
              className="farmer_product_details__section-tab"
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            >
              <span>Inventory & Details</span>
              {isDetailsExpanded ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>
            {isDetailsExpanded && (
              <div className="farmer_product_details__section-body">
                <div className="farmer_product_details__details-grid">
                  <div className="farmer_product_details__detail-card">
                    <Package
                      size={18}
                      className="farmer_product_details__detail-icon"
                    />
                    <div>
                      <label>Stock</label>
                      <span>
                        {product.quantity} {product.unit}
                      </span>
                    </div>
                  </div>
                  <div className="farmer_product_details__detail-card">
                    <MapPin
                      size={18}
                      className="farmer_product_details__detail-icon"
                    />
                    <div>
                      <label>Location</label>
                      <span>{product.farm?.county || "Not set"}</span>
                    </div>
                  </div>
                  {product.harvest_date && (
                    <div className="farmer_product_details__detail-card">
                      <Calendar
                        size={18}
                        className="farmer_product_details__detail-icon"
                      />
                      <div>
                        <label>Harvest Date</label>
                        <span>
                          {new Date(product.harvest_date).toLocaleDateString(
                            "en-KE",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.age && (
                    <div className="farmer_product_details__detail-card">
                      <Layers
                        size={18}
                        className="farmer_product_details__detail-icon"
                      />
                      <div>
                        <label>Age / Stage</label>
                        <span>{product.age} months</span>
                      </div>
                    </div>
                  )}
                  <div className="farmer_product_details__detail-card">
                    <Clock
                      size={18}
                      className="farmer_product_details__detail-icon"
                    />
                    <div>
                      <label>Listed On</label>
                      <span>
                        {new Date(product.created_at).toLocaleDateString(
                          "en-KE",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {product.farm && (
                  <div className="farmer_product_details__farm-chip">
                    <span className="farmer_product_details__farm-name">
                      {product.farm.farm_name}
                    </span>
                    <span className="farmer_product_details__farm-county">
                      <MapPin size={11} /> {product.farm.county}
                    </span>
                  </div>
                )}

                <div className="farmer_product_details__listing-meta">
                  <small>
                    Last updated:{" "}
                    {new Date(product.updated_at).toLocaleDateString("en-KE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <section className="farmer_product_details__reviews">
        <h2 className="farmer_product_details__reviews-title">
          Ratings & Reviews
        </h2>

        <div className="farmer_product_details__reviews-grid">
          {/* Summary */}
          <div className="farmer_product_details__rating-summary">
            <div className="farmer_product_details__big-score">
              <span className="farmer_product_details__score-num">
                {reviews.length ? avgRating : "—"}
              </span>
              <span className="farmer_product_details__score-denom">/5</span>
            </div>
            <div className="farmer_product_details__stars-display">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={18}
                  fill={s <= Math.round(avgRating) ? "#F59E0B" : "none"}
                  color="#F59E0B"
                />
              ))}
            </div>
            <p className="farmer_product_details__review-count">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Bars */}
          <div className="farmer_product_details__rating-bars">
            {ratingCounts.map(({ level, count, pct }) => (
              <div key={level} className="farmer_product_details__bar-row">
                <span className="farmer_product_details__bar-label">
                  {level} <Star size={10} fill="#888" color="#888" />
                </span>
                <div className="farmer_product_details__bar-bg">
                  <div
                    className="farmer_product_details__bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="farmer_product_details__bar-count">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* CTA — only for non-own products */}
          <div className="farmer_product_details__review-cta">
            {reviewSuccess && (
              <div className="farmer_product_details__review-success">
                <Check size={15} /> Review submitted!
              </div>
            )}
            {!isOwnProduct ? (
              <>
                <h3>Review this product</h3>
                <p>Share your experience</p>
                {!showReviewForm ? (
                  <button
                    className="farmer_product_details__write-btn"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write a Review
                  </button>
                ) : (
                  <form
                    className="farmer_product_details__review-form"
                    onSubmit={handleSubmitReview}
                  >
                    <div className="farmer_product_details__star-picker">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={26}
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
                      className="farmer_product_details__review-textarea"
                      placeholder="Share your thoughts..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={3}
                    />
                    {reviewError && (
                      <p className="farmer_product_details__review-error">
                        {reviewError}
                      </p>
                    )}
                    <div className="farmer_product_details__form-actions">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="farmer_product_details__cancel-btn"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="farmer_product_details__submit-btn"
                        disabled={reviewLoading}
                      >
                        {reviewLoading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <p className="farmer_product_details__own-note">
                This is your product. You cannot review it.
              </p>
            )}
          </div>
        </div>

        {/* Review list */}
        {reviews.length > 0 ? (
          <div className="farmer_product_details__review-list">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="farmer_product_details__review-card"
              >
                <div className="farmer_product_details__review-header">
                  <div className="farmer_product_details__reviewer-avatar">
                    {review.user?.avatar_url ? (
                      <img src={review.user.avatar_url} alt="" />
                    ) : (
                      <span>
                        {review.user?.first_name?.[0]}
                        {review.user?.last_name?.[0]}
                      </span>
                    )}
                  </div>
                  <div className="farmer_product_details__reviewer-info">
                    <strong>
                      {review.user?.first_name} {review.user?.last_name}
                    </strong>
                    {review.user?.roles && (
                      <span className="farmer_product_details__reviewer-role">
                        {review.user.roles[0]}
                      </span>
                    )}
                    <div className="farmer_product_details__review-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          fill={s <= review.rating ? "#F59E0B" : "none"}
                          color="#F59E0B"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="farmer_product_details__review-date">
                    {new Date(review.created_at).toLocaleDateString("en-KE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {review.comment && (
                  <p className="farmer_product_details__review-body">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="farmer_product_details__no-reviews">
            <Star size={28} color="#ccc" />
            <p>No reviews yet for this product.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default FarmerProductDetails;
