import { PlayerColours } from '../../chess'

export const ActionTypes = {
    MATCH_MAKING_START: 'MATCH_MAKING_START',
    MATCH_FOUND: 'MATCH_FOUND',
    MATCH_MAKING_TIMEOUT: 'MATCH_MAKING_TIMEOUT',
    MATCH_MAKING_REQUEST_ERROR: 'MATCH_MAKING_REQUEST_ERROR',
}

export function findMatch(userId, timestamp) {
    return {
        type: ActionTypes.MATCH_MAKING_START,
        userId,
        timestamp,
    }
}

export function matchFound(userId, match) {
    return {
        type: ActionTypes.MATCH_FOUND,
        match,
        userId,
        myPlayerColour: match.whitePlayerId === userId ? PlayerColours.White : PlayerColours.Black,
    }
}

export function matchMakingTimeout() {
    return {
        type: ActionTypes.MATCH_MAKING_TIMEOUT,
        errorMessage: 'Failed to find an opponent, please try again.'
    }
}

export function findMatchRequestError(error) {
    return {
        type: ActionTypes.MATCH_MAKING_REQUEST_ERROR,
        errorMessage: error.message || 'error happenend while finding a match.'
    }
}