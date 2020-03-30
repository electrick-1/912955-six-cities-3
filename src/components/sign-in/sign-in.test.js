import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "./sign-in.jsx";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

it(`AuthScreen component render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      email: `el@mail.ru`
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <SignIn />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
