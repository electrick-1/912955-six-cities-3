import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  COUNT: 312,
  TITLES: [`Beautiful &amp; luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`]
};

ReactDOM.render(
    <App
      count={Settings.COUNT}
      title={Settings.TITLES}
    />,
    document.querySelector(`#root`)
);
