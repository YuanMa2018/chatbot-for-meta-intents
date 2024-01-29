import {
  PRODUCT_LSIT_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,

  TOP_PRODUCT_LSIT_REQUEST,
  TOP_PRODUCT_LIST_SUCCESS,
  TOP_PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LSIT_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, 
      products: action.payload.products, 
      page: action.payload.page,
      totalPages:action.payload.totalPages}
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailReducer = (state = { product: { numRatings: 10 } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, product: {} }
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createReviewReducer = (state={},action) =>{
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading:true
      }

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading:false,
        success:action.payload 
      }

    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading:false,
        error:action.payload 
      }

    case PRODUCT_CREATE_REVIEW_RESET:
      return {}

    default:
      return state
  }
}


export const topProductsReducer = (state={topProducts:[]}, action) => {
  switch (action.type) {
    case TOP_PRODUCT_LSIT_REQUEST:
      return {loading: true,topProducts:[]}
    case TOP_PRODUCT_LIST_SUCCESS:
      return{loading:false, topProducts:action.payload}
    case TOP_PRODUCT_LIST_FAIL:
      return{loading:false, error:action.payload}
    default:
      return state
  }
}



