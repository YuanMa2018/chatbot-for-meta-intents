import {
    CONVERSATION_STYLE_REQUEST,
    CONVERSATION_STYLE_SUCCESS,
    CONVERSATION_STYLE_FAIL,
    CONVERSATION_STYLE_RESET
  } from "../constants/conversationStyleConstants.js";
  
  export const conversationStyleReducer = (state = {conversation_style:1 }, action) => {
    switch (action.type) {
      case CONVERSATION_STYLE_REQUEST:
        return { ...state, loading: true}
      case CONVERSATION_STYLE_SUCCESS:
        return {
          loading: false,
          conversation_style: action.payload
        }
      case CONVERSATION_STYLE_FAIL:
        return { ...state, loading: false, error: action.payload }

      default:
        return state
    }
  }
  