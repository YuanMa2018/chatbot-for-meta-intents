import {
    INTERACTION_TRACK_REQUEST,
    INTERACTION_TRACK_SUCCESS,
    INTERACTION_TRACK_FAIL,
    INTERACTION_TRACK_RESET
  } from "../constants/interactionTrackConstants.js";
  
// var data=[
//     {user_random_id: 125,components_name: 'Test',components_context: 'Test',components_info: 'Test',intents: 'Test',intents_info: 'Test', local_timestamps: 123},
//     {user_random_id: 124,components_name: 'Test',components_context: 'Test',components_info: 'Test',intents: 'Test',intents_info: 'Test', local_timestamps: 123},
    
// ];

  export const interactionTrackReducer = (state = {interactionTrackState:[]}, action) => {
    switch (action.type) {
      case INTERACTION_TRACK_REQUEST:
        return { ...state, loading: true}
      case INTERACTION_TRACK_SUCCESS:
        return {
          loading: false,
          interactionTrackState: action.payload
        }
      case INTERACTION_TRACK_FAIL:
        return { ...state, loading: false, error: action.payload }

      default:
        return state
    }
  }
  