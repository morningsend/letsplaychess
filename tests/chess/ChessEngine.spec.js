import { ChessEngine, Columns, PlayerColours } from '../../src/chess'

describe('ChessEngine isMoveValid', () => {

    let engine = new ChessEngine()

    it('should return true if a move is valid, white pawn', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        expect(pawn.colour).toBe(PlayerColours.White)
        expect(engine.board.whiteView.isEmpty(Columns.E, 3))
        expect(engine.board.whiteView.canMovePiece(pawn, Columns.E, 3))
        expect(engine.isMoveValid(pawn, Columns.E, 3)).toBeTruthy()
        expect(engine.isMoveValid(pawn, Columns.E, 4)).toBeTruthy()
    })

    it('should be return true if move is valid, black pawn', () => {
        const pawn = engine.board.pieceAt(Columns.E, 7)
        expect(pawn).not.toBeFalsy()
        expect(pawn.colour).toBe(PlayerColours.Black)
        expect(engine.board.blackView.isEmpty(Columns.E, 3))
        expect(engine.isMoveValid(pawn, Columns.E, 6)).toBe(true)
        expect(engine.isMoveValid(pawn, Columns.E, 5)).toBe(true)
    })
})

describe('ChessEngine makeMove', () => {
    let engine = null
    beforeEach(() => { engine = new ChessEngine() })

    it('should return true if a move is valid', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        expect(engine.isMoveValid(pawn, Columns.E, 3)).toBe(true)
        expect(engine.makeMove(pawn, Columns.E, 3)).toBe(true)
    })

    it('should place piece at the position moved to', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        expect(engine.isMoveValid(pawn, Columns.E, 3))
        engine.makeMove(pawn, Columns.E, 3)
        expect(pawn.position.column).toBe(Columns.E)
        expect(pawn.position.row).toBe(3)
    })

    it('should place piece at the position moved to on chessBoard', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        expect(engine.isMoveValid(pawn, Columns.E, 3))
        engine.makeMove(pawn, Columns.E, 3)
        const pawnNewPosition = engine.board.pieceAt(Columns.E, 3)
        expect(pawn).not.toBeFalsy()
    })

    it('should place black piece at the position moved to', () => {
        const pawn = engine.board.pieceAt(Columns.E, 7)
        expect(pawn).not.toBeFalsy()
        expect(engine.makeMove(pawn, Columns.E, 6)).toBe(true)
        expect(pawn.position.column).toBe(Columns.E)
        expect(pawn.position.row).toBe(6)
    })

    it('piece last position should be empty' , () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        expect(engine.makeMove(pawn, Columns.E, 3))
        expect(engine.board.whiteView.isEmpty(Columns.E, 2))
    })

    it('black piece last position should be empty' , () => {
        const pawn = engine.board.pieceAt(Columns.E, 7)
        expect(pawn).not.toBeFalsy()
        expect(engine.makeMove(pawn, Columns.E, 6))
        expect(engine.board.blackView.isEmpty(Columns.E, 2))
    })
})