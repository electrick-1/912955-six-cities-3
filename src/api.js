import axios from "axios";

const Error = {
  UNAUTHORIZATION: 401,
  BAD_REQUEST: 400
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (responce) => {
    return responce;
  };

  const onFail = (err) => {
    const {responce} = err;

    if (responce.status === Error.UNAUTHORIZATION) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
