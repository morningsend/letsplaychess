export const White = 'White'
export const Black = 'Black'

export const Pawn = 'Pawn'
export const Knight = 'Knight'
export const Rook = 'Rook'
export const Queen = 'Queen'
export const Bishop = 'Bishop'
export const King = 'King'

const PieceKinds = {
    Pawn,
    Knight,
    Rook,
    Queen,
    Bishop,
    King
}
const PlayerColours = { 
    White,
    Black
}
class ChessPiece {

    constructor(colour, kind) {
        this._colour = colour
        this._kind = kind
    }

    get kind() {
        return this._kind
    }

    get colour() {
        return this._colour
    }
}

const AllPieces = {
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

export {
    AllPieces,
    PlayerColours,
    PieceKinds,
    ChessPiece,
}