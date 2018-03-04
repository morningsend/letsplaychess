import { PlayerColours } from './ChessPieces'
import { ChessBoard } from './ChessBoard'
import { Move, MoveTypes } from './Moves'

export class ChessEngine {
    constructor(board) {
        this.chessBoard = board || ChessBoard.initialBoard()
    }

    makeMove(move) {
        if (!this.isMoveValid(move)) {
            return false
        }
        return this.chessBoard.makeMove(move)
    }

    isMoveValid(move, playerStates) {
        //const enrichedMove = this.board.analyzeMove(move)
        //if(enrichedMove.type === MoveTypes.Castle && playerStates.castled) {
        //    return false
        //}
        return this.chessBoard.isMoveValid(move)
    }

    get board() {
        return this.chessBoard
    }
}

export default ChessEngine
