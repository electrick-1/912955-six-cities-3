import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import PlaceCard from "../place-card/place-card.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import Map from "../map/map.jsx";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import NameSpace from "../../reducer/name-space.js";
import {getNearbyOffers, getReviews} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";

class Property extends PureComponent {
  constructor(props) {
    super(props);

    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  componentDidMount() {
    const {loadPropertyData, id} = this.props;
    loadPropertyData(id);
  }

  _onFavoriteClick() {
    const {onFavoriteButtonClick, isSignIn} = this.props;
    if (!isSignIn) {
      return history.push(AppRoute.LOGIN);
    }
    onFavoriteButtonClick(this.offer);
    return false;
  }

  render() {
    const {id, offers, isOffersLoading, isReviewsLoading, isNearbyOffersLoading, onTitleClick, cardClass, email, nearbyOffers, reviews, isSignIn, onFavoriteButtonClick} = this.props;

    if (isOffersLoading) {
      return false;
    }
    if (isReviewsLoading) {
      return false;
    }
    if (isNearbyOffersLoading) {
      return false;
    }

    this.offer = offers.find((offer) => offer.id === Number(id));

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
    } = this.offer;

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRoute.ROOT}>
                  <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={isSignIn ? AppRoute.FAVORITES : AppRoute.LOGIN}>
                      {isSignIn
                        ? <Fragment>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{email}</span>
                        </Fragment>
                        : <span className="header__login">Sign in</span>
                      }
                    </Link>
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
                <div className={`property__mark ${isPremium ? `` : `visually-hidden`}`}>
                  <span>Premium</span>
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className={`property__bookmark-button button ${isFavorite ? `property__bookmark-button--active` : ``}`} type="button" onClick={this._onFavoriteClick}>
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
                      <img className="property__avatar user__avatar" src={`/` + host.avatarUrl} width="74" height="74" alt="Host avatar" />
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
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewsList reviews={reviews}/>
                  {
                    isSignIn ? <ReviewsForm id={Number(id)} /> : ``
                  }
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                sortedOffers={nearbyOffers}
                offers={offers}
                id={Number(id)}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearbyOffers.map((offer) => {
                  return (
                    <PlaceCard
                      offer={offer}
                      key={`nearby-${offer.id}`}
                      cardClass={cardClass}
                      onTitleClick={onTitleClick}
                      onMouseEnter={() => {}}
                      isSignIn={isSignIn}
                      onFavoriteButtonClick={onFavoriteButtonClick}
                      onMouseLeave={() => {}}
                    />);
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
  offers: PropTypes.array,
  id: PropTypes.string.isRequired,
  isSignIn: PropTypes.bool,
  onSignInClick: PropTypes.func,
  authorizationStatus: PropTypes.string,
  email: PropTypes.string,
  nearbyOffers: PropTypes.array,
  reviews: PropTypes.array,
  cardClass: PropTypes.string,
  onTitleClick: PropTypes.func,
  loadPropertyData: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
  isReviewsLoading: PropTypes.bool,
  isNearbyOffersLoading: PropTypes.bool,
  isOffersLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isSignIn: state[NameSpace.USER].isSignIn,
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  nearbyOffers: getNearbyOffers(state),
  reviews: getReviews(state),
  isReviewsLoading: state[NameSpace.DATA].isReviewsLoading,
  isNearbyOffersLoading: state[NameSpace.DATA].isNearbyOffersLoading,
  offers: state[NameSpace.DATA].offers,
  isOffersLoading: state[NameSpace.DATA].isOffersLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(offer) {
    dispatch(DataOperation.addToFavorite(offer));
  },
  loadPropertyData(id) {
    dispatch(DataOperation.loadNearbyOffers(id));
    dispatch(DataOperation.loadReviews(id));
  }
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
