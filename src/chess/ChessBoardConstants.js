import { ChessPiece, PlayerColours, PieceKinds } from './ChessPieces'

const A = 1
const B = 2
const C = 3
const D = 4
const E = 5
const F = 6
const G = 7
const H = 8

export const Columns = {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
}
export const InitialPosition = () => [
    // column A
    [
        new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.A, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.A, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.A, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.Rook, { column: Columns.A, row: 8 }),
    ],
    // coloumn B
    [
        new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.B, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Knight, { column: Columns.B, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.Rook, { column: Columns.B, row: 8 }),
    ],
    // coloumn C
    [
        new ChessPiece(PlayerColours.White, PieceKinds.Bishop, { column: Columns.C, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.C, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.C, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.Bishop, { column: Columns.C, row: 8 }),
    ],
    // coloumn D
    [
        new ChessPiece(PlayerColours.White, PieceKinds.Queen, { column: Columns.D, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.D, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.D, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.Queen, { column: Columns.D, row: 8 }),
    ],
    // coloumn E
    [
        new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.E, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.E, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.King, { column: Columns.E, row: 8 }),
    ],
    // coloumn F
    [
        new ChessPiece(PlayerColours.White, PieceKinds.Bishop, { column: Columns.F, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.F, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.F, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.Bishop, { column: Columns.F, row: 8 }),
    ],
    // coloumn G
    [
        new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.G, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.G, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.G, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.Knight, { column: Columns.G, row: 8 }),
    ],
    // coloumn H
    [
        new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.H, row: 1 }),
        new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.H, row: 2 }),
        null,
        null,
        null,
        null,
        new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.H, row: 7 }),
        new ChessPiece(PlayerColours.Black, PieceKinds.Rook, { column: Columns.H, row: 8 }),
    ],
]

export const EmptyBoardPosition = () => [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
]
