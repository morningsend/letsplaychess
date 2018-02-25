import { ChessEngine } from './ChessEngine'
import { PlayerColours } from './ChessPieces'

export const GameLengths = {
    Rapid: 30 * 60, // 30 mins
    Blitz: 900, // 15mins
    Lightning: 300, // 5 mins
}

export class PlayerState {
    constructor(states) {
        this.states = {
            castled: states.castled || false,
            castleAllowed: states.castleAllowed || true,
            inCheck: states.inCheck|| false,
            checkMate: states.checkMate || false,
            staleMate: states.staleMate || false,
            timeRemaining: states.timeRemaining || 0, // seconds
        }
    }
}

const InitialGameStates = {
    moves: [],
    turnToMove: PlayerColours.White,
    blackPlayerStates: {},
    whitePlayerStates: {},
}
const InitialPlayerStates = {

}


export const PlayerRequest = {
    Surrender: 'Surrender',
    OfferDraw: 'OfferDraw',
    AcceptDraw: 'AcceptDraw',
    DeclineDraw: 'DeclineDraw',
}
export class PlayerOption {
    constructor()
}
/**
 * 
 */
export class GameStateMachine {

    constructor(initialState) {
        this.gameState = initialState
        this.chessEngine = new ChessEngine
    }

    onMove(move) {

    }
    onPlayerOption(request) {
        
    }
    
    static nextState(state, move) {

    }
}