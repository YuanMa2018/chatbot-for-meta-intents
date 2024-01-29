import {
    BACK_MAIN_PAGE_REQUEST,
    BACK_MAIN_PAGE_SUCCESS,
    BACK_MAIN_PAGE_FAIL,
    BACK_MAIN_PAGE_RESET
  } from "../constants/backMainPageConstants";
  
  export const backMainPageReducer = (state = {gp_back:false}, action) => {
    switch (action.type) {
      case BACK_MAIN_PAGE_REQUEST:
        return { ...state, loading: true}
      case BACK_MAIN_PAGE_SUCCESS:
        return {
          loading: false,
          gp_back: action.payload
        }
      case BACK_MAIN_PAGE_FAIL:
        return { ...state, loading: false, error: action.payload }

      default:
        return state
    }
  }
  