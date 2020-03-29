export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const parseOffer = (data) => {
  let offer = {};
  offer.bedrooms = data[`bedrooms`];
  offer.city = data[`city`];
  offer.description = data[`description`];
  offer.goods = data[`goods`];
  offer.host = {};
  offer.host.avatar = data[`host`][`avatar_url`];
  offer.host.id = data[`host`][`id`];
  offer.host.isPro = data[`host`][`is_pro`];
  offer.host.name = data[`host`][`name`];
  offer.id = data[`id`];
  offer.images = data[`images`];
  offer.isFavorite = data[`is_favorite`];
  offer.isPremium = data[`is_premium`];
  offer.location = data[`location`];
  offer.maxAdults = data[`max_adults`];
  offer.previewImage = data[`preview_image`];
  offer.price = data[`price`];
  offer.rating = data[`rating`];
  offer.title = data[`title`];
  offer.type = data[`type`];

  return offer;
};
