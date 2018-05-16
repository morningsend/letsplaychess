import { ActionTypes, userLogin, userLoginFailed, userLoginSucceeded } from '../actions/authen'

const initialState = {
    accessToken: '',
    loggedIn: false,
    expireTime: -1,
    failed: false,
    username: '',
    userId: '',
    message: '',
}

export function authen(state = initialState, action) {
    const newState = state
    switch(action.type) {
        case ActionTypes.USER_LOGIN:
            break
        case ActionTypes.USER_LOGIN_FAILED:
            newState = {
                ...initialState,
                failed: true,
            }
            break
        case ActionTypes.USER_LOGIN_SUCCEEDED:
            newState = {
                ...state,
                username: action.username,
                accessToken: action.token,
                expiresIn: action.expiresIn,
                userId: action.userId,
                message: action.message,
                loggedIn: true,
                failed: false,
            }
            break
        default:
            break
    }

    return newState
}