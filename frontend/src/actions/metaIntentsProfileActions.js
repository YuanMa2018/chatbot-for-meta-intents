import axios from 'axios'
import { META_INTENTS_PROFILE_SUCCESS } from '../constants/metaIntentsProfileConstants';



export const updateMetaIntentsProfileAction = (new_data) => async (dispatch, getState) => {
    dispatch({
        type: META_INTENTS_PROFILE_SUCCESS,
        payload: new_data
    })
}



