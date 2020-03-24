import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {CardClass} from "../../const.js";

class App extends PureComponent {
  _renderApp() {
    const {
      step,
      activeOffer,
      currentCity,
      titleClickHandler,
      onMouseEnter,
      sortedOffers
    } = this.props;

    if (step === -1) {
      return (
        <Main
          activeOffer={activeOffer}
          cardClass={CardClass.CITIES}
          currentCity={currentCity}
          sortedOffers={sortedOffers}
          onTitleClick={titleClickHandler}
          onMouseEnter={onMouseEnter}
        />
      );
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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  step: PropTypes.number.isRequired,
  activeOffer: PropTypes.object,
  currentCity: PropTypes.string.isRequired,
  sortedOffers: PropTypes.array,
  titleClickHandler: PropTypes.func,
  onMouseEnter: PropTypes.func
};

const mapStateToProps = (state) => ({
  step: state.step,
  currentSortType: state.currentSortType,
  sortedOffers: state.sortedOffers,
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
