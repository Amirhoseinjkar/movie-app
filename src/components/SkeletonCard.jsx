import "./skeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster"></div>

      <div className="skeleton-info">
        <div className="skeleton-title"></div>

        <div className="skeleton-footer">
          <div className="skeleton-rating"></div>
          <div className="skeleton-year"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;