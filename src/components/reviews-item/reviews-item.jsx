import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {months} from "../../const.js";

class ReviewsItem extends PureComponent {
  render() {
    const {user, comment, date} = this.props.review;
    const {avatar, name, rating} = user;

    return (
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">
            {name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `${rating * 100 / 5 + `%`}`}}></span>
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
  review: PropTypes.object
};

export default ReviewsItem;
