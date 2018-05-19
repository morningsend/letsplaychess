export const ActionTypes = {
    GET_USER: 'GET_USER',
    GET_USER_FINISHED: 'GET_USER_FINISHED',
    GET_USER_FAILED: 'GET_USER_FAILED',
}

export function getUser(userId) {
    return {
        type: ActionTypes.GET_USER,
        userId: userId,
    }
}

export function getUserFinished(user) {
    console.log('getuserFinished')
    console.log(user)
    return {
        type: ActionTypes.GET_USER_FINISHED,
        userId: user.id,
        user,
    }
}

export function getUserFailed(error) {
    return {
        type: ActionTypes.GET_USER_FAILED,
        errorMessage: error.message
    }
}
