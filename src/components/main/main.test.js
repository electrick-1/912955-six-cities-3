import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const Settings = {
  COUNT: 123,
  TITLES: [`One`, `Two`, `Three`, `Four`]
};

it(`Render App`, () => {
  const tree = renderer
    .create(<Main
      count={Settings.COUNT}
      titles={Settings.TITLES}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
