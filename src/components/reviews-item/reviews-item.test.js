import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviews-item.jsx";

const offers = {
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: `2019-05-08T14:13:56.569Z`,
  id: 1,
  rating: 4,
  user: {
    avatarUrl: `img/avatar-max.jpg`,
    id: 4,
    isPro: false,
    name: `Max`
  }
};

it(`Render ReviewsItem`, () => {
  const tree = renderer
    .create(<ReviewsItem
      comment={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
