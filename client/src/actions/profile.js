import axios from "axios";
import { setAlert } from "./alert";
import {
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    DELETE_EDU,
    DELETE_EXP,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE
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

// Get all users profiles

export const getProfiles= () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('http://localhost:5000/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Get  profiles by id

export const getProfileById = (userId) => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/${userId}`)
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

// Get  Git hub repo

export const getGitHubRepos = (userName) => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/github/${userName}`)
        dispatch({
            type: GET_REPOS,
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
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

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

// Add exp

export const addExperience = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('http://localhost:5000/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'))
        navigate('/dashboard')
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

// Add edu

export const addEducation = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('http://localhost:5000/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'))
        navigate('/dashboard')
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

// Delete Exp

export const deleteExperience = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)
        dispatch({
            type: DELETE_EXP,
            payload: id
        })
        dispatch(setAlert('Delete Success', 'success'))
    } catch (error) {
        const errros = await error?.response?.data?.errors
        if (errros) {
            errros.forEach(error => dispatch(setAlert(error?.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error?.response?.statusText, status: error?.response?.status }
        })
    }
}

// Delete Edu

export const deleteEducation = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/profile/education/${id}`)
        dispatch({
            type: DELETE_EDU,
            payload: id
        })
        dispatch(setAlert('Delete Success', 'success'))
    } catch (error) {
        const errros = await error?.response?.data?.errors
        if (errros) {
            errros.forEach(error => dispatch(setAlert(error?.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error?.response?.statusText, status: error?.response?.status }
        })
    }
}

// Delete Account and Profile

export const deleteAccount = () => async dispatch => {
    if (window.confirm("Are you sure> This can Not ne undone")) {
        try {
            await axios.delete(`http://localhost:5000/api/profile`)
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: DELETE_ACCOUNT,
            })
            dispatch(setAlert(' Account Deleted', 'success'))
        } catch (error) {
            const errros = await error?.response?.data?.errors
            if (errros) {
                errros.forEach(error => dispatch(setAlert(error?.msg, 'danger')))
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error?.response?.statusText, status: error?.response?.status }
            })
        }
    }
}