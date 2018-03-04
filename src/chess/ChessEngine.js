import { PlayerColours } from './ChessPieces'
import { ChessBoard } from './ChessBoard'

export class ChessEngine {
    constructor() {
        this.chessBoard = ChessBoard.initialBoard()
    }

    makeMove(move) {
        if (!this.isMoveValid(move)) {
            return false
        }
        return this.chessBoard.makeMove(move)
    }

    isMoveValid(move) {
        return this.chessBoard.isMoveValid(move)
    }

    get board() {
        return this.chessBoard
    }
}

export default ChessEngine
