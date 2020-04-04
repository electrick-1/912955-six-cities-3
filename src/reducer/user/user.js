import {extend} from "../../utils";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  email: `EL`,
  isSignIn: false
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION_DATA: `AUTHORIZATION_DATA`,
  SIGN_IN: `SIGN_IN`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status
    };
  },
  authorizationData: (data) => {
    return {
      type: ActionType.AUTHORIZATION_DATA,
      payload: data
    };
  },
  signingIn: () => {
    return {
      type: ActionType.SIGN_IN,
      payload: null,
    };
  }
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((data) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.authorizationData(data));
        dispatch(ActionCreator.signingIn());
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password
    })
    .then((data) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.authorizationData(data));
      dispatch(ActionCreator.signingIn());
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload
      });
    case ActionType.AUTHORIZATION_DATA:
      return Object.assign({}, state, {
        email: action.payload.data.email
      });
    case ActionType.SIGN_IN:
      return extend(state, {
        isSignIn: true,
      });
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
