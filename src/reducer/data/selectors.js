import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const getCurrentCity = (state) => {
  return state[NameSpace.DATA].currentCity;
};

const getActiveOffer = (state) => {
  return state[NameSpace.DATA].activeOffer;
};

const getOffers = (state) => {
  return state[NameSpace.DATA].sortedOffers;
};

const getCurrentSortType = (state) => {
  return state[NameSpace.DATA].currentSortType;
};

const getStep = (state) => {
  return state[NameSpace.DATA].step;
};

const getNearbyOffers = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

const getSortedOffers = createSelector(
    getOffers,
    getCurrentCity,
    (sortedOffers, currentCity) => {
      return sortedOffers.filter((offer) => offer.city.name === currentCity);
    }
);

export {getCurrentCity, getActiveOffer, getOffers, getCurrentSortType, getStep, getSortedOffers, getNearbyOffers, getReviews};
