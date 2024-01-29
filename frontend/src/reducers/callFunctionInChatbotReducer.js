import {
  CALL_FUNCTION_IN_CHATBOT_REQUEST,
  CALL_FUNCTION_IN_CHATBOT_SUCCESS,
  CALL_FUNCTION_IN_CHATBOT_FAIL,
  CALL_FUNCTION_IN_CHATBOT_RESET
} from "../constants/callFunctionInChatbotConstants.js";


export const callFunctionInChatbotReducer = (state = {
  //new intruction for chatbot
  chatbot_function__remind_comparison: 0,
  chatbot_function__latest_checking_products_list: [],
  
}, action) => {
  switch (action.type) {
    case CALL_FUNCTION_IN_CHATBOT_REQUEST:
      return { ...state, loading: true }
    case CALL_FUNCTION_IN_CHATBOT_SUCCESS:
      return {
        loading: false,
        ...state,
        ...(action.payload)
      }
    case CALL_FUNCTION_IN_CHATBOT_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}



