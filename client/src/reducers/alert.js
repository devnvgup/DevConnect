import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state
    }
}