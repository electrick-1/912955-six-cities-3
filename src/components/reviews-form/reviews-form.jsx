import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator, Operation as DataOperation} from "../../reducer/data/data.js";
import NameSpace from "../../reducer/name-space.js";
import {MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH} from "../../const.js";

const requiredRewiewValues = (value) => {
  return (value.trim().length > MIN_REVIEW_LENGTH && value.trim().length < MAX_REVIEW_LENGTH);
};

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ratingValue: ``,
      reviewValue: ``,
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.textAreaChangeHandler = this.textAreaChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {activeOffer, blockForm, postReview} = this.props;
    const {id} = activeOffer;
    const data = new FormData(evt.target);

    blockForm(true);

    const comment = data.get(`review`);
    const rating = data.get(`rating`);

    postReview(id, {
      comment,
      rating,
    });

    this.setState(() => ({
      ratingValue: ``,
      reviewValue: ``
    }));
  }

  inputChangeHandler(evt) {
    const ratingValue = evt.target.value;

    this.setState(() => ({
      ratingValue
    }));

    return false;
  }

  textAreaChangeHandler(evt) {
    const reviewValue = evt.target.value;

    this.setState(() => ({
      reviewValue
    }));

    return false;
  }

  render() {
    const {isBlockedForm} = this.props;
    const {reviewValue, ratingValue} = this.state;
    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this.handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={this.inputChangeHandler} checked={ratingValue === `5`} required />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={this.inputChangeHandler} checked={ratingValue === `4`} required />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={this.inputChangeHandler} checked={ratingValue === `3`} required />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={this.inputChangeHandler} checked={ratingValue === `2`} required />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={this.inputChangeHandler} checked={ratingValue === `1`} required />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" minLength="50" maxLength="300" disabled={isBlockedForm} onChange={this.textAreaChangeHandler} value={reviewValue} required></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={ratingValue && requiredRewiewValues(reviewValue)}>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  activeOffer: PropTypes.shape({
    id: PropTypes.number,
  }),
  blockForm: PropTypes.func,
  postReview: PropTypes.func,
  isBlockedForm: PropTypes.bool
};

const mapStateToProps = (state) => ({
  activeOffer: state[NameSpace.DATA].activeOffer,
  isBlockedForm: state[NameSpace.DATA].isBlockedForm
});

const mapDispatchToProps = (dispatch) => ({
  blockForm(block) {
    dispatch(ActionCreator.blockForm(block));
  },
  postReview(id, data) {
    dispatch(DataOperation.postReview(id, data));
  }
});

export {ReviewsForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);
