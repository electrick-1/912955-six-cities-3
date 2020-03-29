import {extend, parseOffer} from "../../utils.js";
import {SORT_TYPES} from "../../const.js";

const initialState = {
  currentCity: `Amsterdam`,
  currentSortType: `Popular`,
  step: -1,
  activeOffer: {},
  sortedOffers: [],
  offers: []
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFER: `CHANGE_OFFER`,
  HOVER_OFFER: `HOVER_OFFER`,
  CHANGE_SORT: `CHANGE_SORT`,
  LOAD_OFFERS: `LOAD_OFFERS`
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

  changeSortType: ({type, newOffers}) => ({
    type: ActionType.CHANGE_SORT,
    payload: {type, newOffers}
  }),

  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((responce) => {
        dispatch(ActionCreator.loadOffers(responce.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      let parsedOffers = action.payload.map((offer) => parseOffer(offer));
      let parseCity = parsedOffers[0].city.name;
      return extend(state, {
        offers: parsedOffers,
        currentCity: parseCity,
        sortedOffers: parsedOffers.filter((offer) => offer.city.name === parseCity)
      });
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload,
        sortedOffers: state.offers.filter((offer) => offer.city.name === action.payload),
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
        currentSortType: action.payload.type,
        sortedOffers: action.payload.newOffers
      });

  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
