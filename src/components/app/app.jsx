import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = ({count, title}) => {
  return (
    <Main count={count} title={title}/>
  );
};

App.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
