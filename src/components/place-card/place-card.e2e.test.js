import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

const offer = {
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
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should title be pressed`, () => {
  const onTitleClick = jest.fn();
  const onMouseEnter = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        offer={offer}
        key={offer.id}
        cardClass={`cities`}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
      />
  );

  const title = placeCard.find(`h2.place-card__name`);

  title.props().onClick();

  placeCard.props().onMouseEnter();

  expect(onTitleClick.mock.calls.length).toBe(1);
  expect(onMouseEnter.mock.calls.length).toBe(1);
});
