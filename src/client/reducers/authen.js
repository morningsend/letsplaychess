import { ActionTypes, userLogin, userLoginFailed, userLoginSucceeded } from '../actions/authen'

const initialState = {
    access_token: '',
    loggedIn: false,
    expireTime: -1,
    failed: false,
}

export function authen(state = initialState, action) {
    const newState = state
    switch(action.type) {
        case ActionTypes.USER_LOGIN:
            break
        case ActionTypes.USER_LOGIN_FAILED:
            break
        case ActionTypes.USER_LOGIN_SUCCEEDED:
            break
        default:
            break
    }

    return newState
}