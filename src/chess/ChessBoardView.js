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

    canPawnMove(column, row, columnTo, rowTo) {
        console.log("chessboardview.canPawnMove")
        return true
    }

    canPawnTake(column, row, columnTo, rowTo) {

    }

    canPawnPromote(column, row) {
        return row == 8
    }
}