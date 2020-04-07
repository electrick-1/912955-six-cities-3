import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

function PlacesList({
  sortedOffers,
  cardClass,
  onTitleClick,
  onMouseEnter,
  onMouseLeave,
  isSignIn,
  onFavoriteButtonClick
}) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) =>
        <PlaceCard
          offer={offer}
          key={offer.id}
          cardClass={cardClass}
          onTitleClick={onTitleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isSignIn={isSignIn}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      )}
    </div>
  );
}


PlacesList.propTypes = {
  cardClass: PropTypes.string,
  sortedOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  onTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  isSignIn: PropTypes.bool
};

export default PlacesList;
