import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const offer = {
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  isPremium: true,
  type: `Apartment`,
  photo: `img/apartment-01.jpg`
};

it(`Render PlaceCard`, () => {
  const tree = renderer
    .create(<PlaceCard
      offer={offer}
      key={offer.id}
      onTitleClick={() => {}}
      onMouseEnter={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
