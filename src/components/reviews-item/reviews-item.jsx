import React from "react";
import PropTypes from "prop-types";
import {Months} from "../../const.js";

const ReviewsItem = ({review}) => {
  const {user, comment, date, rating} = review;
  const {avatar, name} = user;

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
        <time className="reviews__time" dateTime={date}>{Months[new Date(date).getMonth()]} {new Date(date).getFullYear()}</time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string
    }),
    comment: PropTypes.string,
    date: PropTypes.string,
    rating: PropTypes.number
  })
};

export default ReviewsItem;
