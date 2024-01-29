import axios from 'axios'
import { META_INTENTS_INFLUENCE_STATE_SUCCESS } from '../constants/metaIntentsInfluenceStateConstants';



export const updateMetaIntentsInfluenceStateAction = (new_data) => async (dispatch, getState) => {
    dispatch({
        type: META_INTENTS_INFLUENCE_STATE_SUCCESS,
        payload: new_data
    })
}



