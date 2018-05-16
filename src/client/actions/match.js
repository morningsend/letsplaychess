export const ActionTypes = {
    MATCH_MAKING_START: 'MATCH_MAKING_START',
    MATCH_FOUND: 'MATCH_FOUND',
    MATCH_MAKING_TIMEOUT: 'MATCH_MAKING_TIMEOUT',
}

export function findMatch(userId, timestamp) {
    return {
        type: ActionTypes.MATCH_MAKING_START,
        userId,
        timestamp,
    }
}

export function matchFound(userId, opponentId, matchId) {
    return {
        type: ActionTypes.MATCH_FOUND,
        userId,
        opponentId,
        matchId,
    }
}

export function matchMakingTimeout() {
    return {
        type: ActionTypes.MATCH_MAKING_TIMEOUT,
    }
}