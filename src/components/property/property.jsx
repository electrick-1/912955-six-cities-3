import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import Map from "../map/map.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

class Property extends PureComponent {
  render() {
    const {sortedOffers, activeOffer, onTitleClick, cardClass, email, authorizationStatus, onSignInClick} = this.props;
    const {
      title,
      price,
      isPremium,
      isFavorite,
      type,
      rating,
      bedrooms,
      images,
      maxAdults,
      goods,
      host,
      description
    } = activeOffer;

    const nearbyOffers = sortedOffers.filter((offer) => offer !== activeOffer).slice(0, 3);

    const isPremiumClass = isPremium ? `property__mark` : `property__mark visually-hidden`;

    const isFavoriteClass = isFavorite
      ? `property__bookmark-button property__bookmark-button--active button`
      : `property__bookmark-button button`;

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      {authorizationStatus === AuthorizationStatus.NO_AUTH ?
                        <span className="header__login"
                          onClick={onSignInClick}
                        >Sign in</span> :
                        <Fragment>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{email}</span>
                        </Fragment>
                      }
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((image) => {
                  return (
                    <div className="property__image-wrapper" key={image}>
                      <img className="property__image" src={image} alt="Photo studio" />
                    </div>
                  );
                }).slice(0, 6)
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className={isPremiumClass}>
                  <span>Premium</span>
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className={isFavoriteClass} type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: rating * 100 / 5 + `%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((option, i) => {
                      return (<li className="property__inside-item" key={`option-${i}`}>
                        {option}
                      </li>);
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  {
                    authorizationStatus === AuthorizationStatus.AUTH
                      ? <ReviewsForm />
                      : ``
                  }
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                sortedOffers={nearbyOffers}
                activeOffer={activeOffer}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearbyOffers.map((offer) => {
                  if (offer.id !== activeOffer.id) {
                    return (
                      <PlaceCard
                        offer={offer}
                        key={offer.id}
                        cardClass={cardClass}
                        onTitleClick={onTitleClick}
                        onMouseEnter={() => {}}
                      />);
                  } else {
                    return ``;
                  }
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Property.propTypes = {
  isSignIn: PropTypes.bool,
  onSignInClick: PropTypes.func,
  authorizationStatus: PropTypes.string,
  email: PropTypes.string,
  sortedOffers: PropTypes.array,
  activeOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number,
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    goods: PropTypes.array,
    host: PropTypes.object,
    description: PropTypes.string,
    images: PropTypes.array
  }),
  cardClass: PropTypes.string,
  onTitleClick: PropTypes.func
};

export default Property;
