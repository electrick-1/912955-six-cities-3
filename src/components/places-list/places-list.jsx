import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, onTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) =>
          <PlaceCard
            offer={offer}
            key={offer.id}
            onTitleClick={onTitleClick}
            onMouseEnter={() => {}}
          />
        )}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  onTitleClick: PropTypes.func.isRequired
};

export default PlacesList;
