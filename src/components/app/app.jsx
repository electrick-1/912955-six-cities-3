import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const titleClickHandler = () => {};

const App = ({count, titles}) => {
  return (
    <Main
      count={count}
      titles={titles}
      onTitleClick={titleClickHandler}
    />
  );
};

App.propTypes = {
  count: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
