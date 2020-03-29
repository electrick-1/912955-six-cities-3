import React from "react";
import PropTypes from "prop-types";
import withActiveItem from "../../hocs/with-sorting-item/with-sorting-item.jsx";

const sortType = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

function SortList({
  currentSortType,
  sortListIsOpen,
  onSortListClick,
  onSortTypeClick
}) {
  const isOpenSortClass = sortListIsOpen
    ? `places__options places__options--custom places__options--opened`
    : `places__options places__options--custom`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" onClick={onSortListClick}>Sort by</span>
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

SortList.propTypes = {
  currentSortType: PropTypes.string,
  sortListIsOpen: PropTypes.bool.isRequired,
  onSortListClick: PropTypes.func.isRequired,
  onSortTypeClick: PropTypes.func.isRequired
};

export {SortList};
export default withActiveItem(SortList);
