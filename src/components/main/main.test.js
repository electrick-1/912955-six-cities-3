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
  photo: `img/apartment-01.jpg`,
  cords: [52.3909553943508, 4.85309666406198]
}];

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          count={Settings.COUNT}
          offers={offers}
          onTitleClick={() => {}}
        />, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
