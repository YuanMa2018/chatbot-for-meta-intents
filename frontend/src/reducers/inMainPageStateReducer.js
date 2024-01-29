import {
  IN_MAIN_PAGE_REQUEST,
  IN_MAIN_PAGE_SUCCESS,
  IN_MAIN_PAGE_FAIL,
  IN_MAIN_PAGE_RESET
} from "../constants/inMainPageConstants";

export const inMainPageReducer = (state = {
  is_in_main_page: true,
  is_in_comparison_page: false
}, action) => {
  switch (action.type) {
    case IN_MAIN_PAGE_REQUEST:
      return { ...state, loading: true }
    case IN_MAIN_PAGE_SUCCESS:
      return {
        loading: false,
        ...state,
        ...(action.payload)
      }
    case IN_MAIN_PAGE_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
