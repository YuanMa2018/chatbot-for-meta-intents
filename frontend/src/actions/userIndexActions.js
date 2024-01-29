import { USER_INDEX_SUCCESS } from '../constants/userIndexConstants';
import { USER_RG01_SUCCESS } from '../constants/userIndexConstants';
import { CONVERSATION_STYLE_SUCCESS } from '../constants/conversationStyleConstants';
import { update_conversation_style } from './conversationStyleAction';

export const setUserIndexAction = (new_data) => async (dispatch, getState) => {
    const { userIndex } = getState().userIndexState
    if (userIndex === -1 && new_data !== -1) {
        dispatch({
            type: USER_INDEX_SUCCESS,
            payload: new_data
        })
    }
}



export const setUserRG01Action = (new_data) => async (dispatch, getState) => {
    const { userRG01 } = getState().userRG01State
    if (userRG01 === -1 && new_data !== -1) {
        dispatch(update_conversation_style(new_data))
        dispatch({
            type: USER_RG01_SUCCESS,
            payload: new_data
        })
    }
}


