import {ActionType, reducer} from "./reducer";

const offers = [{
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  isPremium: true,
  bookmark: false,
  type: `Apartment`,
  photo: `img/apartment-01.jpg`,
  raiting: 4.8,
  quantityBedrooms: 3,
  quantityAdults: 4,
  options: [
    `Wi-Fi`,
    `Washing machine`,
    `Towels`,
    `Heating`,
    `Coffee machine`,
    `Baby seat`,
    `Kitchen`,
    `Dishwasher`,
    `Cabel TV`,
    `Fridge`
  ],
  cords: [52.3909553943508, 4.85309666406198],
  comments: [{
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: `2019-04-24`
  }]
}];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    currentCity: `Amsterdam`,
    activeOffer: {},
    offers,
  });
});

it(`Reducer should change city a given value`, () => {
  expect(reducer({
    step: -1,
    currentCity: `Amsterdam`,
    activeOffer: {},
    offers,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Roma`,
  })).toEqual({
    step: -1,
    currentCity: `Roma`,
    activeOffer: {},
    offers,
  });

  expect(reducer({
    step: -1,
    currentCity: `Amsterdam`,
    activeOffer: {},
    offers,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Amsterdam`,
  })).toEqual({
    step: -1,
    currentCity: `Amsterdam`,
    activeOffer: {},
    offers,
  });
});

it(`Reducer should change offer a given value`, () => {
  expect(reducer({
    step: -1,
    currentCity: `Amsterdam`,
    activeOffer: {},
    offers,
  }, {
    type: ActionType.CHANGE_OFFER,
    payload: offers[0],
  })).toEqual({
    step: 0,
    currentCity: `Amsterdam`,
    activeOffer: offers[0],
    offers,
  });

  expect(reducer({
    step: -1,
    currentCity: `Amsterdam`,
    activeOffer: {},
    offers,
  }, {
    type: ActionType.CHANGE_OFFER,
    payload: -1,
  })).toEqual({
    step: -1,
    currentCity: `Amsterdam`,
    activeOffer: {},
    offers,
  });
});
