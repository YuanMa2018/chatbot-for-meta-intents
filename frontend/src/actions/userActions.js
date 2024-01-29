import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL

} from "../constants/userConstant";

import axios from 'axios'


// No need anymore
// dispatch({
//     type: USER_LOGIN_FAIL,
//     payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.response
// })

// const config = {
//     headers: {
//         'Content-type': 'application/json',
//         Authorization: `Bearer: ${userInfo.token}`
//     }
// }

export const userLoginAction = (email, password) => async (dispatch) => {

    try {

        dispatch(
            {
                type: USER_LOGIN_REQUEST,
            }
        )

        const { data } = await axios.post(
            '/api/users/login',
            {
                email: email,
                password, password,
            })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        })
    }


}


export const userLogout = () => async (dispatch) => {
    dispatch(
        { type: USER_LOGOUT, }
    )
    localStorage.removeItem('userInfo')
    document.location.href = "/login"
}


export const register = (email, name, password) => async (dispatch) => {

    try {
        dispatch(
            {
                type: USER_REGISTER_REQUEST
            }
        )

        const response = await axios.post(
            '/api/users/register',
            {
                email,
                name,
                password,

            })

        const { data } = response
        dispatch(
            {
                type: USER_REGISTER_SUCCESS,
                payload: data
            }
        )

        dispatch(
            {
                type: USER_LOGIN_SUCCESS,
                payload: data
            }
        )

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error
        })
    }

}



export const getUserDetail = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })

        const { data } = await axios.get(
            '/api/users/profile')

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error

        })
    }

}


export const updateUserDetailAction = (email, name, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
            loading: true
        })

        
        const { data } = await axios.put(
            '/api/users/profile',
            { email, name, password }
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

        dispatch(
            {
                type: USER_LOGIN_SUCCESS,
                payload: data
            }
        )

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            error: error
        })
    }

}


