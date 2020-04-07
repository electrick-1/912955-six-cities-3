const CardClass = {
  CITIES: `cities`,
  NEAR_PLACES: `near-places`,
  FAVORITES: `favorites`
};

const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  PROPERTY: `/offer`,
};

const SortTypes = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  RATED: `Top rated first`
};

const Cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

const Months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const ReviewLength = {
  MIN: 50,
  MAX: 300,
};

export {CardClass, AppRoute, SortTypes, Cities, Months, ReviewLength};
