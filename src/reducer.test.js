import {ActionType, reducer} from "./reducer";

const offers = [{
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    name: `Amsterdam`
  },
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    avatarUrl: `img/1.png`,
    id: 3,
    isPro: true,
    name: `Angelina`
  },
  id: 1,
  images: [`img/1.png`, `img/2.png`],
  isFavorite: false,
  isPremium: true,
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8
  },
  maxAdults: 4,
  previewImage: `img/apartment-01.jpg`,
  price: 120,
  rating: 4.8,
  title: `Beautiful & luxurious studio at great location`,
  type: `Apartment`,
  comments: [
    {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      date: `2019-05-08T14:13:56.569Z`,
      id: 1,
      rating: 4,
      user: {
        avatarUrl: `img/avatar-max.jpg`,
        id: 4,
        isPro: false,
        name: `Max`
      }
    }
  ]
}];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: -1,
    activeOffer: {}
  }, {})).toEqual({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: -1,
    activeOffer: {}
  });
});

it(`Reducer should change city a given value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: -1,
    activeOffer: {}
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Roma`,
  })).toEqual({
    currentCity: `Roma`,
    currentSortType: `Popular`,
    offers: [],
    step: -1,
    activeOffer: {}
  });
});

it(`Reducer should change offer a given value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: -1,
    activeOffer: {}
  }, {
    type: ActionType.CHANGE_OFFER,
    payload: offers[0],
  })).toEqual({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: 0,
    activeOffer: offers[0]
  });
});

it(`Reducer should hover offer a given value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: -1,
    activeOffer: {}
  }, {
    type: ActionType.HOVER_OFFER,
    payload: offers[0],
  })).toEqual({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: -1,
    activeOffer: offers[0]
  });
});

it(`Reducer should hover offer a given value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    currentSortType: `Popular`,
    offers,
    step: -1,
    activeOffer: {}
  }, {
    type: ActionType.CHANGE_SORT,
    payload: `Price: low to high`,
  })).toEqual({
    currentCity: `Amsterdam`,
    currentSortType: `Price: low to high`,
    offers,
    step: -1,
    activeOffer: {}
  });
});
