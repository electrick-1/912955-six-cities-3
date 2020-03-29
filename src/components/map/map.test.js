import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

const sortedOffers = [{
  city: {
    location: {
      latitude: 52.3909553,
      longitude: 4.85309666,
      zoom: 8
    }
  }}
];

const activeOffer = {
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
  }
};

it(`Render Map`, () => {
  const tree = renderer
    .create(
        <Map
          sortedOffers={sortedOffers}
          activeOffer={activeOffer}
        />, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
