import axios from "axios";
import { setAlert } from "./alert";
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKE } from "./types";

//get posts

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//add like

export const addLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`)
        dispatch({
            type: UPDATE_LIKE,
            payload: { postId, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//remove like

export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postId}`)
        dispatch({
            type: UPDATE_LIKE,
            payload: { postId, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//delete post

export const deletePost = (postId) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`)
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
        dispatch(setAlert('Post Removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//add post

export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`http://localhost:5000/api/posts`, formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


//get post

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//add comment

export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Add', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//remove comment

export const removeComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}