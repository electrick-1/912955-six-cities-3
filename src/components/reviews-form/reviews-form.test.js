import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import ReviewsForm from './reviews-form.jsx';
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

it(`Render ReviewsForm`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      activeOffer: {
        id: 23
      }
    }
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <ReviewsForm />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
