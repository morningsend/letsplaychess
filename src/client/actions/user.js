export const ActionTypes = {
    GET_USER_PROFILE: 'GET_USER_PROFILE',
    GET_USER_PROFLE_FINISHED: 'GET_USER_PROFLE_FINISHED',
}

export function getUserProfile(userId) {
    return {
        type: ActionTypes.GET_USER_PROFILE,
        userId: userId,
    }
}

export function getUserProfileFinished(userId, profile) {
    return {
        type: ActionTypes.GET_USER_PROFLE_FINISHED,
        userId,
        profile
    }
}
