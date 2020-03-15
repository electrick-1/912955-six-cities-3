import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";

const CardClass = {
  CITIES: `cities`,
  NEAR_PLACES: `near-places`
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._titleClickHandler = this._titleClickHandler.bind(this);

    this.state = {
      step: -1,
      activeCard: {}
    };
  }

  _titleClickHandler(offer) {
    this.setState((prevState) => ({
      step: prevState.step + 1,
      activeCard: offer
    }));
  }

  _renderApp() {
    const {count, offers} = this.props;
    const {step, activeCard} = this.state;

    if (step === -1 || step >= offers.length) {
      return (
        <Main
          count={count}
          offers={offers}
          offer={activeCard}
          cardClass={CardClass.CITIES}
          onTitleClick={this._titleClickHandler}
        />
      );
    }

    return (
      <Property
        offer={activeCard}
        offers={offers}
        cardClass={CardClass.NEAR_PLACES}
      />
    );
  }

  render() {
    const {offers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <Property
              offer={offers[0]}
              offers={offers}
              cardClass={CardClass.NEAR_PLACES}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  count: PropTypes.number.isRequired,
  offers: PropTypes.array
};

export default App;
