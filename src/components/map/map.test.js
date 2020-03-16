import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

const offers = [
  {
    cords: [52.3909553943508, 4.85309666406198]
  }, {
    cords: [52.369553943508, 4.85309666406198]
  }, {
    cords: [52.3909553943508, 4.929309666406198]
  }, {
    cords: [52.3809553943508, 4.939309666406198]
  }
];

it(`Render Map`, () => {
  const tree = renderer
    .create(
        <Map
          offers={offers}
          activeOffer={offers[0]}
        />, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
