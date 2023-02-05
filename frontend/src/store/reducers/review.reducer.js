import { reviewService } from "../../services/review.service"

const initialState = {
  reviews: [],
  filterBy: reviewService.getDefaultFilter(),
}

export function reviewReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_REVIEWS':
      return { ...state, reviews: action.reviews }
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.review] }
    case 'REMOVE_REVIEW':
      return { ...state, reviews: state.reviews.filter(review => review._id !== action.reviewId) }
    case 'UPDATE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === action.review._id ? action.review : review
        )}
    default:
      return state
  }
}
