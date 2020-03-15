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
  bookmark: false,
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
  ],
  cords: [52.3909553943508, 4.85309666406198],
  comments: [{
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: `2019-04-24`
  }]
}];

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          count={Settings.COUNT}
          offers={offers}
          activeOffer={offers[0]}
          cardClass={`cities`}
          onTitleClick={() => {}}
        />, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
