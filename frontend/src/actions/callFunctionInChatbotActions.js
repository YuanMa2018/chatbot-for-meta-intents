import axios from 'axios'
import { CALL_FUNCTION_IN_CHATBOT_SUCCESS } from '../constants/callFunctionInChatbotConstants';



export const updateCallFunctionInChatbotAction = (new_data) => async (dispatch, getState) => {
    dispatch({
        type: CALL_FUNCTION_IN_CHATBOT_SUCCESS,
        payload: new_data
    })
}



