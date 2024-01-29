import {
  NEW_CRITIQUED_PRODUCT_REQUEST,
  NEW_CRITIQUED_PRODUCT_SUCCESS,
  NEW_CRITIQUED_PRODUCT_FAIL,
  NEW_CRITIQUED_PRODUCT_RESET
} from "../constants/critiquingConstants.js";

export const critiquedProductReducer = (state = { critiquedProduct: {} }, action) => {
  switch (action.type) {
    case NEW_CRITIQUED_PRODUCT_REQUEST:
      return { ...state, loading: true}
    case NEW_CRITIQUED_PRODUCT_SUCCESS:
      return {
        loading: false,
        critiquedProduct: action.payload
      }
    case NEW_CRITIQUED_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
