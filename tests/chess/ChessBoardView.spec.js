import { ChessBoard } from '../../src/chess/ChessBoard'
import { Columns } from '../../src/chess/ChessBoardConstants'
import { ChessBoardView } from '../../src/chess/ChessBoardView'

describe("ChessBoardView", () => {
    const board = ChessBoard.initialBoard()

    it("canPawnMove one square from initial position should be true", ()=> {
        const view = board.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.E, 3)).toBeTruthy()
    })
})