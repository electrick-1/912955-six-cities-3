import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
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
      sortedOffers
    } = this.props;


    if (step === -1) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return (
          <Main
            activeOffer={activeOffer}
            cardClass={CardClass.CITIES}
            email={email}
            currentCity={currentCity}
            sortedOffers={sortedOffers}
            onTitleClick={titleClickHandler}
            onMouseEnter={onMouseEnter}
          />
        );
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <SignIn />
        );
      }

      return null;
    }

    return (
      <Property
        activeOffer={activeOffer}
        sortedOffers={sortedOffers}
        cardClass={CardClass.NEAR_PLACES}
        onTitleClick={titleClickHandler}
      />
    );
  }

  render() {
    const {sortedOffers, titleClickHandler} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <Property
              activeOffer={sortedOffers[0]}
              sortedOffers={sortedOffers}
              cardClass={CardClass.NEAR_PLACES}
              onTitleClick={titleClickHandler}
            />
          </Route>
          <Route exact path="/dev-auth">
            <SignIn />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
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
  email: getEmail(state),
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  currentSortType: getCurrentSortType(state),
  sortedOffers: getSortedOffers(state),
  currentCity: getCurrentCity(state),
  activeOffer: getActiveOffer(state)
});

const mapDispatchToProps = (dispatch) => ({
  titleClickHandler(offer) {
    dispatch(ActionCreator.changeOffer(offer));
  },
  onMouseEnter(offer) {
    dispatch(ActionCreator.hoverOffer(offer));
  },
  cityClickHandler(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
