import {
    FIRST_RANK_FEATURE_REQUEST,
    FIRST_RANK_FEATURE_SUCCESS,
    FIRST_RANK_FEATURE_FAIL,
    FIRST_RANK_FEATURE_RESET
  } from "../constants/firstRankFeatureConstants.js";
  
  export const firstRankFeatureReducer = (state = { }, action) => {
    switch (action.type) {
      case FIRST_RANK_FEATURE_REQUEST:
        return { ...state, loading: true}
      case FIRST_RANK_FEATURE_SUCCESS:
        return {
          loading: false,
          first_rank_feature: action.payload
        }
      case FIRST_RANK_FEATURE_FAIL:
        return { ...state, loading: false, error: action.payload }
      case FIRST_RANK_FEATURE_RESET:
        return { loading: false }
      default:
        return state
    }
  }
  