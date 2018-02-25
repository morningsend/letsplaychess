import {
    ChessEngine,
    Columns,
    PlayerColours,
    Move,
    MoveTypes,
    PieceKinds
} from '../../src/chess'

describe('ChessEngine isMoveValid', () => {

    let engine = new ChessEngine()

    it('should return true if a move is valid, white pawn', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row: 3 })
        expect(pawn.colour).toBe(PlayerColours.White)
        expect(engine.board.whiteView.isEmpty(Columns.E, 3))
        expect(engine.board.whiteView.canMovePiece(move))
        expect(engine.isMoveValid(move)).toBeTruthy()
        expect(engine.isMoveValid(move)).toBeTruthy()
    })

    it('should be return true if move is valid, black pawn', () => {
        const pawn = engine.board.pieceAt(Columns.E, 7)
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row:6 })
        expect(pawn).not.toBeFalsy()
        expect(pawn.colour).toBe(PlayerColours.Black)
        expect(engine.board.blackView.isEmpty(Columns.E, 3))
        expect(engine.isMoveValid(move)).toBe(true)
        move.to.row = 5
        expect(engine.isMoveValid(move)).toBe(true)
    })
})

describe('ChessEngine makeMove', () => {
    let engine = null
    beforeEach(() => { engine = new ChessEngine() })

    it('should return true if a move is valid', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row: 3})
        expect(pawn).not.toBeFalsy()
        expect(engine.isMoveValid(move)).toBe(true)
        expect(engine.makeMove(move)).toBe(true)
    })

    it('should place piece at the position moved to', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).toBeTruthy()
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row: 3})
        expect(engine.makeMove(move)).toBe(true)
        const movedPawn = engine.board.pieceAt(Columns.E, 3)
        expect(movedPawn).toBeTruthy()
        expect(movedPawn.kind).toBe(PieceKinds.Pawn)
    })

    it('should place piece at the position moved to on chessBoard', () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row: 3})
        expect(engine.isMoveValid(move)).toBe(true)
        expect(engine.makeMove(move)).toBe(true)
        const pawnNewPosition = engine.board.pieceAt(Columns.E, 3)
        expect(pawn).not.toBeFalsy()
    })

    it('should place black piece at the position moved to', () => {
        let pawn = engine.board.pieceAt(Columns.E, 7)
        expect(pawn).not.toBeFalsy()
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row: 6 })
        expect(engine.makeMove(move)).toBe(true)
        pawn = engine.board.pieceAt(Columns.E, 6)
        expect(pawn.position.column).toBe(Columns.E)
        expect(pawn.position.row).toBe(6)
    })

    it('piece last position should be empty' , () => {
        const pawn = engine.board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeFalsy()
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row: 3 })
        expect(engine.makeMove(move)).toBe(true)
        expect(engine.board.whiteView.isEmpty(Columns.E, 2)).toBe(true)
    })

    it('black piece last position should be empty' , () => {
        const pawn = engine.board.pieceAt(Columns.E, 7)
        expect(pawn).not.toBeFalsy()
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.E, row: 6})
        expect(engine.makeMove(move)).toBe(true)
        expect(engine.board.blackView.isEmpty(Columns.E, 2)).toBe(true)
    })
})