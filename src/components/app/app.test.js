import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const Settings = {
  COUNT: 123
};

const offers = [{
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  isPremium: true,
  type: `Apartment`,
  photo: `img/apartment-01.jpg`
}];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      count={Settings.COUNT}
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
