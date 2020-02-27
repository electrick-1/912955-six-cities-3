import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {count, offers} = this.props;
    return (
      <Main
        count={count}
        offers={offers}
        onTitleClick={() => {}}
      />
    );
  }
}

App.propTypes = {
  count: PropTypes.number.isRequired,
  offers: PropTypes.array,
};

export default App;
