import React from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviews-item/reviews-item.jsx";

const ReviewsList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {reviews.map((review, i) =>
        <ReviewsItem
          key={`review-${i}`}
          review={review}
        />
      )}
    </ul>
  );
};

ReviewsList.propTypes = {
  activeOffer: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
  reviews: PropTypes.array
};

export default ReviewsList;
