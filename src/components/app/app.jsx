import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import history from "../../history.js";
import {connect} from "react-redux";
import {ActionCreator as DataActionCreater, Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";
import NameSpace from "../../reducer/name-space.js";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import Favorites from "../favorites/favorites.jsx";
import LoginScreen from "../login-screen/login-screen.jsx";
import {CardClass, AppRoute} from "../../const.js";
import {getCurrentCity, getActiveOffer, getCurrentSortType, getStep, getSortedOffers} from "../../reducer/data/selectors.js";
import {getEmail} from "../../reducer/user/selectors.js";
import PrivateRoute from "../private-route/private-route.jsx";

class App extends PureComponent {
  _renderApp() {
    const {
      email,
      activeOffer,
      currentCity,
      onTitleClick,
      onMouseEnter,
      onMouseLeave,
      onCityClick,
      sortedOffers,
      onSignInClick,
      isSignIn,
      onFavoriteButtonClick
    } = this.props;

    return (
      <Main
        activeOffer={activeOffer}
        cardClass={CardClass.CITIES}
        email={email}
        currentCity={currentCity}
        sortedOffers={sortedOffers}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onSignInClick={onSignInClick}
        isSignIn={isSignIn}
        onFavoriteButtonClick={onFavoriteButtonClick}
        onCityClick={onCityClick}
      />
    );
  }

  render() {
    const {
      email,
      activeOffer,
      onTitleClick,
      offers,
      sortedOffers,
      onSignInClick,
      isSignIn,
      onMouseEnter,
      onFavoriteButtonClick
    } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            {this.props.isSignIn ? <Redirect to={AppRoute.ROOT} /> : <LoginScreen />}
          </Route>
          <Route path={`${AppRoute.PROPERTY}/:id`} render={(routeProps) =>
            <Property
              id={routeProps.match.params.id}
              email={email}
              activeOffer={activeOffer}
              offers={offers}
              sortedOffers={sortedOffers}
              cardClass={CardClass.NEAR_PLACES}
              onTitleClick={onTitleClick}
              onSignInClick={onSignInClick}
              isSignIn={isSignIn}
              onFavoriteButtonClick={onFavoriteButtonClick}
            />
          }
          >
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => {
              return (
                <Favorites
                  isSignIn={isSignIn}
                  onFavoriteButtonClick={onFavoriteButtonClick}
                  onMouseEnter={onMouseEnter}
                  onTitleClick={onTitleClick}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array,
  isSignIn: PropTypes.bool,
  onSignInClick: PropTypes.func,
  email: PropTypes.string,
  activeOffer: PropTypes.object,
  currentCity: PropTypes.string.isRequired,
  sortedOffers: PropTypes.array,
  onTitleClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onCityClick: PropTypes.func,
  currentSortType: PropTypes.string.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isSignIn: state[NameSpace.USER].isSignIn,
  email: getEmail(state),
  step: getStep(state),
  currentSortType: getCurrentSortType(state),
  offers: state[NameSpace.DATA].offers,
  sortedOffers: getSortedOffers(state),
  currentCity: getCurrentCity(state),
  activeOffer: getActiveOffer(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(offer) {
    dispatch(DataOperation.addToFavorite(offer));
  },
  onSignInClick() {
    dispatch(UserActionCreator.signIn());
  },
  onTitleClick(offer) {
    dispatch(DataActionCreater.changeOffer(offer));
    dispatch(DataOperation.loadNearbyOffers(offer.id));
    dispatch(DataOperation.loadReviews(offer.id));
  },
  onMouseEnter(offer) {
    dispatch(DataActionCreater.hoverOffer(offer));
  },
  onMouseLeave(offer) {
    dispatch(DataActionCreater.leaveOffer(offer));
  },
  onCityClick(city) {
    dispatch(DataActionCreater.changeCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
