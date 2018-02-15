import { Columns } from './ChessBoardConstants'
import { AllPieces, PieceKinds } from './ChessPieces'
/** 
 * A board with pieces rotated depending on player colour so we
 * only have to implement piece movement logic once.
 */
export class ChessBoardView {

    constructor(boardPosition, playerColour) {
        this._boardPosition = boardPosition
        this._playerColour = playerColour;
    }

    get playerColour() {
        return this._playerColour
    }

    get boardPosition() {
        return this._boardPosition
    }

    canMovePiece(piece, columnFrom, rowTo) {
        
    }

    canPawnMove(pawn, columnTo, rowTo) {


        return this.validateKingNotInCheck(this._boardPosition)
    }

    validateKingNotInCheck(boardPosition) {

    }


}