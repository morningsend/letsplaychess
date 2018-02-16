import { ChessEngine, Columns, PlayerColours } from '../../src/chess'

describe("ChessEngine isMoveValid", () => {

    let engine = new ChessEngine()

    it("should return true if a move is valid, pawn", () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(pawn.colour).toBe(PlayerColours.White)
        expect(engine.board.whiteView.isEmpty(Columns.E, 3))
        expect(engine.board.whiteView.canMovePiece(pawn, Columns.E, 3))
        expect(engine.isMoveValid(pawn, Columns.E, 3)).toBeTruthy()
        expect(engine.isMoveValid(pawn, Columns.E, 4)).toBeTruthy()
    })
})

describe("ChessEngine makeMove", () => {
    let engine = new ChessEngine()

    it("should return true if a move is valid", () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(engine.isMoveValid(pawn, Columns.E, 3)).toBeTruthy()
        expect(engine.makeMove(pawn, Columns.E, 3)).toBeTruthy()
    })

})