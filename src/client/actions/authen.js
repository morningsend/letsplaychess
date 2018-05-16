export const ActionTypes = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    USER_LOGIN_SUCCEEDED: 'USER_LOGIN_SUCCEEDED',
}

export function userLogin(username) {
    return {
        type: ActionTypes.USER_LOGIN,
        username,
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

export function userLoginSucceeded(username, userId, accessToken, expiresIn) {
    return {
        type: ActionTypes.USER_LOGIN_SUCCEEDED,
        username,
        userId,
        accessToken,
        expiresIn
    }
}
