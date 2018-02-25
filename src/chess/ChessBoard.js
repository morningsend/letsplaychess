import { PlayerColours, PieceKinds, ChessPiece } from './ChessPieces'
import { ChessBoardView } from './ChessBoardView'
import { EmptyBoardPosition, InitialPosition } from './ChessBoardConstants'
import { MoveTypes, Move } from './Moves'

export class ChessBoard {
    static flipBoard(board) {
        const newBoard = new Array(board.length)
        for (let i = 0; i < board.length; i += 1) {
            const columnIndex = i
            const rowLength = board[columnIndex].length
            newBoard[i] = new Array(rowLength)
            for (let j = 0; j < board[columnIndex].length; j += 1) {
                const piece = board[columnIndex][rowLength - 1 - j]
                if (piece) {
                    newBoard[i][j] = new ChessPiece(
                        piece.colour,
                        piece.kind,
                        { column: i + 1, row: j + 1 },
                        piece.firstMoveMade,
                    )
                }
            }
        }
        return newBoard
    }
    constructor(boardPosition = InitialPosition()) {
        this._whiteBoardView = new ChessBoardView(boardPosition, PlayerColours.White)
        this._boardPosition = this._whiteBoardView._boardPosition
        this._blackBoardView = new ChessBoardView(
            ChessBoard.flipBoard(boardPosition),
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
        return this.whiteView._boardPosition[column - 1][row - 1]
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

    /**
     * Put a piece on the chess board
     * c and r are optional.
     * @param {ChessPiece} piece 
     * @param {tnteger} c 
     * @param {integer} r 
     */
    placePiece(piece, c, r) {
        const columnTo = c || piece.position.column
        const rowTo = r || piece.position.row
        const blackViewRowTo = this.height - rowTo + 1
        this._checkRange(columnTo, rowTo)

        this._whiteBoardView.placePiece(
            piece, columnTo, rowTo
        )
        this._blackBoardView.placePiece(
            new ChessPiece(
                piece.colour,
                piece.kind,
                null,
                piece.firstMoveMade
            ),
            columnTo,
            blackViewRowTo,
        )
    }

    makeMove(move) {
        const { piece, to } = move
        if(!piece) {
            return false
        }
        const columnTo = to.column
        const rowTo = to.row
        this._checkRange(columnTo, rowTo)
        const { column, row } = piece.position
        
        const blackViewPiece = new ChessPiece(
            piece.colour,
            piece.kind,
            { column: column, row: this.boardHeight - row + 1},
            piece.firstMoveMade
        )
        this.blackView.makeMove(blackViewPiece, move.type, columnTo, this.boardHeight - rowTo + 1)
        this.whiteView.makeMove(piece, move.type, columnTo, rowTo)
        return true
    }
    _checkRange(column, row) {
        if (column < 1 || column > this.boardWidth) {
            throw new Error(`${column} is out of range.`)
        }
        if (row < 1 || row > this.boardHeight) {
            throw new Error(`${row} is out of range.`)
        }
    }
    isMoveValid(move) {
        const { piece, to } = move
        const columnTo = to.column
        const rowTo = to.row

        if (!piece) {
            return false
        }
        const chessBoard = this
        const { colour } = piece
        if (colour === PlayerColours.White) {
            switch(move.type) {
                case MoveTypes.Normal:
                case MoveTypes.PawnPromotion:
                case MoveTypes.TakePiece:
                    return this
                            .whiteView
                            .canMovePiece(piece, columnTo, rowTo)
                case MoveTypes.Castle:
                    return this
                            .whiteView
                            .canKingCastle(
                                move.piece,
                                move.extra.rook,
                                columnTo,
                                rowTo,
                                this.blackView
                            )
                default:
                    return false
            }
        } else if(colour === PlayerColours.Black) {
            const blackViewPiece = this
                                    .blackView
                                    .pieceAt(
                                        piece.position.column,
                                        chessBoard.boardHeight - piece.position.row + 1
                                    )
            switch(move.type) {
                case MoveTypes.Normal:
                case MoveTypes.PawnPromotion:
                case MoveTypes.TakePiece:
                    return this
                            .blackView
                            .canMovePiece(blackViewPiece, columnTo, chessBoard.boardHeight - rowTo + 1)
                case MoveTypes.Castle:
                    let rook = move.extra.rook 
                    const rookBlackView = new ChessBoard(
                        rook.colour,
                        rook.kind,
                        { column: rook.position.column, row: chessBoard.boardHeight - rook.position.row + 1},
                        rook.firstMoveMade
                    )
                    return this
                            .blackView
                            .canKingCastle(
                                blackViewPiece,
                                rookBlackView,
                                columnTo,
                                chessBoard.boardHeight - rowTo + 1,
                                this.whiteView
                            )
                default:
                    return false
            }
            return canMove
        }
        
        return false
    }
    isKingInCheck(playerColour) {
        if (playerColour === PlayerColours.White) {
            return this
                    .whiteView
                    .isThisKingInCheck(this.blackView)
        } else {
            return this
                    .blackView
                    .isThisKingInCheck(this.whiteView)
        }
    }
    /**
     * Detected if player is checkmate
     * @param {PlayerColours} playerColour 
     */
    isCheckMate(playerColour) {
        // algorithm:
        // 1. get all possible moves of king, see if king can move out of check，if possible, terminate, return false
        // 
        // 2. find all enemy pieces that are attacking the king,
        // 3. for each enemy piece, see if they can be taken by a friendly piece.
        // 4. if possible, terminate, return false
        // 5. return true.
        const kingInCheck = this.isKingInCheck(playerColour)

        if(!kingInCheck.inCheck) {
            return false
        }
        
        let thisPlayerView = null
        let otherPlayerView = null
        let thisKing = null
        if(playerColour === PlayerColours.White) {
            thisPlayerView = this.whiteView
            otherPlayerView = this.blackView
        } else {
            thisPlayerView = this.blackView
            otherPlayerView = this.whiteView
        }
        
        thisKing = thisPlayerView.getPieceOfKind(PieceKinds.King)
        
        let { column, row } = thisKing.position
        let moves = [
            [ column - 1, row],
            [ column - 1, row -1],
            [ column - 1, row + 1],
            [ column, row + 1],
            [ column, row - 1],
            [ column + 1, row],
            [ column + 1, row - 1],
            [ column + 1, row + 1],
        ]
        for(let i = 0; i < moves.length; i++) {
            const [c, r] = moves[i]
            if(!thisPlayerView.validateMoveRange(c, r)) {
                continue
            }
            //console.log("checking king can move out of check", thisKing, c, r)
            if(thisPlayerView.canKingMove(thisKing, c, r, otherPlayerView)) {
                //console.log("king can move out of check")
                return false
            }
        }
        return true
    }
    isStaleMate(playerColour) {
        return false
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
