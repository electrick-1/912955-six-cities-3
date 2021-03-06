import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import PlacesList from "../places-list/places-list.jsx";
import Map from "../map/map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import SortList from "../sort-list/sort-list.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import {AppRoute} from "../../const.js";

function Main({
  email,
  onTitleClick,
  onMouseEnter,
  onMouseLeave,
  onCityClick,
  activeOffer,
  cardClass,
  currentCity,
  sortedOffers,
  isSignIn,
  onFavoriteButtonClick
}) {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={isSignIn ? AppRoute.FAVORITES : AppRoute.LOGIN}
                  >
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

      <main className={`page__main page__main--index ${sortedOffers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={currentCity} onCityClick={onCityClick}/>
        {sortedOffers.length !== 0
          ? <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
                <SortList />
                <PlacesList
                  isSignIn={isSignIn}
                  sortedOffers={sortedOffers}
                  onFavoriteButtonClick={onFavoriteButtonClick}
                  cardClass={cardClass}
                  onTitleClick={onTitleClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onCityClick={onCityClick}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    sortedOffers={sortedOffers}
                    id={activeOffer.id}
                    offers={sortedOffers}
                  />
                </section>
              </div>
            </div>
          </div>
          : <MainEmpty />
        }
      </main>
    </div>
  );
}

Main.propTypes = {
  isSignIn: PropTypes.bool,
  email: PropTypes.string,
  onSignInClick: PropTypes.func,
  authorizationStatus: PropTypes.string,
  onTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func,
  onCityClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  activeOffer: PropTypes.shape({
    id: PropTypes.number
  }),
  offers: PropTypes.array,
  sortedOffers: PropTypes.array,
  cardClass: PropTypes.string,
  currentCity: PropTypes.string.isRequired
};

export default Main;
