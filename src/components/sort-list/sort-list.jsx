import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

const sortType = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

class SortList extends PureComponent {
  render() {
    const {currentSortType, sortListIsOpen, onSortListClick, onSortTypeClick} = this.props;
    const isOpenSortClass = sortListIsOpen
      ? `places__options places__options--custom places__options--opened`
      : `places__options places__options--custom`;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0" onClick={onSortListClick}>
          {sortType.POPULAR}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={isOpenSortClass}>
          {sortType.map((type) => {
            return (
              <li className={currentSortType === type ? `places__option places__option--active` : `places__option`} tabIndex="0" key={type} onClick={() => onSortTypeClick(type)}>{type}</li>
            );
          })}
        </ul>
      </form>
    );
  }
}

SortList.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  sortListIsOpen: PropTypes.bool.isRequired,
  onSortListClick: PropTypes.func.isRequired,
  onSortTypeClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentSortType: state.currentSortType,
  sortListIsOpen: state.sortListIsOpen
});

const mapDispatchToProps = (dispatch) => ({
  onSortListClick() {
    dispatch(ActionCreator.sortListToggle());
  },
  onSortTypeClick(newSortType) {
    dispatch(ActionCreator.changeSortType(newSortType));
  }
});

export {SortList};
export default connect(mapStateToProps, mapDispatchToProps)(SortList);
