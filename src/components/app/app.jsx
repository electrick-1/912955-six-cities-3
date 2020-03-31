import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator as DataActionCreater} from "../../reducer/data/data.js";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";
import NameSpace from "../../reducer/name-space.js";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {CardClass} from "../../const.js";
import {getCurrentCity, getActiveOffer, getCurrentSortType, getStep, getSortedOffers} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getEmail} from "../../reducer/user/selectors.js";

class App extends PureComponent {
  _renderApp() {
    const {
      authorizationStatus,
      email,
      step,
      activeOffer,
      currentCity,
      titleClickHandler,
      onMouseEnter,
      sortedOffers,
      onSignInClick,
      isSignIn
    } = this.props;


    if (step === -1) {
      if (isSignIn) {
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
          />
        );
      } else {
        return (
          <SignIn />
        );
      }
    }
    return (
      <Property
        authorizationStatus={authorizationStatus}
        email={email}
        activeOffer={activeOffer}
        sortedOffers={sortedOffers}
        cardClass={CardClass.NEAR_PLACES}
        onTitleClick={titleClickHandler}
        onSignInClick={onSignInClick}
        isSignIn={isSignIn}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isSignIn: PropTypes.bool,
  onSignInClick: PropTypes.func,
  authorizationStatus: PropTypes.string.isRequired,
  email: PropTypes.string,
  step: PropTypes.number.isRequired,
  activeOffer: PropTypes.object,
  currentCity: PropTypes.string.isRequired,
  sortedOffers: PropTypes.array,
  titleClickHandler: PropTypes.func,
  onMouseEnter: PropTypes.func,
  currentSortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isSignIn: state[NameSpace.USER].isSignIn,
  email: getEmail(state),
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  currentSortType: getCurrentSortType(state),
  sortedOffers: getSortedOffers(state),
  currentCity: getCurrentCity(state),
  activeOffer: getActiveOffer(state)
});

const mapDispatchToProps = (dispatch) => ({
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
