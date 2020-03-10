import React from "react";
import renderer from "react-test-renderer";
import Property from "./property.jsx";

const offer = {
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  isPremium: true,
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
  ]
};

it(`Render Property`, () => {
  const tree = renderer
    .create(<Property
      offer={offer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
