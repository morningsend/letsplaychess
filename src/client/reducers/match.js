import { ActionTypes } from '../actions/match'

const initialState = {
    findingMatch: false,
    errorMessage: '',
    matchMakingTimeout: false,

}

export function match(state = initialState, action) {
    let newState = state
    console.log('match')
    switch(action.type) {
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
                opponentId: action.opponentId,
                accessToken: action.accessToken,
                colour: action.myPlayerColour,
                errorMessage: '',
                hasMatch: true,
                matchId: action.match.matchId,
                match: action.match,           
            }
            break
        case ActionTypes.MATCH_MAKING_TIMEOUT:
            newState = {
                ...state,
                findingMatch: false,
                opponentId: null,
                
            }
            break
    }
    return newState
}