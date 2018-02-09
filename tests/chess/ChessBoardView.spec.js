import { ChessBoard, Columns } from '../../src/chess/ChessBoard'
import { ChessBoardView } from '../../src/chess/ChessBoardView'

describe("ChessBoardView", () => {
    const board = ChessBoard.initialBoard()

    it("canPawnMove one square from initial position should be true", ()=> {
        const view = board.whiteView
        expect(view.canPawnMove(Columns.E, 2, Columns.E, 3)).toBeTruthy()
    })
})