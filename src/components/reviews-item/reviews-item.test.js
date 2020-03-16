import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviews-item.jsx";

const offers = {
  comment: {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: `2019-04-24`
  }
};

it(`Render ReviewsItem`, () => {
  const tree = renderer
    .create(<ReviewsItem
      comment={offers.comment}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
