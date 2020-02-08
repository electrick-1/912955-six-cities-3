import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  COUNT: 312
};

ReactDOM.render(
    <App
      count={Settings.COUNT}
    />,
    document.querySelector(`#root`)
);
