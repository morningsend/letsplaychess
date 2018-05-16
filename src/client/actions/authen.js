export const ActionTypes = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    USER_LOGIN_SUCCEEDED: 'USER_LOGIN_SUCCEEDED',
}

export function userLogin(username, password) {
    return {
        type: ActionTypes.USER_LOGIN,
        username,
        password,
    }
}

export function userLoginFailed(username, userId, message) {
    return {
        type: ActionTypes.USER_LOGIN_FAILED,
        username,
        userId,
        message,
    }
}

export function userLoginSucceeded(username, userId) {
    return {
        type: ActionTypes.USER_LOGIN_SUCCEEDED,
        username,
        userId,
    }
}
