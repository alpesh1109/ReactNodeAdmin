import {  USER_DATA } from '../actions/types';

const initialState = {
    userdata: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case USER_DATA:
            return {
                ...state,
                userdata: action.payload
            };

        default:
            return state;
    }
}