import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {cities} from "../../const.js";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentCity, cityClickHandler} = this.props;
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => {
              return (
                <li onClick={() => cityClickHandler(city)}
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
}

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  cityClickHandler: PropTypes.func
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity
});

const mapDispatchToProps = (dispatch) => ({
  cityClickHandler(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
