import { GET_POSTS, UPDATE_LIKE, POST_ERROR, DELETE_POST, ADD_POST } from "../actions/types"

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_POSTS: {
            return {
                ...state,
                posts: payload,
                loading: false
            }
        }
        case POST_ERROR: {
            return {
                ...state,
                error: payload,
                loading: false
            }
        }
        case UPDATE_LIKE: {
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post)
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false,
            }
        }
        case ADD_POST: {
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
            }
        }
        default:
            return state
    }
}