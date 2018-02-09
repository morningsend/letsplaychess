import { PlayerColours, PieceKinds, AllPieces } from './ChessPiece'
import { ChessBoardView } from './ChessBoardView'
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
    static _rotateBoard(board) {
        var newBoard = new Array(board.length)
        for(var i = 0; i < board.length; i++) {
            var columnIndex = board.length - 1 - i;
            var rowLength = board[columnIndex].length;
            newBoard[i] = new Array(rowLength);
            for(var j = 0; j < board[columnIndex].length; j++) {
                newBoard[i][j] = board[columnIndex][rowLength - 1 - j]
            }
        }
        return newBoard
    }
    constructor(boardPosition = InitialPosition) {
        this._boardPosition = boardPosition
        this._whiteBoardView = new ChessBoardView(boardPosition, PlayerColours.White)
        this._blackBoardView = new ChessBoardView(ChessBoard._rotateBoard(boardPosition), PlayerColours.Black)
        this._whitePiecesLost = []
        this._blackPiecesLost = []
        this._history = []
        this._canCastle = {
            White: true,
            Black: true
        }
    }

    /**
     * get piece at (column, row)
     * 1 <= column <= 8
     * 1 <= row <= 8
     */
    pieceAt(column, row) {
        return this._boardPosition[column - 1][row - 1]
    }
    get positions() {
        return this._boardPosition
    }
    get whitePiecesLost() {
        return this._whitePiecesLost
    }
    get blackPiecesLost() {
        return this._blackPiecesLost
    }
    get whiteView() {
        return this._whiteBoardView
    }
    get blackView() {
        return this._blackBoardView
    }
}

// for testing
ChessBoard.emptyBoard = () => new ChessBoard(EmptyBoardPosition)

ChessBoard.initialBoard = () => new ChessBoard()


/**
 * Valid moves for a pawn can be:
 *      1. forward one or two square if not occupied.
 *      2. forward diagonal one square if can take enemy pieces.
 * A move cannot leave the king in check, so must verify resulting position.
 * 
 * @param {ChessBoard} boardPosition
 * @param {PlayerColours} playerColour
 * @param {integer} column
 * @param {integer} row
 */
export function pawnValidMoves(board, playerColour, column, row) {
    var candidateMoves = []
    
    const boardView = playerColour == PlayerColours.White ? board.whiteView : board.blackView
    if(playerColour == PlayerColours.black) {
        row = 8 - row + 1
        column = 8 - column + 1
    }

    if(row == 8) {
        return []
    }

    if(boardView.canPawnMove(column, row, row + 1)) {
        candidateMoves.push({column, row: row + 1})
    }

    if(row == 2 && boardView.canPawnMove(column, row, row + 2)) {
        candidateMoves.push({ column, row: row + 2})
    }

    if(column > 1 && boardView.canPawnTake(column - 1, row + 1)) {
        candidateMoves.push({ column: column - 1, row: row + 1})
    }

    if(column < 8 && boardView.canPawnTake(column + 1, row + 1)) {
        candidateMoves.push({ column: column + 1, row: row + 1})
    }

    return candidateMoves
}

export function knightValidMoves(board, playerColour, column, row) {
    return []
}

export function bishopValidMoves(board, playerColour, column, row) {
    return []
}

export function kingValidMoves(board, playerColour, column, row, castleAllowed) {
    return []
}

export function queenValidMoves(board, playerColour, column, row) {
    return []
}

export function rookValidMoves(board, playerColour, column, row) {
    return []
}

export function computeValidMoves(board, column, row) {
    piece = board.pieceAt(column, row)
    moves = []
    if ( piece == null) {
        return moves
    }
    switch( piece.kind ) {
        case PieceKinds.Pawn:
            moves = pawnValidMoves(board, piece.colour, column, row)
            break;
        case PieceKinds.Knight:
            moves = knightValidMoves(board, piece.colour, column, row)
            break;
        case PieceKinds.King:
            moves = kingValidMoves(board, piece.colour, column, row)
            break;
        case PieceKinds.Queen:
            moves = queenValidMoves(board, piece.colour, column, row)
            break;
        case PieceKinds.Rook:
            moves = rookValidMoves(board, piece.colour, column, row)
            break;
        case PieceKinds.Bishop:
            moves = bishopValidMoves(board, piece.colour, column, row)
            break;
        default:
            throw new Error('chess piece not valid')
    }
    return []
}