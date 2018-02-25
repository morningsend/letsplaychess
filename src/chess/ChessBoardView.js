import { PieceKinds } from './ChessPieces'
/**
 * A board with pieces rotated depending on player colour so we
 * only have to implement piece movement logic once.
 */
export class ChessBoardView {

    validateMoveRange(column, row) {
        return !(column < 1 || column > this._width) && !(row < 1 || row > this._height)
    }

    createPieceLists(boardPosition) {
        this._thisPlayerPieces = []
        this._otherPlayerPieces = []
        for(let i = 0; i < boardPosition.length; i++) {
            for(let j = 0; j < boardPosition[0].length; j++) {
                const piece = boardPosition[i][j]
                if (piece && piece.colour === this._playerColour) {
                    this._thisPlayerPieces.push(piece)
                } else if(piece && piece.colour !== this._playerColour){
                    this._otherPlayerPieces.push(piece)
                }
            }
        }
    }
    constructor(boardPosition, playerColour) {
        this._boardPosition = boardPosition
        this._width = boardPosition.length
        this._height = boardPosition[0].length
        this._playerColour = playerColour
        this.createPieceLists(boardPosition)
    }

    get playerColour() {
        return this._playerColour
    }

    get boardPosition() {
        return this._boardPosition
    }
    get thisPlayerPieces() {
        return this._thisPlayerPieces
    }
    get otherPlayerPieces() {
        return this._otherPlayerPieces
    }
    removePieceAt(column, row) {
        const piece = this.boardPosition[column - 1][row - 1]

        if(!piece) {
            return
        }
        this.boardPosition[column - 1][row - 1] = null
        let pieceList = []
        if(piece.colour !== this._playerColour) { 
            pieceList = this._otherPlayerPieces
        } else {
            pieceList = this._thisPlayerPieces
        }
        for(let i = pieceList.length - 1; i > - 1; i--) {
            const p = this.pieceList[i]
            if (p.kind === piece.kind 
                && p.position.column === piece.position.column 
                && p.position.row === piece.position.row) {

                    pieceList.splice(i, 1)
                    break
                }
        }
    }
    makeMove(piece, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row } = piece.position
        const i = columnTo - 1, j = rowTo - 1
        this._boardPosition[column - 1][row - 1] = null
        this.removePieceAt(columnTo, rowTo)
        this._boardPosition[i][j] = piece
        this._boardPosition[i][j].firstMoveMade = true
        this._boardPosition[i][j].position = {
            column: columnTo,
            row: rowTo
        }
        return true
    }
    pieceAt(column, row) {
        return this._boardPosition[column - 1][row - 1]
    }
    placePiece(piece, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return
        }
        const column = columnTo || piece.position.column
        const row = rowTo || piece.position.row
        this._boardPosition[column - 1][row - 1] = piece
        piece.position = { column: column, row: row }

        if (piece.colour === this._playerColour) {
            this._thisPlayerPieces.push(piece)
        } else {
            this._otherPlayerPieces.push(piece)
        }
    }
    canMovePiece(piece, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        if (piece.colour !== this.playerColour) {
            return false
        }
        switch (piece.kind) {
            case PieceKinds.Pawn:
                return this.canPawnMove(piece, columnTo, rowTo)
            case PieceKinds.Knight:
                return this.canKnightMove(piece, columnTo, rowTo)
            case PieceKinds.King:
                return this.canKingMove(piece, columnTo, rowTo)
            case PieceKinds.Queen:
                return this.canQueenMove(piece, columnTo, rowTo)
            case PieceKinds.Rook:
                return this.canRookMove(piece, columnTo, rowTo)
            case PieceKinds.Bishop:
                return this.canBishopMove(piece, columnTo, rowTo)
            default:
                return false
        }
    }
    canPawnMove(pawn, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }

        const { column, row } = pawn.position
        // pawn can only move 1 or 2 squares forward on y-axis
        if (rowTo <= row || rowTo > row + 2) {
            return false
        }
        if (rowTo === row + 1) {
            if (columnTo === column && this.isEmpty(columnTo, rowTo)) {
                return this.validateKingNotInCheck()
            } else if (columnTo === column + 1 || columnTo === column - 1) {
                if (this.canAttack(pawn, columnTo, rowTo)) {
                    return this.validateKingNotInCheck()
                }
                return false
            }
            return false
        }
        if (!pawn.firstMoveMade && rowTo === row + 2) {
            if (columnTo === column && this.isEmpty(columnTo, rowTo)) {
                return this.validateKingNotInCheck()
            }
            return false
        }
        return false
    }

    canKnightMove(knight, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row } = knight.position
        // console.log(knight, columnTo, rowTo)
        // console.log(this._boardPosition[columnTo -1][ rowTo -1])
        if (
            !(Math.abs(columnTo - column) === 1 && Math.abs(rowTo - row) === 2) &&
            !(Math.abs(columnTo - column) === 2 && Math.abs(rowTo - row) === 1)) {
            // console.log("not l shape")
            return false
        }
        if (this.isEmpty(columnTo, rowTo) || this.canAttack(knight, columnTo, rowTo)) {
            // console.log("empty or can attach")
            return this.validateKingNotInCheck()
        }
        return false
    }

    canKingMove(king, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row } = king.position
        if (columnTo === column && rowTo === row) {
            return false
        }
        const piece = this._boardPosition[columnTo - 1][rowTo - 1]
        if (!king.firstMoveMade
            && piece
            && piece.kind === PieceKinds.Rook
            && !piece.firstMoveMade) {
            return this.canKingCastle(king, piece, columnTo, rowTo)
        }
        // check can move one square
        if (Math.abs(column - columnTo) > 1 || Math.abs(row - rowTo) > 1) {
            return false
        }
        if (!(this.isEmpty(columnTo, rowTo) || this.canAttack(king, columnTo, rowTo))) {
            return false
        }
        return this.validateKingNotInCheck()
    }
    canKingCastle(king, rook, columnTo, rowTo) {
        const { column, row } = king
        if (king.kind !== PieceKinds.King || rook.kind !== PieceKinds.Rook) {
            return false
        }
        if (king.firstMoveMade || rook.firstMoveMade) {
            return false
        }
        // move either 2 squares to left or right
        if (Math.abs(column - columnTo) !== 2 || rowTo !== row) {
            return false
        }
        // convoluted logic to check if king is moving through a square that can check
        if (!this.isColumnPathClear(
            king.position.row,
            king.position.column,
            rook.position.column,
        )) {
            return false
        }
        return true
    }
    canRookMove(rook, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row } = rook.position
        // constraint rook to move on only columns or rows
        
        if (column - columnTo === 0 && rowTo - row === 0) {
            return false
        }
        if (Math.abs(column - columnTo) !== 0 && Math.abs(row - rowTo) !== 0) {
            return false
        }
        if (column - columnTo === 0 && this.isRowPathClear(column, row, rowTo)) {
            if (this.isEmpty(columnTo, rowTo) || this.canAttack(rook, columnTo, rowTo)) {
                return this.validateKingNotInCheck()
            }
            return false
        }

        if (row - rowTo === 0 && this.isColumnPathClear(row, column, columnTo)) {
            if (this.isEmpty(columnTo, rowTo) || this.canAttack(rook, columnTo, rowTo)) {
                return this.validateKingNotInCheck()
            }
            return false
        }
        return false
    }

    canBishopMove(bishop, columnTo, rowTo) {
        if (!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row } = bishop.position
        if (columnTo === column || rowTo === row) {
            return false
        }
        // bishop is constrained to move on diagonals
        if (Math.abs(columnTo - column) !== Math.abs(rowTo - row)) {
            return false
        }

        if (!this.isDiagonalPathClear(column, row, columnTo, rowTo)) {
            return false
        }
        if (this.isEmpty(columnTo, rowTo) || this.canAttack(bishop, columnTo, rowTo)) {
            return this.validateKingNotInCheck()
        }
        return false
    }
    canQueenMove(queen, columnTo, rowTo) {
        return this.canRookMove(queen, columnTo, rowTo)
                || this.canBishopMove(queen, columnTo, rowTo)
    }

    isEmpty(column, row) {
        return !this._boardPosition[column - 1][row - 1]
    }

    /**
     * check if horizontal squares between (column, rowFrom) to (column, rowTo) are empty,
     * excluding endpoints
     * @param {integer} column
     * @param {integer} rowFrom
     * @param {integer} rowTo
     */
    isRowPathClear(column, rowFrom, rowTo) {
        const increment = rowFrom <= rowTo ? 1 : -1
        const boardColumn = this._boardPosition[column - 1]
        let clear = true
        for (let i = rowFrom + increment; i !== rowTo; i += increment) {
            clear = clear && (!boardColumn[i - 1])
        }
        return clear
    }
    /**
     * check if vertical squares between (columnFrom, row) to (columnTo, row) are empty,
     * excluding endpoints
     * @param {integer} row
     * @param {integer} columnFrom
     * @param {integer} columnTo
     */
    isColumnPathClear(row, columnFrom, columnTo) {
        const increment = columnFrom <= columnTo ? 1 : -1
        let clear = true
        for (let i = columnFrom + increment; i !== columnTo; i += increment) {
            clear = clear && this.isEmpty(i, row)
        }
        return clear
    }
    /**
     * check if moving diagonally is possible with no pieces in between
     * (columnFrom, rowFrom) -> (columnTo, rowTo)
     * @param {integer} columnFrom
     * @param {integer} rowFrom
     * @param {intger} columnTo
     * @param {integer} rowTo
     */
    isDiagonalPathClear(columnFrom, rowFrom, columnTo, rowTo) {
        // make sure we are moving diagonally else stuck in an infinite loop
        if (Math.abs(columnFrom - columnTo) !== Math.abs(rowFrom - rowTo)) {
            return false
        }
        const columnIncrement = columnFrom <= columnTo ? 1 : -1
        const rowIncrement = rowFrom <= rowTo ? 1 : -1
        let clear = true
        for (let i = columnFrom + columnIncrement, j = rowFrom + rowIncrement;
            i !== columnTo;
            i += columnIncrement, j += rowIncrement
        ) {
            clear = clear && this.isEmpty(i, j)
        }
        return clear
    }

    canAttack(piece, columnAt, rowAt) {
        const otherPiece = this._boardPosition[columnAt - 1][rowAt - 1]
        if (!otherPiece || otherPiece.colour === piece.colour) {
            return false
        }
        return true
    }

    validateKingNotInCheck() {
        if (this._boardPosition) {
            return true
        }
        return true
    }

    hasValidMoves() {
        if (this._thisPlayerPieces.length == 0) {
            return false
        }
        return true
    }

    getPiecesOfKind(pieceKind) {
        let pieces = []
        const allPieces = this._thisPlayerPieces
        for(let i = 0; i < allPieces.length; i++) {
            if(allPieces[i].kind === pieceKind) {
                pieces.push(allPieces[i])
            }
        }
        return pieces
    }

    getPieceOfKind(pieceKind) {
        let piece = null
        const allPieces = this._thisPlayerPieces
        for(let i = 0; i < allPieces.length; i++) {
            if(allPieces[i].kind === pieceKind) {
                piece = allPieces[i]
                break
            }
        }
        return piece
    }

    isThisKingInCheck(otherPlayerView) {
        let inCheck = false
        let attackers = []
        let thisKing = this.getPieceOfKind(PieceKinds.King)
        let otherPlayerPieces = otherPlayerView.thisPlayerPieces
        if(!thisKing || this._otherPlayerPieces.length == 0) {
            return { inCheck, attackers }
        }
        
        for(var i = 0; i < otherPlayerPieces.length; i++) {
            if(otherPlayerView.canMovePiece(otherPlayerPieces[i], thisKing.position.column, this._height - thisKing.position.row + 1)) {
                attackers.push(otherPlayerPieces[i])
                inCheck = true
            }
        }

        return { inCheck, attackers }
    }
}

export default ChessBoardView
