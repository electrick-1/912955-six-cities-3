import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const Settings = {
  COUNT: 123,
  TITLES: [`One`, `Two`, `Three`, `Four`]
};

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      count={Settings.COUNT}
      titles={Settings.TITLES}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
