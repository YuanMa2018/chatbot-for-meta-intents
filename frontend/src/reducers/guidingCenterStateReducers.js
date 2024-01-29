import { GUIDING_CENTER_STATE_NEW_ONE, GUIDING_CENTER_STATE_RESET } from "../constants/guidingCenterStateConstants";

export const guidingCenterStateReducer = (state = { guidingCenterState: [] }, action) => {
    switch (action.type) {
        case GUIDING_CENTER_STATE_NEW_ONE:
            // one_state = {"brand":""}
            const one_state = action.payload;
            return {
                ...state,
                guidingCenterState: [...state.guidingCenterState, one_state]
            }


        case GUIDING_CENTER_STATE_RESET:
            return {
                ...state,
                guidingCenterState: []
            }
        default:
            return state
    }
}


