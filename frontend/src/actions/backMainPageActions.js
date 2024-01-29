import {
    BACK_MAIN_PAGE_REQUEST,
    BACK_MAIN_PAGE_SUCCESS,
    BACK_MAIN_PAGE_FAIL,
    BACK_MAIN_PAGE_RESET
  } from "../constants/backMainPageConstants";


export const setBackMainPageAction = (go_back) => async (dispatch, getState) => {

    const { is_in_main_page } = getState().inMainPageState

    if(!is_in_main_page){
        dispatch({
            type: BACK_MAIN_PAGE_SUCCESS,
            payload: go_back
        })
    }
}
