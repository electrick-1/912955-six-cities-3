import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should title be pressed`, () => {
  const onTitleClick = jest.fn();

  const main = shallow(
      <Main
        count={Settings.COUNT}
        offers={offers}
        onTitleClick={() => {}}
      />
  );

  const titles = main.find(`h2.place-card__name`);

  titles.forEach((title) => {
    title.props().onClick();
  });

  expect(onTitleClick.mock.calls.length).toBe(0);
});
