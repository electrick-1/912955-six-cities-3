import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import ReviewsForm from './reviews-form.jsx';

const mockStore = configureStore([]);

it(`Render ReviewsForm`, () => {

  const store = mockStore({
    activeOffer: {
      id: 23
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
