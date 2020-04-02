const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const parseOffer = (data) => {
  let offer = {};
  offer.city = data[`city`];
  offer.previewImage = data[`preview_image`];
  offer.images = data[`images`];
  offer.title = data[`title`];
  offer.isFavorite = data[`is_favorite`];
  offer.isPremium = data[`is_premium`];
  offer.rating = data[`rating`];
  offer.type = data[`type`];
  offer.bedrooms = data[`bedrooms`];
  offer.maxAdults = data[`max_adults`];
  offer.price = data[`price`];
  offer.goods = data[`goods`];
  offer.host = {};
  offer.host.avatarUrl = data[`host`][`avatar_url`];
  offer.host.isPro = data[`host`][`is_pro`];
  offer.host.name = data[`host`][`name`];
  offer.host.id = data[`host`][`id`];
  offer.description = data[`description`];
  offer.location = data[`location`];
  offer.id = data[`id`];

  return offer;
};

const parseReview = (data) => {
  let review = {};
  review.comment = data[`comment`];
  review.date = data[`date`];
  review.id = data[`id`];
  review.rating = data[`rating`];
  review.user = {};
  review.user.avatar = data[`user`][`avatar_url`];
  review.user.id = data[`user`][`id`];
  review.user.isPro = data[`user`][`is_pro`];
  review.user.name = data[`user`][`name`];

  return review;
};

export {extend, parseOffer, parseReview};
