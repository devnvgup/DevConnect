import {
    CLEAR_PROFILE, DELETE_EDU, DELETE_EXP, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE
} from "../actions/types"

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case DELETE_EXP: {
            let experience = state.profile.experience.filter((item) => {
                return item._id !== payload
            })
            return {
                ...state,
                profile: { ...state.profile, experience }
            }
        }
        case DELETE_EDU: {
            let education = state.profile.education.filter((item) => {
                return item._id !== payload
            })
            return {
                ...state,
                profile: { ...state.profile, education }
            }
        }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }

        default:
            return state
    }
}