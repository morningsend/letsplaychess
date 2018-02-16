import { Columns } from './ChessBoardConstants'
import { AllPieces, PieceKinds } from './ChessPieces'
/** 
 * A board with pieces rotated depending on player colour so we
 * only have to implement piece movement logic once.
 */
export class ChessBoardView {

    constructor(boardPosition, playerColour) {
        this._boardPosition = boardPosition
        this._playerColour = playerColour;
    }

    get playerColour() {
        return this._playerColour
    }

    get boardPosition() {
        return this._boardPosition
    }
    placePiece(piece, column, row) {
        if(!column) {
            column = piece.position.column
        }
        if(!row) {
            row = piece.position.row
        }
        this._boardPosition[column - 1][row - 1] = piece
        piece.position = { column, row }
    }
    canMovePiece(piece, columnTo, rowTo) {
        if(!this.validateMoveRange(columnTo, rowTo)) {
            return false;
        }
    }
    canPawnMove(pawn, columnTo, rowTo) {
        if(!this.validateMoveRange(columnTo, rowTo)) {
            return false;
        }
        
        const { column, row } = pawn.position

        // pawn can only move 1 or 2 squares forward on y-axis
        if(rowTo <= row || rowTo > row + 2) {
            return false
        }
        if(rowTo == row + 1) {
            if(columnTo == column && this.isEmpty(columnTo, rowTo)) {
                return this.validateKingNotInCheck()
            } else if(columnTo == column + 1 || columnTo == column - 1) {
                if(this.canAttack(pawn, columnTo, rowTo)) {
                    return this.validateKingNotInCheck()
                }
                return false
            }
            return false
        }
        if(!pawn.firstMoveMade && rowTo == row + 2) {
            if(columnTo == column && this.isEmpty(columnTo, rowTo)){
                return this.validateKingNotInCheck()
            }
            return false
        }
        return false
    }

    canKnightMove(knight, columnTo, rowTo) {
        
        if(!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const {column, row} = knight.position
        //console.log(knight, columnTo, rowTo)
        //console.log(this._boardPosition[columnTo -1][ rowTo -1])
        if(
            !(Math.abs(columnTo - column) == 1 && Math.abs(rowTo - row) == 2) &&
            !(Math.abs(columnTo - column) == 2 && Math.abs(rowTo - row) == 1)) {
                //console.log("not l shape")
            return false
        }
        if(this.isEmpty(columnTo, rowTo) || this.canAttack(knight, columnTo, rowTo)) {
            //console.log("empty or can attach")
            return this.validateKingNotInCheck()
        }

        return false
    }
    
    canKingMove(king, columnTo, rowTo) {
        if(!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row} = king.position
        if(columnTo == column && rowTo == row) {
            return false
        }
        const piece = this._boardPosition[columnTo - 1][rowTo - 1]
        if(!king.firstMoveMade && piece && piece.kind == PieceKinds.Rook && !piece.firstMoveMade) {
            return this.canKingCastle(king, piece, columnTo, rowTo)
        }
            // check can move one square
        if(Math.abs(column - columnTo) > 1 && Math.abs(row - rowTo) > 1) {
            return false
        }
        if(!(this.isEmpty(columnTo, rowTo)|| this.canAttack(king, columnTo, rowTo))){
            return false
        }
        return this.validateKingNotInCheck()
    }
    canKingCastle(king, rook, columnTo, rowTo) {
        const { column, row } = king
        if(king.kind != PieceKinds.King || rook.kind != PieceKinds.Rook) {
            return false
        }
        if(king.firstMoveMade || rook.firstMoveMade) {
            return false
        }
        // move either 2 squares to left or right
        if(Math.abs(column - columnTo) != 2 || rowTo != row) {
            return false
        }
        // convoluted logic to check if king is moving through a square that can check

    }
    canRookMove(rook, columnTo, rowTo) {
        if(!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row } = rook.position
        // constraint rook to move on only columns or rows
        if(column - columnTo == 0 && rowTo - row == 0) {
            return false
        }
        if(Math.abs(column - columnTo) != 0 && Math.abs(row - rowTo) != 0) {
            return false
        }
        if(column - columnTo == 0 && this.isRowPathClear(column, row, rowTo)) {
            if(this.isEmpty(columnTo, rowTo) || this.canAttack(rook, columnTo, rowTo)) {
                return this.validateKingNotInCheck()
            }
            else {
                return false
            }
        }

        if(row - rowTo == 0 && this.isColumnPathClear(row, column, columnTo)) {
            if(this.isEmpty(columnTo, rowTo) || this.canAttack(rook, columnTo, rowTo)) {
                return this.validateKingNotInCheck()
            }
            else {
                return false
            }
        }
        return false
    }

    canBishopMove(bishop, columnTo, rowTo) {
        if(!this.validateMoveRange(columnTo, rowTo)) {
            return false
        }
        const { column, row } = bishop.position
        if(columnTo == column || rowTo == row) {
            return false
        }
        // bishop is constrained to move on diagonals
        if(Math.abs(columnTo - column) != Math.abs(rowTo - row)) {
            return false
        }

        if(!this.isDiagonalPathClear(column, row, columnTo, rowTo)) {
            return false
        }
        if(this.isEmpty(columnTo, rowTo) || this.canAttack(bishop, columnTo, rowTo)) {
            return this.validateKingNotInCheck()
        }
        return false
    }
    canQueenMove(queen, columnTo, rowTo) {
        return this.canRookMove(queen, columnTo, rowTo) && this.canBishopMove(queen, columnTo, rowTo)
    }

    isEmpty(column, row) {
        return this._boardPosition[column - 1][row - 1] == null
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
        rowFrom += increment
        const boardColumn = this._boardPosition[column - 1]
        let clear = true
        for(let i = rowFrom; i != rowTo ; i += increment) {
            clear = clear && (boardColumn[i - 1] == null)
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
        columnFrom += increment
        for(let i = columnFrom; i != columnTo; i += increment) {
            clear = clear && this.isEmpty(i, row)
        }
        return clear
    }
    /**
     * check if moving diagonally is possible with no pieces in between (columnFrom, rowFrom) -> (columnTo, rowTo)
     * @param {integer} columnFrom 
     * @param {integer} rowFrom 
     * @param {intger} columnTo 
     * @param {integer} rowTo 
     */
    isDiagonalPathClear(columnFrom, rowFrom, columnTo, rowTo) {
        // make sure we are moving diagonally else stuck in an infinite loop
        if(Math.abs(columnFrom - columnTo) != Math.abs(rowFrom - rowTo)) {
            return false
        }
        let columnIncrement = columnFrom <= columnTo ? 1 : -1
        let rowIncrement = rowFrom <= rowTo ? 1 : -1
        let clear = true
        for(let i = columnFrom + columnIncrement, j = rowFrom + rowIncrement;
            i != columnTo;
            i += columnIncrement, j += rowIncrement
        ) {
            clear = clear && this.isEmpty(i, j)
        }
        return clear
    }

    canAttack(piece, columnAt, rowAt) {
        const otherPiece = this._boardPosition[columnAt - 1][rowAt - 1]
        if(otherPiece == null || otherPiece.colour == piece.colour) {
            return false
        }
        return true
    }

    validateKingNotInCheck() {
        return true
    }

    validateMoveRange(column, row) {
        return !(column < 1 || column > 8) && !(row < 1 || row > 8)
    }

}