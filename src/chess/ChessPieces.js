import { uniqueId } from './Utility'

export const White = 'White'
export const Black = 'Black'

export const Pawn = 'Pawn'
export const Knight = 'Knight'
export const Rook = 'Rook'
export const Queen = 'Queen'
export const Bishop = 'Bishop'
export const King = 'King'

export const PieceKinds = {
    Pawn,
    Knight,
    Rook,
    Queen,
    Bishop,
    King,
}

export const PlayerColours = {
    White,
    Black,
}

export class ChessPiece {
    
    constructor(colour, kind, position, firstMoveMade = false) {
        this._colour = colour
        this._kind = kind
        this._firstMoveMade = firstMoveMade
        this._position = position
        this._enpassant = false
        this._id = uniqueId()
    }

    get kind() {
        return this._kind
    }

    get colour() {
        return this._colour
    }

    get firstMoveMade() {
        return this._firstMoveMade
    }
    get enpassant() {
        return this._enpassant
    }

    set enpassant(value) {
        this._enpassant = value
    }
    
    set firstMoveMade(value) {
        this._firstMoveMade = value
    }

    get position() {
        return this._position
    }
    get id() {

    }
    set position(newPosition) {
        this._position = newPosition
    }
}

export const AllPieces = {
    // white pieces
    WhiteKing: new ChessPiece(PlayerColours.White, PieceKinds.King),
    WhiteQueen: new ChessPiece(PlayerColours.White, PieceKinds.Queen),
    WhiteRook: new ChessPiece(PlayerColours.White, PieceKinds.Rook),
    WhiteBishop: new ChessPiece(PlayerColours.White, PieceKinds.Bishop),
    WhiteKnight: new ChessPiece(PlayerColours.White, PieceKinds.Knight),
    WhitePawn: new ChessPiece(PlayerColours.White, PieceKinds.Pawn),
    // black pieces
    BlackKing: new ChessPiece(PlayerColours.Black, PieceKinds.King),
    BlackQueen: new ChessPiece(PlayerColours.Black, PieceKinds.Queen),
    BlackRook: new ChessPiece(PlayerColours.Black, PieceKinds.Rook),
    BlackBishop: new ChessPiece(PlayerColours.Black, PieceKinds.Bishop),
    BlackKnight: new ChessPiece(PlayerColours.Black, PieceKinds.Knight),
    BlackPawn: new ChessPiece(PlayerColours.Black, PieceKinds.Pawn),
}
