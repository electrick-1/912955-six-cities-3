import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import NameSpace from "../../reducer/name-space.js";
import {Favorites} from "./favorites.jsx";

const mockStore = configureStore([]);

const favoriteOffers = [{
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

it(`Should Favorites component render correctly`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      favoriteOffers,
      isFavoritesLoading: true,
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites
            addToFavorite={() => {}}
            favoriteOffers={favoriteOffers}
            loadFavoriteOffers={() => {}}
            isFavoritesOffersLoading={false}
            isSignIn={true}
            email={`elbandido@mail.ru`}
            onMouseEnter={() => {}}
            onTitleClick={() => {}}
          />
        </BrowserRouter>
      </Provider>
  )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
