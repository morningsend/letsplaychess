import { ChessPiece, ChessMoveNotation, ChessPieceNotation } from './'

export const MoveTypes = {
    Normal: 'Normal',
    CastleKingSide: 'CastleKingSide',
    CastleQueenSide: 'CastleQueenSide',
    PawnPromotion: 'PawnPromotion',
    TakePiece: 'TakePiece'
}

export class Move {

    constructor(piece, moveType, positionTo, extra = {}) {
        this._piece = new ChessPiece(piece.colour, piece.kind, { ...piece.position}, piece.firstMoveMade)
        this._moveType = moveType
        this._positionTo = positionTo
        this._extra = extra
        this._positionFrom = { ...piece.position }
        this._notation = ''
    }

    get piece() {
        return this._piece
    }
    get type() {
        return this._moveType
    }

    get to() {
        return this._positionTo
    }
    get extra() {
        return this._extra
    }

    get from() {
        return this._positionFrom
    }
    toString() {
        if(!this._notation) {
            const piece = ChessPieceNotation[this._piece.kind]
            const move = ChessMoveNotation[this.moveType]
            const column = String.fromCharCode(96 + this._positionTo.column)
            const row = this._positionTo.row
            switch(this._moveType) {
                case MoveTypes.Normal:
                case MoveTypes.TakePiece:
                    this._notation = `${piece}${move}${column}${row}`
                    break
                case MoveTypes.CastleKingSide:
                case MoveTypes.CastleQueenSide:
                    this._notation = move
                    break

                case MoveTypes.PawnPromotion:
                    const promoted = ChessPieceNotation[this._extra.promoted]
                    this._notation = `${piece}${move}${column}${row}=${promoted}`
                    break
                default:
                    this._notation = '<>'
                    break
            }

            this._
        }
        return this._notation
    }
}

export default {
    Move,
    MoveTypes
}