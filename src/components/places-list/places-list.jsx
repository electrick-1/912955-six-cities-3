import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  render() {
    const {
      sortedOffers,
      cardClass,
      onTitleClick,
      onMouseEnter
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) =>
          <PlaceCard
            offer={offer}
            key={offer.id}
            cardClass={cardClass}
            onTitleClick={onTitleClick}
            onMouseEnter={onMouseEnter}
          />
        )}
      </div>
    );
  }
}


PlacesList.propTypes = {
  cardClass: PropTypes.string,
  sortedOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  onTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  sortedOffers: state.sortedOffers
});

export {PlacesList};
export default connect(mapStateToProps)(PlacesList);
