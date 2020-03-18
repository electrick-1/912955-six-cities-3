import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

class ReviewsItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {user, comment, date} = this.props.comment;
    const {avatarUrl, name} = user;

    return (
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">
            {name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: 80 + `%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment}
          </p>
          <time className="reviews__time" dateTime={date}>{months[new Date(date).getMonth()]} {new Date(date).getFullYear()}</time>
        </div>
      </li>
    );
  }
}

ReviewsItem.propTypes = {
  comment: PropTypes.object
};

export default ReviewsItem;
