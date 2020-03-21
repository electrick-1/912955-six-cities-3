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
      titleClickHandler,
      onMouseEnter
    } = this.props;


    if (step === -1) {
      return (
        <Main
          offers={offers}
          activeOffer={activeOffer}
          cardClass={CardClass.CITIES}
          currentCity={currentCity}
          onTitleClick={titleClickHandler}
          onMouseEnter={onMouseEnter}
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
              activeOffer={offers[0] || []}
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
  titleClickHandler: PropTypes.func,
  onMouseEnter: PropTypes.func
};

const mapStateToProps = (state) => ({
  step: state.step,
  offers: state.offers,
  currentSortType: state.currentSortType,
  currentCity: state.currentCity,
  activeOffer: state.activeOffer
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
