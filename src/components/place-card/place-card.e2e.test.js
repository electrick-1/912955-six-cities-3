import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

const offer = {
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  isPremium: true,
  type: `Apartment`,
  photo: `img/apartment-01.jpg`
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
