import { ChessEngine } from './ChessEngine'
import { PlayerColours } from './ChessPieces'
import { ChessBoard } from '.';

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
export const GameOutcome = {
    Draw: "Draw",
    WhiteWin: "WhiteWin",
    BlackWin: "BlackWin",
    Indeterminate: 'Indeterminate'
}

export const GameStatus = {
    OnGoing: 'OnGoing',
    End: 'End',
    Ready: 'Ready'
}
const InitialGameStates = {
    moves: [],
    turnToMove: PlayerColours.White,
    status: GameStatus.Ready,
    outcome: GameOutcome.Indeterminate,
    pendingDrawOffer: null,
}
const InitialPlayerStates = {

}


export const PlayerActions = {
    Resign: 'Resign',
    OfferDraw: 'OfferDraw',
    AcceptDraw: 'AcceptDraw',
    DeclineDraw: 'DeclineDraw',
}
export class PlayerAction {
    constructor(playerColour, actionType) {
        this._playerColour = playerColour
        this._actionType = actionType
    }

    get playerColour() {
        return this._playerColour
    }

    get type() {
        return this._actionType
    }
}
/**
 * Top level game object.
 * Implements game state transitions.
 */
export class GameStateMachine {

    constructor(initialState, options) {
        this.gameState = initialState
        this.whitePlayerState = {}
        this.blackPlayerState = {}
        this.gameState.duration = options.duration
        this._chessEngine = new ChessEngine(options.initialBoard)
        this._moves = []
    }
    get chessEngine() {
        return this._chessEngine
    }
    get hasGameEnded() {
        return this.gameState.status === GameStatus.End
    }
    get gameStatus() {
        return this.gameState.status
    }
    get gameOutcome() {
        return this.gameState.outcome
    }
    get nextTurn() {
        return this.gameState.turnToMove
    }
    getPlayerState(colour) {
        switch(colour) {
            case PlayerColours.White:
                return this.whitePlayerState
            case PlayerColours.Black:
                return this.blackPlayerState
            default:
                return this.whitePlayerState
        }
    }
    /**
     * Main game loop.
     * After each move is made, determine if the next player is: 
     *  - checkmate.
     *  - stalemate.
     * else:
     *  set next turn to colour of the other player.
     * @param {Move} move
     */
    onMove(move) {
        if(this.hashGameEnded) {
            return false
        }
        if(!move || !move.piece) {
            return false
        }
        if(move.piece.colour !== this.gameState.turnToMove) {
            return false
        }

        let playerState = this.getPlayerState(move.piece.colour)
        if(!this._chessEngine.makeMove(move, playerState)) {
            return false
        }
        this._moves.push(move)
        const nextPlayerTurn = GameStateMachine.nextTurn(move.piece.colour)
        // invalid move does not do anythin. 
        this.gameState.turnToMove = nextPlayerTurn
        this.gameState.status = GameStatus.OnGoing

        if(this._chessEngine.chessBoard.isCheckMate(nextPlayerTurn)) {
            this.gameState.status = GameStatus.End
            this.gameState.outcome = GameStateMachine.winOutComeFor(move.piece.colour)
        } else if(this._chessEngine.chessBoard.isStaleMate(nextPlayerTurn)) {
            this.gameState.status = GameStatus.End
            this.gameState.outcome = GameOutcome.Draw
        }
        return true
    }

    onPlayerAction(action) {
        if(this.hasGameEnded || !action.playerColour || !action.type) {
            return
        }
        switch(action.type) {
            case PlayerActions.Resign:
                this.gameState.status = GameStatus.End
                this.gameState.outcome = 
                    GameStateMachine.winOutComeFor(GameStateMachine.nextTurn(action.playerColour))
                break;
            case PlayerActions.OfferDraw:
                this.gameState.pendingDrawOffer = action
                break;
            case PlayerActions.DeclineDraw:
                break;
            case PlayerActions.AcceptDraw:
                if(this.gameState.pendingDrawOffer.playerColour !== action.playerColour) {   
                    this.gameState.status = GameStatus.End
                    this.gameState.outcome = GameOutcome.Draw
                }
                break;
            default:
                break;
        }
    }
    get moves() {
        return this._moves
    }
    static newGame(gameOptions) {
        const options = {
            /* duration of game in seconds */
            duration: gameOptions.duration || 600,
            initialBoard: gameOptions.board || ChessBoard.initialBoard()
        }
        return new GameStateMachine(
            {
                ...InitialGameStates
            },
            options
        )
    }
    static nextTurn(colour) {
        if(colour === PlayerColours.White) {
            return PlayerColours.Black
        } else if(colour === PlayerColours.Black) {
            return PlayerColours.White
        }
    }
    static winOutComeFor(colour) {
        if(colour === PlayerColours.White) {
            return GameOutcome.WhiteWin
        } else if(colour === PlayerColours.Black) {
            return GameOutcome.BlackWin
        }
    }
}