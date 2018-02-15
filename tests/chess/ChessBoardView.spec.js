import { ChessBoard } from '../../src/chess/ChessBoard'
import { Columns } from '../../src/chess/ChessBoardConstants'
import { ChessBoardView } from '../../src/chess/ChessBoardView'
import { ChessPiece, PlayerColours, PieceKinds } from '../../src/chess/ChessPieces'

describe("ChessBoardView canPawnMove", () => {
    const board = ChessBoard.initialBoard()
    it("pawn one square from initial position should be true", ()=> {
        const view = board.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.E, 3)).toBeTruthy()
    })

    it("pawn move two square from initial position should be true", () => {
        const view = board.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.E, 4)).toBeTruthy()
    })

    it("pawn cannot move sideways if no piece to capture", () => {
        const view = board.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.D, 3)).toBeFalsy()
    })

    it("pawn cannot move forward if a piece is in front of it", () => {
        const emptyBoard = ChessBoard.emptyBoard()
        emptyBoard.placePiece(
            new ChessPiece(
                PlayerColours.White,
                PieceKinds.Pawn,
                { column: Columns.E, row: 2 }
            )
        )

        emptyBoard.placePiece(
            new ChessPiece(
                PlayerColours.White,
                PieceKinds.Bishop,
                { column: Columns.E, row: 3}
            )
        )

        const view = emptyBoard.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        console.log("piece blocking e3")
        expect(view.canPawnMove(pawn, Columns.E, 3)).toBeFalsy()
    })

    it("pawn can take move if an enemy piece at correct place", () => {
        const emptyBoard = ChessBoard.emptyBoard()
        emptyBoard.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.E, row: 4})
        )
        emptyBoard.placePiece(
            new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.D, row: 5})
        )

        const view = emptyBoard.whiteView
        const pawn = emptyBoard.pieceAt(Columns.E, 4)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.D, 5))
    })
})

describe("ChessBoardView canKnightMove", () => {
    let board = ChessBoard.emptyBoard()

    it("knight can move L shapes", ()=>{
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 })
        )

        const view = board.whiteView
        const knight = board.pieceAt(Columns.B, 1)
        expect(knight).not.toBeNull()
        expect(view.canKnightMove(knight, Columns.C, 3)).toBeTruthy()
    })

    it("knight should not move in any other shapes", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 })
        )
        const view = board.whiteView
        const knight = board.pieceAt(Columns.B, 1)

        expect(knight).not.toBeNull()
        expect(view.canKnightMove(knight, Columns.B, 3)).toBeFalsy()
        expect(view.canKnightMove(knight, Columns.C, 2)).toBeFalsy()
    })

    it("knight cannot move to area with friendly piece", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 })
        )

        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.C, row: 3 })
        )
        const view = board.whiteView
        const knight = board.pieceAt(Columns.B, 1)
        expect(knight).not.toBeNull()
        expect(view.isEmpty(Columns.C, 3)).toBeFalsy()
        expect(view.canKnightMove(knight, Columns.C, 3)).toBeFalsy()
    })
})

describe("ChessBoardView canKingMove", () => {

})

describe("ChessBoardView canRookMove", () => {

})

describe("ChessBoardView canQueenMove", () => {

})

describe("ChessBoardView canBishop", () => {

})

