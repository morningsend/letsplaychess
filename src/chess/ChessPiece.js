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
    King
}
export const PlayerColours = { 
    White,
    Black
}
export class ChessPiece {

    constructor(colour, kind) {
        this.colour = colour
        this.kind = kind
    }

    get kind() {
        return this.kind
    }

    get colour() {
        return this.colour
    }
}

const AllPieces = {
    WhiteKing: new ChessPiece(PlayerColours.White, PieceKinds.King),
    WhiteQueen: new ChessPiece(PlayerColours.White, PieceKinds.Queen),
    WhiteRook: new ChessPiece(PlayerColours.White, PieceKinds.Rook),
    WhiteBishop: new ChessPiece(PlayerColours.White, PieceKinds.Bishop),
    WhiteKnight: new ChessPiece(PlayerColours.White, PieceKinds.Knight),
    WhitePawn: new ChessPiece(PlayerColours.White, PieceKinds.Pawn),
    BlackKing: new ChessPiece(PlayerColours.White, PieceKinds.King),
    BlackQueen: new ChessPiece(PlayerColours.White, PieceKinds.Queen),
    BlackRook: new ChessPiece(PlayerColours.White, PieceKinds.Rook),
    BlackBishop: new ChessPiece(PlayerColours.White, PieceKinds.Bishop),
    BlackKnight: new ChessPiece(PlayerColours.White, PieceKinds.Knight),
    BlackPawn: new ChessPiece(PlayerColours.White, PieceKinds.Pawn),
}

export const AllPieces
export const PlayerColours
export const PieceKinds
