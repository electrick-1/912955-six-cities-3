import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import CitiesList from "./cities-list.jsx";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

it(`Render CitiesList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      currentCity: `Amsterdam`
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CitiesList />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
