import { ActionTypes } from '../actions/match'

const INITIAL_STATE = {
    findingMatch: false,
    errorMessage: '',
    matchMakingTimeout: false,
    opponentId: '',
    matchId: '',
    userId: '',
    joinToken: '',
    myPlayerColour: '',
}

export function match(state = INITIAL_STATE, action) {
    let newState = state
    switch(action.type) {
        case ActionTypes.MATCH_NEW:
            newState = {
                ...INITIAL_STATE,
            }
            break
        case ActionTypes.MATCH_MAKING_START:
            newState = {
                ...state,
                findingMatch: true
            }
            break
        case ActionTypes.MATCH_FOUND:
            newState = {
                ...state,
                findingMatch: false,
                opponentId: action.userId === action.match.whitePlayerId ? action.match.blackPlayerId : action.userId,
                myPlayerColour: action.myPlayerColour,
                errorMessage: '',
                hasMatch: true,
                matchId: action.match.matchId,
                match: action.match,
                userId: action.userId,
                joinToken: action.match.joinToken,    
            }
            break
        case ActionTypes.MATCH_MAKING_TIMEOUT:
            newState = {
                ...state,
                findingMatch: false,
                opponentId: null,
            }
            break
        case ActionTypes.MATCH_ENDED:
            newState = {
                ...state,
                findingMatch: false,
            }
        case ActionTypes.MATCH_MAKING_REQUEST_ERROR:
            newState = {
                ...INITIAL_STATE,
                errorMessage: action.errorMessage,
                matchId: null,
                userId: state.userId,
                findingMatch: false,
            }
            break
        default:
            break
    }
    return newState
}