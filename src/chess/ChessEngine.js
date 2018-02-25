import { PlayerColours } from './ChessPieces'
import { ChessBoard } from './ChessBoard'

export class ChessEngine {
    constructor() {
        this.chessBoard = ChessBoard.initialBoard()
    }

    makeMove(piece, columnTo, rowTo) {
        if (!this.isMoveValid(piece, columnTo, rowTo)) {
            return false
        }
        return this.chessBoard.makeMove(piece, columnTo, rowTo)
    }

    isMoveValid(piece, columnTo, rowTo) {
        return this.chessBoard.isMoveValid(piece, columnTo, rowTo)
    }

    get board() {
        return this.chessBoard
    }
}

export default ChessEngine
