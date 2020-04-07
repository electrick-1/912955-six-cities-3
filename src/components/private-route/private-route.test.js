import React from "react";
import PrivateRoute from "./private-route.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";

configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};

it(`should redirect if user is not authorized`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }
  });

  const tree = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            exact={true}
            path={AppRoute.FAVORITES}
            render={() => MockComponent}
          />
        </MemoryRouter>
      </Provider>
  );
  const history = tree.find(`Router`).prop(`history`);
  expect(history.location.pathname).toBe(AppRoute.LOGIN);
});

it(`should redirect if user authorized`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    }
  });

  const tree = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.AUTH}
            exact={true}
            path={AppRoute.FAVORITES}
            render={() => <MockComponent/>}
          />
        </MemoryRouter>
      </Provider>
  );

  expect(tree.exists(MockComponent)).toBe(true);
});
