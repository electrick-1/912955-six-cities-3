import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data.js";
import NameSpace from "../../reducer/name-space.js";
import {getFavoriteOffers} from "../../reducer/data/selectors.js";
import {AppRoute, CardClass, Cities} from "../../const.js";
import {Link} from "react-router-dom";
import PlaceCard from "../place-card/place-card.jsx";
import FavoritesEmpty from "./favorites-empty.jsx";

class Favorites extends PureComponent {
  componentDidMount() {
    const {loadFavoriteOffers} = this.props;
    loadFavoriteOffers();
  }

  render() {
    const {isSignIn, onFavoriteButtonClick, email, isFavoriteOffersLoading, favoriteOffers, onMouseEnter, onTitleClick} = this.props;


    if (isFavoriteOffersLoading) {
      return false;
    }

    if (!favoriteOffers.length) {
      return <FavoritesEmpty email={email}/>;
    }

    return (
      <div className="page page--favorites-empty">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRoute.ROOT}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81"
                    height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.FAVORITES}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{email}</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Cities.map((city) => {
                  return (
                    favoriteOffers.filter((offer) => offer.city.name === city).length !== 0 ?
                      <li className="favorites__locations-items" key={city}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {favoriteOffers.filter((offer) => offer.city.name === city).map((card) => {
                            return (
                              <PlaceCard
                                isSignIn={isSignIn}
                                onFavoriteButtonClick={onFavoriteButtonClick}
                                onMouseEnter={onMouseEnter}
                                onTitleClick={onTitleClick}
                                offer={card}
                                key={card.id}
                                cardClass={CardClass.FAVORITES}
                                onMouseLeave={() => {}}
                              />);
                          })}
                        </div>
                      </li> : ``);
                }
                )}
              </ul>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Favorites.propTypes = {
  isSignIn: PropTypes.bool,
  onFavoriteButtonClick: PropTypes.func,
  email: PropTypes.string,
  isFavoriteOffersLoading: PropTypes.bool,
  favoriteOffers: PropTypes.array,
  onMouseEnter: PropTypes.func,
  onTitleClick: PropTypes.func,
  loadFavoriteOffers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  email: state[NameSpace.USER].email,
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  isFavoriteOffersLoading: state[NameSpace.DATA].isFavoriteOffersLoading,
  favoriteOffers: getFavoriteOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteOffers() {
    dispatch(Operation.loadFavoriteOffers());
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
