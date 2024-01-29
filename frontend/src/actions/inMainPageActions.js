import {
    IN_MAIN_PAGE_REQUEST,
    IN_MAIN_PAGE_SUCCESS,
    IN_MAIN_PAGE_FAIL,
    IN_MAIN_PAGE_RESET
} from "../constants/inMainPageConstants";


export const setInMainPageAction = (is_in_main_page) => async (dispatch, getState) => {
    dispatch({
        type: IN_MAIN_PAGE_SUCCESS,
        payload: { is_in_main_page: is_in_main_page }
    })
}



export const setInComparisonPageAction = (is_in_comparison_page) => async (dispatch, getState) => {
    dispatch({
        type: IN_MAIN_PAGE_SUCCESS,
        payload: { is_in_comparison_page: is_in_comparison_page }
    })

}

