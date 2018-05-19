import { ActionTypes } from '../actions/user'

export const INITIAL_STATE = {
    userId: '',
    user: {
        userId: '',
        username: '',
        profile: '',
        summary: {
            win: 0,
            loss: 0,
            draw: 0,
        },

    },
    inProgress: false
}

export function user(state = INITIAL_STATE, action) {
    let newState = state
    switch(action.type) {
        case ActionTypes.GET_USER:
            newState = {
                ...state,
                inProgress: true
            }
            break

        case ActionTypes.GET_USER_FINISHED:
            newState = {
                ...state,
                inProgress: false,
                userId: action.user.id,
                user: action.user,
            }
            break
        case ActionTypes.GET_USER_FAILED:
            newState = {
                ...INITIAL_STATE,
            }
            break
        default:
            break
    }
    return newState
}