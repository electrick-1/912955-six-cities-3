import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {CardClass} from "../../const.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onTitleClick = this._onTitleClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  _onMouseEnter() {
    const {offer, onMouseEnter} = this.props;
    onMouseEnter(offer);
  }

  _onMouseLeave() {
    const {offer, onMouseLeave} = this.props;
    onMouseLeave(offer);
  }

  _onTitleClick() {
    const {offer, onTitleClick} = this.props;
    onTitleClick(offer);
  }

  _onFavoriteClick() {
    const {offer, onFavoriteButtonClick, isSignIn} = this.props;
    if (!isSignIn) {
      return history.push(AppRoute.LOGIN);
    }

    onFavoriteButtonClick(offer);

    return false;
  }

  render() {
    const {offer, cardClass} = this.props;
    const {
      title,
      price,
      isPremium,
      isFavorite,
      type,
      rating,
      previewImage,
      id
    } = offer;

    const getPremiumClass = isPremium && cardClass === `cities`
      ? `place-card__mark`
      : `place-card__mark visually-hidden`;

    const getCardClass = (currentClass) => {
      switch (currentClass) {
        case CardClass.CITIES:
          return (`cities__place-card place-card`);
        case CardClass.NEAR_PLACES:
          return (`near-places__card place-card`);
        case CardClass.FAVORITES:
          return (`favorites__card place-card`);
      }
      return false;
    };

    return (
      <article
        className={getCardClass(cardClass)}
        key={offer.id}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        <div className={getPremiumClass}>
          <span>Premium</span>
        </div>
        <div className={cardClass + `__image-wrapper place-card__image-wrapper`}>
          <a href="#">
            <img className="place-card__image" src={previewImage} width={`${cardClass === CardClass.FAVORITES ? `150` : `260`}`} height={`${cardClass === CardClass.FAVORITES ? `110` : `200`}`} alt="Place image" />
          </a>
        </div>
        <div className={`${cardClass === CardClass.FAVORITES ? `favorites__card-info` : ``} place-card__info`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <button className={`place-card__bookmark-button button ${isFavorite ? `place-card__bookmark-button--active` : ``}`} type="button" onClick={this._onFavoriteClick}>
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: rating * 100 / 5 + `%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name" onClick={this._onTitleClick}>
            <Link to={`/offer/${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired
  }),
  isSignIn: PropTypes.bool,
  cardClass: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func,
  onTitleClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
};

export default PlaceCard;
