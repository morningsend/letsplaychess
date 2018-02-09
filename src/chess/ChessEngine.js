import { AllPieces, PieceKinds, PlayerColours } from './ChessPiece'
import { ChessBoard } from './ChessBoard'

export class ChessEngine {

    constructor() {
        this.chessBoard = ChessBoard.initialBoard()
        this.turn = PlayerColours.White
    }

    makeMove(colour, moveFrom, moveTo) {
        return []
    }
}

export default ChessEngine