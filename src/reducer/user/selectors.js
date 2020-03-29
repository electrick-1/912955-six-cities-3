import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

const getEmail = (state) => {
  return state[NAME_SPACE].email;
};

export {getAuthorizationStatus, getEmail};
