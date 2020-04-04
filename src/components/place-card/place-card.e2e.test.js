import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlaceCard from "./place-card.jsx";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const offer = {
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
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should title be pressed`, () => {
  const onTitleClick = jest.fn();
  const onMouseEnter = jest.fn();

  const store = mockStore({
    [NameSpace.USER]: {
      isSignIn: true
    },
    offer,
    currentCity: `Amsterdam`
  });

  const placeCard = mount(
      <Provider store={store}>
        <PlaceCard
          offer={offer}
          key={offer.id}
          cardClass={`cities`}
          onTitleClick={() => {}}
          onMouseEnter={() => {}}
        />
      </Provider>
  );

  const title = placeCard.find(`h2.place-card__name`);

  title.simulate(`click`);

  placeCard.simulate(`mouseEnter`);

  expect(onTitleClick.mock.calls.length).toBe(0);
  expect(onMouseEnter.mock.calls.length).toBe(0);
});
