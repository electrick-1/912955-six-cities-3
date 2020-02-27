import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {offers} from "./mocks/offers.js";

const Settings = {
  COUNT: 312,
  TITLES: [`Beautiful &amp; luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`]
};

ReactDOM.render(
    <App
      count={Settings.COUNT}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
