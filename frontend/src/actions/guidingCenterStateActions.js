import { GUIDING_CENTER_STATE_NEW_ONE, GUIDING_CENTER_STATE_RESET } from "../constants/guidingCenterStateConstants";

export const add_new_one_state = (one_state) => async (dispatch, getState) => {

    dispatch({
        type: GUIDING_CENTER_STATE_NEW_ONE,
        payload: one_state
    })
}

export const resetGuidingCenterState = () => (dispatch) => {
    dispatch(
        { type: GUIDING_CENTER_STATE_RESET }
    )
}

