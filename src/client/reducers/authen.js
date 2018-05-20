import { ActionTypes, userLogin, userLoginFailed, userLoginSucceeded } from '../actions/authen'
import { INITIAL_STATE } from './user';

const initialState = {
    accessToken: '',
    loggedIn: false,
    expiresIn: -1,
    failed: false,
    username: '',
    userId: '',
    message: '',
}

export function authen(state = initialState, action) {
    let newState = state
    switch(action.type) {
        case ActionTypes.USER_LOGIN:
            newState = {
                username: action.username,
            }
            break
        case ActionTypes.USER_LOGIN_FAILED:
            newState = {
                ...initialState,
                username: action.username,
                message: action.message,
                failed: true,
            }
            break
        case ActionTypes.USER_LOGIN_SUCCEEDED:
            newState = {
                ...state,
                username: action.username,
                accessToken: action.accessToken,
                expiresIn: action.expiresIn,
                userId: action.userId,
                message: action.message,
                loggedIn: true,
                failed: false,
            }
            break
        case ActionTypes.USER_LOGOUT:
            newState = {
                ...INITIAL_STATE,
            }
        default:
            break
    }

    return newState
}