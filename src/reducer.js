import {extend} from "./utils.js";
import {offers} from "./mocks/offers.js";

const initialState = {
  currentCity: `Amsterdam`,
  offers,
  step: -1,
  activeOffer: {}
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFER: `CHANGE_OFFER`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),

  changeOffer: (offer) => ({
    type: ActionType.CHANGE_OFFER,
    payload: offer
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload
      });
    case ActionType.CHANGE_OFFER:
      return extend(state, {
        activeOffer: action.payload,
        step: 0
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
