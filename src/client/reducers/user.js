import { ActionTypes } from '../actions/user'

export const INITIAL_STATE = {
    userId: '',
    profile: {},
    matches: {
        start: 0,
        offset: 0,
        data: []
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
                profile: action.user.profile,
                matches: action.user.matches
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
    return state
}