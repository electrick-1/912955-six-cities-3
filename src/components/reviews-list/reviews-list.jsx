import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviews-item/reviews-item.jsx";

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {comments} = this.props.offer;
    return (
      <ul className="reviews__list">
        {comments.map((comment) =>
          <ReviewsItem
            key={comment.id}
            comments={comment}
          />
        )}
      </ul>
    );
  }
}

ReviewsList.propTypes = {
  offer: PropTypes.shape({
    comments: PropTypes.array,
    id: PropTypes.number.isRequired
  })
};

export default ReviewsList;
