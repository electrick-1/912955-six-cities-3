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
import SignIn from "../sign-in/sign-in.jsx";
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
      titleClickHandler,
      onMouseEnter,
      sortedOffers,
      onSignInClick,
      isSignIn,
      addToFavoriteClick
    } = this.props;


    return (
      <Main
        activeOffer={activeOffer}
        cardClass={CardClass.CITIES}
        email={email}
        currentCity={currentCity}
        sortedOffers={sortedOffers}
        onTitleClick={titleClickHandler}
        onMouseEnter={onMouseEnter}
        onSignInClick={onSignInClick}
        isSignIn={isSignIn}
        addToFavorite={addToFavoriteClick}
      />
    );
  }

  render() {
    const {
      email,
      activeOffer,
      titleClickHandler,
      sortedOffers,
      onSignInClick,
      isSignIn,
      onMouseEnter,
      addToFavoriteClick
    } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            {this.props.isSignIn ? <Redirect to={AppRoute.ROOT} /> : <SignIn />}
          </Route>
          <Route path={AppRoute.PROPERTY} render={(routeProps) =>
            <Property
              id={routeProps.match.params.id}
              email={email}
              activeOffer={activeOffer}
              sortedOffers={sortedOffers}
              cardClass={CardClass.NEAR_PLACES}
              onTitleClick={titleClickHandler}
              onSignInClick={onSignInClick}
              isSignIn={isSignIn}
              addToFavorite={addToFavoriteClick}
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
                  addToFavorite={addToFavoriteClick}
                  onMouseEnter={onMouseEnter}
                  onTitleClick={titleClickHandler}
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
  isSignIn: PropTypes.bool,
  onSignInClick: PropTypes.func,
  email: PropTypes.string,
  activeOffer: PropTypes.object,
  currentCity: PropTypes.string.isRequired,
  sortedOffers: PropTypes.array,
  titleClickHandler: PropTypes.func,
  onMouseEnter: PropTypes.func,
  currentSortType: PropTypes.string.isRequired,
  addToFavoriteClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isSignIn: state[NameSpace.USER].isSignIn,
  email: getEmail(state),
  step: getStep(state),
  currentSortType: getCurrentSortType(state),
  sortedOffers: getSortedOffers(state),
  currentCity: getCurrentCity(state),
  activeOffer: getActiveOffer(state)
});

const mapDispatchToProps = (dispatch) => ({
  addToFavoriteClick(offer) {
    dispatch(DataOperation.addToFavorite(offer));
  },
  onSignInClick() {
    dispatch(UserActionCreator.signIn());
  },
  titleClickHandler(offer) {
    dispatch(DataActionCreater.changeOffer(offer));
  },
  onMouseEnter(offer) {
    dispatch(DataActionCreater.hoverOffer(offer));
  },
  cityClickHandler(city) {
    dispatch(DataActionCreater.changeCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
