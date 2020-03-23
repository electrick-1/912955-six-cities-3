import {extend} from "./utils.js";
import {offers} from "./mocks/offers.js";
import {SORT_TYPES} from "./const.js";

const offersInCity = (city) => {
  return offers.filter((offer) => offer.city.name === city);
};

const initialState = {
  currentCity: `Amsterdam`,
  currentSortType: `Popular`,
  offers: offersInCity(`Amsterdam`),
  step: -1,
  activeOffer: {}
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFER: `CHANGE_OFFER`,
  HOVER_OFFER: `HOVER_OFFER`,
  CHANGE_SORT: `CHANGE_SORT`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),

  changeOffer: (offer) => ({
    type: ActionType.CHANGE_OFFER,
    payload: offer
  }),

  hoverOffer: (offer) => ({
    type: ActionType.HOVER_OFFER,
    payload: offer
  }),

  changeSortType: (sortedOffers) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortedOffers
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload,
        offers: offersInCity(action.payload),
        currentSortType: SORT_TYPES.POPULAR
      });
    case ActionType.CHANGE_OFFER:
      return extend(state, {
        activeOffer: action.payload,
        step: 0
      });
    case ActionType.HOVER_OFFER:
      return extend(state, {
        activeOffer: action.payload
      });
    case ActionType.CHANGE_SORT:
      return extend(state, {
        currentSortType: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
