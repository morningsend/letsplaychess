import { PlayerColours } from './ChessPieces'
import { ChessBoard } from './ChessBoard'

export class PlayerState {
    constructor() {
        this.states = {
            castled: false,
            castleAllowed: true,
            inCheck: false,
            checkMate: false,
            staleMate: false,
            timeRemaining: 0, // seconds
        }
    }
}

export class ChessEngine {
    constructor() {
        this.chessBoard = ChessBoard.initialBoard()
        this.turn = PlayerColours.White
        this.whitePlayerStates = new PlayerState()
        this.blackPlayerState = new PlayerState()
    }

    makeMove(piece, columnTo, rowTo) {
        if (!this.isMoveValid(piece, columnTo, rowTo)) {
            return false
        }
        this.chessBoard.makeMove(piece, columnTo, rowTo)
        return true
    }

    isMoveValid(piece, columnTo, rowTo) {
        if (!piece) {
            return false
        }
        const { colour } = piece
        if (colour === PlayerColours.White) {
            return this.chessBoard
                .whiteView
                .canMovePiece(piece, columnTo, rowTo)
        }
        return false
    }

    get board() {
        return this.chessBoard
    }
}

export default ChessEngine
