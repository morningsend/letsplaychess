import { ChessPiece } from './'

export const MoveTypes = {
    Normal: 'Normal',
    Castle: 'Castle',
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
}

export default {
    Move,
    MoveTypes
}