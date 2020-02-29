import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list.jsx";

const offers = [{
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  isPremium: true,
  type: `Apartment`,
  photo: `img/apartment-01.jpg`
}];

it(`Render PlaceCard`, () => {
  const tree = renderer
    .create(<PlacesList
      offers={offers}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
