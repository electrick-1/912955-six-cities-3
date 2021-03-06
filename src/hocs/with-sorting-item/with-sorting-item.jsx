import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSortedOffers, getCurrentSortType} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/data/data.js";
import {SortTypes} from "../../const.js";

const withSortingItem = (Component) => {
  class WithSortingItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentCity: `Amsterdam`,
        sortListIsOpen: false,
        currentSortType: `Popular`,
        sortedOffers: [],
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
      const {sortedOffers, onSortTypeClick} = this.props;

      let newOffers = [];

      switch (evt) {
        case SortTypes.POPULAR:
          newOffers = sortedOffers.sort((a, b) => a.id - b.id);
          break;
        case SortTypes.LOW_TO_HIGH:
          newOffers = sortedOffers.sort((a, b) => a.price - b.price);
          break;
        case SortTypes.HIGH_TO_LOW:
          newOffers = sortedOffers.sort((a, b) => b.price - a.price);
          break;
        case SortTypes.RATED:
          newOffers = sortedOffers.sort((a, b) => b.rating - a.rating);
          break;
      }

      this.setState((prevState) => ({
        currentSortType: evt,
        sortListIsOpen: !prevState.sortListIsOpen,
        sortedOffers: newOffers
      }));

      onSortTypeClick({type: evt, newOffers: sortedOffers});
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

  WithSortingItem.propTypes = {
    currentCity: PropTypes.string,
    offers: PropTypes.array,
    sortedOffers: PropTypes.array,
    onSortTypeClick: PropTypes.func
  };

  const mapStateToProps = (state) => ({
    sortedOffers: getSortedOffers(state),
    currentSortType: getCurrentSortType(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    onSortTypeClick({type, newOffers}) {
      dispatch(ActionCreator.changeSortType({type, newOffers}));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithSortingItem);
};

export default withSortingItem;
