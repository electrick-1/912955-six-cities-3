import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  render() {
    const {
      sortedOffers,
      cardClass,
      onTitleClick,
      onMouseEnter,
      isSignIn,
      addToFavorite
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
            isSignIn={isSignIn}
            addToFavorite={addToFavorite}
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
  onMouseEnter: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  isSignIn: PropTypes.bool
};

export default PlacesList;
