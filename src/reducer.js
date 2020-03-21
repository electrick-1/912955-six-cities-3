import {extend} from "./utils.js";
import {offers} from "./mocks/offers.js";

const SORT_TYPES = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  RATED: `Top rated first`
};


const offersInCity = (city) => {
  return offers.filter((offer) => offer.city.name === city);
};

const initialState = {
  currentCity: `Amsterdam`,
  currentSortType: `Popular`,
  sortListIsOpen: false,
  offers: offersInCity(`Amsterdam`),
  step: -1,
  activeOffer: {}
};

const sortedOffers = (sortType) => {
  switch (sortType) {
    case SORT_TYPES.LOW_TO_HIGH:
      return offersInCity(initialState.currentCity).sort((a, b) => a.price - b.price);
    case SORT_TYPES.HIGH_TO_LOW:
      return offersInCity(initialState.currentCity).sort((a, b) => b.price - a.price);
    case SORT_TYPES.RATED:
      return offersInCity(initialState.currentCity).sort((a, b) => b.rating - a.rating);
    default:
      return offersInCity(initialState.currentCity);
  }
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFER: `CHANGE_OFFER`,
  HOVER_OFFER: `HOVER_OFFER`,
  TOGGLE_SORT: `TOGGLE_SORT`,
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

  sortListToggle: () => ({
    type: ActionType.TOGGLE_SORT,
    payload: null
  }),

  changeSortType: (sort) => ({
    type: ActionType.CHANGE_SORT,
    payload: sort
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
    case ActionType.TOGGLE_SORT:
      return extend(state, {
        sortListIsOpen: !state.sortListIsOpen
      });
    case ActionType.CHANGE_SORT:
      return extend(state, {
        currentSortType: action.payload,
        sortListIsOpen: false,
        offers: sortedOffers(action.payload)
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
