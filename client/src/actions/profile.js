import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

// Get current users profiles

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Create or update Profile

export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    console.log(navigate)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('http://localhost:5000/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'))

        if (!edit) {
            navigate('/dashboard')
        }
    } catch (error) {
        const errros = await error.response.data.errors
        if (errros) {
            errros.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}