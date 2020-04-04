import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import history from "../../history.js";
import PlaceCard from "../place-card/place-card.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import Map from "../map/map.jsx";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import NameSpace from "../../reducer/name-space.js";
import {getNearbyOffers, getReviews} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";

class Property extends PureComponent {
  constructor(props) {
    super(props);

    this._onFavoriteClick = this._onFavoriteClick.bind(this);

    this.state = {
      isFavorite: props.activeOffer.isFavorite,
    };
  }
  componentDidMount() {
    const {loadPropertyData} = this.props;
    loadPropertyData(this.props.activeOffer.id);
  }

  _onFavoriteClick() {
    const {isSignIn, activeOffer, addToFavorite} = this.props;
    if (!isSignIn) {
      return history.push(AppRoute.LOGIN);
    }

    addToFavorite(activeOffer);

    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }));

    return false;
  }

  render() {
    const {isReviewsLoading, isNearbyOffersLoading, activeOffer, onTitleClick, cardClass, email, nearbyOffers, reviews, isSignIn} = this.props;
    if (isReviewsLoading) {
      return false;
    }
    if (isNearbyOffersLoading) {
      return false;
    }

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
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewsList reviews={reviews}/>
                  {
                    !isSignIn ? <ReviewsForm /> : ``
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
  nearbyOffers: PropTypes.array,
  reviews: PropTypes.array,
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
  onTitleClick: PropTypes.func,
  loadPropertyData: PropTypes.func,
  addToFavorite: PropTypes.func,
  isReviewsLoading: PropTypes.bool,
  isNearbyOffersLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isSignIn: state[NameSpace.USER].isSignIn,
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  nearbyOffers: getNearbyOffers(state),
  reviews: getReviews(state),
  isReviewsLoading: state[NameSpace.DATA].isReviewsLoading,
  isNearbyOffersLoading: state[NameSpace.DATA].isNearbyOffersLoading
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorite(offer) {
    dispatch(DataOperation.addToFavorite(offer));
  },
  loadPropertyData(id) {
    dispatch(DataOperation.loadNearbyOffers(id));
    dispatch(DataOperation.loadReviews(id));
  }
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
