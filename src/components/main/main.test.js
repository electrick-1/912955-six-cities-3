import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      count={Settings.COUNT}
      offers={offers}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
