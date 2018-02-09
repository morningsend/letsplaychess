import { PlayerColours, PieceKinds, AllPieces } from './ChessPiece'

const A = 0
const B = 1
const C = 2
const D = 3
const E = 4
const F = 5
const G = 6
const H = 7

export const Columns = {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H
}
const InitialPosition = [
    // column A
    [
        AllPieces.WhiteRook,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackPawn,
        AllPieces.BlackPawn,
    ],
    // coloumn B
    [
        AllPieces.WhiteKnight,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackPawn,
        AllPieces.BlackKnight,
    ],
    // coloumn C
    [
        AllPieces.WhiteBishop,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackBishop,
        AllPieces.BlackKnight,
    ],
    // coloumn D
    [
        AllPieces.WhiteQueen,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackPawn,
        AllPieces.BlackQueen,
    ],
    // coloumn E
    [
        AllPieces.WhiteKing,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackPawn,
        AllPieces.BlackKing,
    ],
    // coloumn F
    [
        AllPieces.WhiteBishop,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackPawn,
        AllPieces.BlackBishop,
    ],
    // coloumn G
    [
        AllPieces.WhiteKnight,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackPawn,
        AllPieces.BlackKnight,
    ],
    // coloumn H
    [
        AllPieces.WhiteRook,
        AllPieces.WhitePawn,
        null,
        null,
        null,
        null,
        AllPieces.BlackPawn,
        AllPieces.BlackRook,
    ],
]

const EmptyBoardPosition = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
]

export class ChessBoard {
    constructor(boardPosition = InitialPosition) {
        this.boardPosition = boardPosition
        this.whitePiecesLost = []
        this.blackPiecesLost = []
    }

    getPieceAtPosition(column, row) {
        return this.boardPosition[column][row]
    }
    getBoard() {
        return this.boardPosition
    }
    getWhitePiecesLost() {
        return this.whitePiecesLost
    }
    getBlackPiecesLost() {
        return this.blackPiecesLost
    }
}

// for testing
ChessBoard.emptyBoard = () => new ChessBoard(EmptyBoardPosition)

ChessBoard.initialBoard = () => new ChessBoard()

function computeValidMoves(boardPosition, column, row) {
    piece = boardPosition[column][row]
    moves = []
    if ( piece == null) {
        return moves
    }
    switch( piece.kind ) {
        case PieceKinds.Pawn:
            moves = pawnValidMoves(boardPosition, piece.colour, column, row)
            break;
        case PieceKinds.Knight:
            moves = knightValidMoves(boardPosition, piece.colour, column, row)
            break;
        case PieceKinds.King:
            moves = knightValidMoves(boardPosition, piece.colour, column, row)
            break;
        case PieceKinds.Queen:
            moves = knightValidMoves(boardPosition, piece.colour, column, row)
            break;
        case PieceKinds.Rook:
            moves = knightValidMoves(boardPosition, piece.colour, column, row)
            break;
        case PieceKinds.Bishop:
            moves = knightValidMoves(boardPosition, piece.colour, column, row)
            break;
        default:
            throw new Error('chess piece not valid')
    }
    return []
}

export function pawnValidMoves(boardPosition, playerColour, column, row) {
    return []
}

export function knightValidMoves(boardPosition, playerColour, column, row) {
    return []
}

export function bishopValidMoves(boardPosition, playerColour, column, row) {
    return []
}

export function kingValidMoves(boardPosition, playerColour, column, row) {
    return []
}

export function queenValidMoves(boardPosition, playerColour, column, row) {
    return []
}

export function rookValidMoves(boardPosition, playerColour, column, row) {
    return []
}