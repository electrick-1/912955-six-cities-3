import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import Map from "../map/map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import SortList from "../sort-list/sort-list.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";

class Main extends PureComponent {
  render() {
    const {
      onTitleClick,
      onMouseEnter,
      activeOffer,
      cardClass,
      currentCity,
      sortedOffers
    } = this.props;

    const isOffers = () => {
      if (sortedOffers.length === 0) {
        return (
          <MainEmpty />
        );
      } else {
        return (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
                <SortList />
                <PlacesList
                  cardClass={cardClass}
                  onTitleClick={onTitleClick}
                  onMouseEnter={onMouseEnter}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    sortedOffers={sortedOffers}
                    activeOffer={activeOffer}
                  />
                </section>
              </div>
            </div>
          </div>
        );
      }
    };

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
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className={`page__main page__main--index ${sortedOffers.length === 0 ? `page__main--index-empty` : ``}`}>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList />
          {isOffers()}
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  onTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  activeOffer: PropTypes.object,
  sortedOffers: PropTypes.array,
  cardClass: PropTypes.string,
  currentCity: PropTypes.string.isRequired
};

export default Main;
