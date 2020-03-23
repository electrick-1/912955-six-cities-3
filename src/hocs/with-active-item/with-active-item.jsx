import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {SORT_TYPES} from "../../const.js";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        sortListIsOpen: false,
        currentSortType: `Popular`,
        offers: []
      };

      this.sortClickHandler = this.sortClickHandler.bind(this);
      this.sortTypeClickHandler = this.sortTypeClickHandler.bind(this);
    }

    sortClickHandler() {
      this.setState((prevState) => ({
        sortListIsOpen: !prevState.sortListIsOpen
      }));
    }

    sortTypeClickHandler(evt) {
      const {offers, onSortTypeClick} = this.props;

      let sortedOffers = [];

      switch (evt) {
        case SORT_TYPES.LOW_TO_HIGH:
          sortedOffers = offers.sort((a, b) => a.price - b.price);
          break;
        case SORT_TYPES.HIGH_TO_LOW:
          sortedOffers = offers.sort((a, b) => b.price - a.price);
          break;
        case SORT_TYPES.RATED:
          sortedOffers = offers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          sortedOffers = offers;
          break;
      }

      this.setState((prevState) => ({
        currentSortType: evt,
        sortListIsOpen: !prevState.sortListIsOpen,
        offers: sortedOffers
      }));

      onSortTypeClick(evt);
    }

    render() {
      const sortListIsOpen = this.state.sortListIsOpen;

      return (
        <Component
          {...this.props}
          sortListIsOpen={sortListIsOpen} onSortListClick={this.sortClickHandler}
          onSortTypeClick={this.sortTypeClickHandler}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    offers: PropTypes.array,
    onSortTypeClick: PropTypes.func
  };

  const mapStateToProps = (state) => ({
    offers: state.offers,
    currentSortType: state.currentSortType
  });

  const mapDispatchToProps = (dispatch) => ({
    onSortTypeClick(type) {
      dispatch(ActionCreator.changeSortType(type));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveItem);
};

export default withActiveItem;
