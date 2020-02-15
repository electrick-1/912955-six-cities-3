import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const Settings = {
  COUNT: 123,
  TITLES: [`One`, `Two`, `Three`, `Four`]
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should title be pressed`, () => {
  const onTitleClick = jest.fn();

  const main = shallow(
      <Main
        count={Settings.COUNT}
        titles={Settings.TITLES}
        onTitleClick={onTitleClick}
      />
  );

  const titles = main.find(`h2.place-card__name`);

  titles.forEach((title) => {
    title.props().onClick();
  });

  expect(onTitleClick.mock.calls.length).toBe();
});
