import React from "react";
import PropTypes from "prop-types";
import {Cities} from "../../const.js";

function CitiesList({currentCity, onCityClick}) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Cities.map((city) => {
            return (
              <li onClick={() => onCityClick(city)}
                className="locations__item" key={city}>
                <a className={
                  `locations__item-link
                  tabs__item
                  ${
              currentCity === city
                ? `tabs__item--active`
                : ``
              }`
                } href="#">
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

CitiesList.propTypes = {
  currentCity: PropTypes.string,
  onCityClick: PropTypes.func
};

export default CitiesList;
