import { PlayerColours, PieceKinds, ChessPiece } from './ChessPieces'
import { ChessBoardView } from './ChessBoardView'
import { EmptyBoardPosition, InitialPosition } from './ChessBoardConstants'

export class ChessBoard {
    static rotateBoard(board) {
        const newBoard = new Array(board.length)
        for (let i = 0; i < board.length; i += 1) {
            const columnIndex = board.length - 1 - i
            const rowLength = board[columnIndex].length
            newBoard[i] = new Array(rowLength)
            for (let j = 0; j < board[columnIndex].length; j += 1) {
                newBoard[i][j] = board[columnIndex][rowLength - 1 - j]
            }
        }
        return newBoard
    }
    constructor(boardPosition = InitialPosition()) {
        this._boardPosition = boardPosition
        this._whiteBoardView = new ChessBoardView(boardPosition, PlayerColours.White)
        this._blackBoardView = new ChessBoardView(
            ChessBoard.rotateBoard(boardPosition),
            PlayerColours.Black,
        )
        this._whitePiecesLost = []
        this._blackPiecesLost = []
        this._history = []
        this.width = boardPosition ? boardPosition.length : 0
        this.height = boardPosition ? boardPosition[0].length : 0
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

    get boardWidth() {
        return this.width
    }

    get boardHeight() {
        return this.height
    }

    placePiece(piece, c, r) {
        const columnTo = c || piece.position.column
        const rowTo = r || piece.position.row

        this._checkRange(columnTo, rowTo)
        this._boardPosition[columnTo - 1][rowTo - 1] = piece

        // console.log("after placing piece",this._boardPosition[column - 1][row - 1])
        this._boardPosition[columnTo - 1][rowTo - 1].position
            = { column: columnTo, row: rowTo }

        this._blackBoardView.placePiece(
            new ChessPiece(piece.colour, piece.kind, null, piece.firstMoveMade),
            (this.width - columnTo) + 1,
            (this.height - rowTo) + 1,
        )
    }

    makeMove(piece, columnTo, rowTo) {
        const { column, row } = piece.position
        this._boardPosition[column - 1][row - 1] = null
        piece.firstMoveMade = true
        piece.position = {
            column: columnTo,
            row: rowTo,
        }
        this._boardPosition[columnTo - 1][rowTo - 1] = piece
    }
    _checkRange(column, row) {
        if (column < 1 || column > this.boardWidth) {
            throw new Error(`${column} is out of range.`)
        }
        if (row < 1 || row > this.boardHeight) {
            throw new Error(`${row} is out of range.`)
        }
    }
}

// for testing
ChessBoard.emptyBoard = () => new ChessBoard(EmptyBoardPosition())

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
export function pawnValidMoves(board, playerColour, c, r) {
    const candidateMoves = []
    let column = c
    let row = r
    const pawn = board.pieceAt(c, r)
    const boardView = playerColour === PlayerColours.White ? board.whiteView : board.blackView
    if (playerColour === PlayerColours.black) {
        row = (8 - c) + 1
        column = (8 - r) + 1
    }

    if (row === 8) {
        return []
    }

    if (boardView.canPawnMove(pawn, column, row + 1)) {
        candidateMoves.push({ column, row: row + 1 })
    }

    if (row === 2 && boardView.canPawnMove(pawn, column, row + 2)) {
        candidateMoves.push({ column, row: row + 2 })
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
    const piece = board.pieceAt(column, row)
    let moves = []
    if (piece == null) {
        return moves
    }
    switch (piece.kind) {
    case PieceKinds.Pawn:
        moves = pawnValidMoves(board, piece.colour, column, row)
        break
    case PieceKinds.Knight:
        moves = knightValidMoves(board, piece.colour, column, row)
        break
    case PieceKinds.King:
        moves = kingValidMoves(board, piece.colour, column, row)
        break
    case PieceKinds.Queen:
        moves = queenValidMoves(board, piece.colour, column, row)
        break
    case PieceKinds.Rook:
        moves = rookValidMoves(board, piece.colour, column, row)
        break
    case PieceKinds.Bishop:
        moves = bishopValidMoves(board, piece.colour, column, row)
        break
    default:
        throw new Error('chess piece not valid')
    }
    return []
}