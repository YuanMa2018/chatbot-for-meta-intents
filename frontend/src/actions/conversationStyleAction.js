import { CONVERSATION_STYLE_SUCCESS } from "../constants/conversationStyleConstants";

export const update_conversation_style = (new_style) => (dispatch) => {

    dispatch({
        type: CONVERSATION_STYLE_SUCCESS,
        payload: new_style
    })
}

