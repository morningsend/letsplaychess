
export const MoveTypes = {
    Normal: 'Normal',
    Castle: 'Castle',
    PawnPromotion: 'PawnPromotion',
    TakePiece: 'TakePiece'
}

export class Move {

    constructor(piece, moveType, positionFrom, positionTo, extra) {
        this._piece = piece
        this._moveType = moveType
        this._positionFrom = positionFrom
        this._positionTo = positionTo
        this._extra = extra
    }

    get piece() {
        return this._piece
    }
    get type() {
        return this._moveType
    }

    get from() {
        return this._positionFrom
    }

    get to() {
        return this._positionTo
    }
    get extra() {
        return this._extra
    }
}

export default {
    Move,
    MoveTypes
}