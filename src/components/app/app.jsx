import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";

const CardClass = {
  CITIES: `cities`,
  NEAR_PLACES: `near-places`
};

class App extends PureComponent {
  _renderApp() {
    const {
      offers,
      step,
      activeOffer,
      currentCity,
      titleClickHandler
    } = this.props;

    const offersInCity = offers.filter((offer) => offer.city.name === currentCity);

    if (step === -1 || step >= offers.length) {
      return (
        <Main
          offers={offersInCity}
          activeOffer={activeOffer}
          cardClass={CardClass.CITIES}
          currentCity={currentCity}
          onTitleClick={titleClickHandler}
        />
      );
    }

    return (
      <Property
        activeOffer={activeOffer}
        offers={offers}
        cardClass={CardClass.NEAR_PLACES}
        onTitleClick={titleClickHandler}
      />
    );
  }

  render() {
    const {offers, titleClickHandler} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <Property
              activeOffer={offers[0]}
              offers={offers}
              cardClass={CardClass.NEAR_PLACES}
              onTitleClick={titleClickHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array,
  step: PropTypes.number.isRequired,
  activeOffer: PropTypes.object,
  currentCity: PropTypes.string.isRequired,
  titleClickHandler: PropTypes.func
};

const mapStateToProps = (state) => ({
  step: state.step,
  offers: state.offers,
  currentCity: state.currentCity,
  activeOffer: state.activeOffer
});

const mapDispatchToProps = (dispatch) => ({
  titleClickHandler(offer) {
    dispatch(ActionCreator.changeOffer(offer));
  },
  cityClickHandler(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
