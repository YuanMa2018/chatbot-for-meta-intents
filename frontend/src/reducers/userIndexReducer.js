import {
    USER_INDEX_REQUEST,
    USER_INDEX_SUCCESS,
    USER_INDEX_FAIL,
    USER_INDEX_RESET,

    USER_RG01_REQUEST,
    USER_RG01_SUCCESS,
    USER_RG01_FAIL,
    USER_RG01_RESET
  } from "../constants/userIndexConstants.js";
  

  export const userIndexReducer = (state = {userIndex:-1}, action) => {
    switch (action.type) {
      case USER_INDEX_REQUEST:
        return { ...state, loading: true}
      case USER_INDEX_SUCCESS:
        return {
          loading: false,
          userIndex: action.payload
        }
      case USER_INDEX_FAIL:
        return { ...state, loading: false, error: action.payload }

      default:
        return state
    }
  }
  
  
  export const userRG01Reducer = (state = {userRG01:-1}, action) => {
    switch (action.type) {
      case USER_RG01_REQUEST:
        return { ...state, loading: true}
      case USER_RG01_SUCCESS:
        return {
          loading: false,
          userRG01: action.payload
        }
      case USER_RG01_FAIL:
        return { ...state, loading: false, error: action.payload }

      default:
        return state
    }
  }
  