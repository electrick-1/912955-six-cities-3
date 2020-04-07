import {extend, parseOffer, parseReview} from "../../utils.js";
import {SortTypes} from "../../const.js";

const ReviewPostingStatus = {
  POSTED: `POSTED`,
  ERROR: `ERROR`,
};

const initialState = {
  currentCity: ``,
  currentSortType: `Popular`,
  activeOffer: {},
  sortedOffers: [],
  offers: [],
  reviews: [],
  nearbyOffers: [],
  favoriteOffers: [],
  reviewValue: ``,
  ratingValue: ``,
  isBlockedForm: false,
  postReview: null,
  isOffersLoading: true,
  isReviewsLoading: true,
  isNearbyOffersLoading: true,
  isFavoriteOffersLoading: true
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFER: `CHANGE_OFFER`,
  HOVER_OFFER: `HOVER_OFFER`,
  LEAVE_OFFER: `LEAVE_OFFER`,
  CHANGE_SORT: `CHANGE_SORT`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  BLOCK_FORM: `BLOCK_FORM`,
  POST_REVIEW: `POST_REVIEW`,
  ADD_TO_FAVORITE: `ADD_TO_FAVORITE`,
  CHANGE_RATING: `CHANGE_RATING`,
  CHANGE_COMMENT: `CHANGE_COMMENT`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),

  changeOffer: (offer) => ({
    type: ActionType.CHANGE_OFFER,
    payload: offer
  }),

  hoverOffer: (offer) => ({
    type: ActionType.HOVER_OFFER,
    payload: offer
  }),

  leaveOffer: (offer) => ({
    type: ActionType.LEAVE_OFFER,
    payload: offer
  }),

  changeSortType: ({type, newOffers}) => ({
    type: ActionType.CHANGE_SORT,
    payload: {type, newOffers}
  }),

  changeRating: (rating) => ({
    type: ActionType.CHANGE_RATING,
    payload: rating
  }),

  changeComment: (comment) => ({
    type: ActionType.CHANGE_COMMENT,
    payload: comment
  }),

  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers
    };
  },

  loadNearbyOffers: (nearbyOffers) => {
    return {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: nearbyOffers
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews
    };
  },

  loadFavoriteOffers: (favoriteOffers) => {
    return {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: favoriteOffers
    };
  },

  blockForm: (block) => {
    return {
      type: ActionType.BLOCK_FORM,
      payload: block
    };
  },

  postReviewSuccessfull: (success) => ({
    type: ActionType.POST_REVIEW,
    payload: success,
  }),

  addToFavorite: (offer) => {
    return {
      type: ActionType.ADD_TO_FAVORITE,
      payload: offer,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((responce) => {
        dispatch(ActionCreator.loadOffers(responce.data));
      });
  },

  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
            .then((response) => {
              dispatch(ActionCreator.loadNearbyOffers(response.data));
            });
  },

  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
            .then((response) => {
              dispatch(ActionCreator.loadReviews(response.data));
            });
  },

  loadFavoriteOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
            .then((response) => {
              dispatch(ActionCreator.loadFavoriteOffers(response.data));
            });
  },

  postReview: (id, data) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      comment: data.comment,
      rating: data.rating,
    })
          .then((response) => {
            dispatch(ActionCreator.postReviewSuccessfull(ReviewPostingStatus.POSTED));
            dispatch(ActionCreator.loadReviews(response.data));
            dispatch(ActionCreator.blockForm(false));
          })
        .catch((err) => {
          dispatch(ActionCreator.postReviewSuccessfull(ReviewPostingStatus.ERROR));
          dispatch(ActionCreator.blockForm(false));
          throw err;
        });
  },

  addToFavorite: (offer) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offer.id}/${+!offer.isFavorite}`, {})
            .then((response) => {
              dispatch(ActionCreator.addToFavorite(response.data));
            });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TO_FAVORITE:
      const parsedOffer = parseOffer(action.payload);
      const $offers = [...state.offers];
      const index = $offers.findIndex((ind) => ind.id === parsedOffer.id);
      $offers.splice(index, 1, parsedOffer);
      const si = state.sortedOffers.findIndex((ind) => ind.id === parsedOffer.id);
      const $sortedOffers = [...state.sortedOffers];
      $sortedOffers.splice(si, 1, parsedOffer);
      const $activeOffer = $offers[index];
      const $favoriteOffers = $offers.filter((offer) => offer.isFavorite === true);
      return extend(state, {
        offers: $offers,
        sortedOffers: $sortedOffers,
        activeOffer: $activeOffer,
        favoriteOffers: $favoriteOffers
      });
    case ActionType.LOAD_NEARBY_OFFERS:
      let parsedNearbyOffers = action.payload.map((offer) => parseOffer(offer));
      return extend(state, {
        nearbyOffers: parsedNearbyOffers,
        isNearbyOffersLoading: false,
        activeOffer: {}
      });
    case ActionType.LOAD_FAVORITE_OFFERS:
      let parsedFavoriteOffers = action.payload.map((offer) => parseOffer(offer));
      return extend(state, {
        favoriteOffers: parsedFavoriteOffers,
        isFavoriteOffersLoading: false
      });
    case ActionType.LOAD_REVIEWS:
      let parsedReviews = action.payload.map((review) => parseReview(review)).reverse().slice(0, 10);
      return extend(state, {
        reviews: parsedReviews,
        isReviewsLoading: false
      });
    case ActionType.CHANGE_RATING:
      let rating = action.payload;
      return (
        extend(state, {
          ratingValue: rating
        })
      );
    case ActionType.CHANGE_COMMENT:
      let comment = action.payload;
      return (
        extend(state, {
          reviewValue: comment
        })
      );
    case ActionType.LOAD_OFFERS:
      let parsedOffers = action.payload.map((offer) => parseOffer(offer));
      let parseCity = parsedOffers[0].city.name;
      return extend(state, {
        offers: parsedOffers,
        currentCity: parseCity,
        sortedOffers: parsedOffers.filter((offer) => offer.city.name === parseCity),
        isOffersLoading: false
      });
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload,
        sortedOffers: state.offers.filter((offer) => offer.city.name === action.payload),
        currentSortType: SortTypes.POPULAR
      });
    case ActionType.CHANGE_OFFER:
      return extend(state, {
        activeOffer: action.payload
      });
    case ActionType.HOVER_OFFER:
      return extend(state, {
        activeOffer: action.payload
      });
    case ActionType.LEAVE_OFFER:
      return extend(state, {
        activeOffer: {}
      });
    case ActionType.CHANGE_SORT:
      return extend(state, {
        currentSortType: action.payload.type,
        sortedOffers: action.payload.newOffers
      });
    case ActionType.BLOCK_FORM:
      return extend(state, {
        isBlockedForm: action.payload,
      });
    case ActionType.POST_REVIEW:
      return extend(state, {
        postReview: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
