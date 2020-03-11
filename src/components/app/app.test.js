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
  photo: `img/apartment-01.jpg`,
  cords: [52.3809553943508, 4.939309666406198]
}];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      count={Settings.COUNT}
      offers={offers}
    />, {
      createNodeMock: () => document.createElement(`div`)
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
