import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._hoverHandler = this._hoverHandler.bind(this);
    this._onTitleClick = this._onTitleClick.bind(this);
  }

  _hoverHandler() {
    const offer = this.props.offer;
    this.props.onMouseEnter(offer);
  }

  _onTitleClick() {
    const {offer, onTitleClick} = this.props;
    onTitleClick(offer);
  }

  render() {
    const {offer} = this.props;
    const {
      title,
      price,
      isPremium,
      type,
      photo
    } = offer;
    const isPremiumClass = isPremium ? `place-card__mark` : `place-card__mark visually-hidden`;

    return (
      <article
        className="cities__place-card place-card"
        key={offer.id}
        onMouseEnter={this._hoverHandler}
      >
        <div className={isPremiumClass}>
          <span>Premium</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={photo} width="260" height="200" alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: 80 + `%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name" onClick={this._onTitleClick}>
            <a href="#">{title}</a>
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
    type: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
  }),
  onMouseEnter: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func
};

export default PlaceCard;
