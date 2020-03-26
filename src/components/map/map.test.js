import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

const sortedOffers = [{
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8
  }}
];

it(`Render Map`, () => {
  const tree = renderer
    .create(
        <Map
          sortedOffers={sortedOffers}
          activeOffer={sortedOffers[0]}
        />, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
