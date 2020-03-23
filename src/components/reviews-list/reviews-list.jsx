import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviews-item/reviews-item.jsx";

class ReviewsList extends PureComponent {
  render() {
    const {comments} = this.props.activeOffer;
    return (
      <ul className="reviews__list">
        {comments.map((comment, i) =>
          <ReviewsItem
            key={`comment-${i}`}
            comment={comment}
          />
        )}
      </ul>
    );
  }
}

ReviewsList.propTypes = {
  activeOffer: PropTypes.shape({
    comments: PropTypes.array,
    id: PropTypes.number.isRequired
  })
};

export default ReviewsList;
