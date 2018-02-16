import { ChessBoard } from '../../src/chess/ChessBoard'
import { Columns } from '../../src/chess/ChessBoardConstants'
import { ChessBoardView } from '../../src/chess/ChessBoardView'
import { ChessPiece, PlayerColours, PieceKinds } from '../../src/chess/ChessPieces'

describe('ChessBoardView canPawnMove', () => {
    const board = ChessBoard.initialBoard()
    it('pawn one square from initial position should be true', ()=> {
        const view = board.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.E, 3)).toBe(true)
    })

    it('pawn move two square from initial position should be true', () => {
        const view = board.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.E, 4)).toBe(true)
    })

    it('pawn cannot move sideways if no piece to capture', () => {
        const view = board.whiteView
        const pawn = board.pieceAt(Columns.E, 2)
        expect(pawn).not.toBeNull()
        expect(view.canPawnMove(pawn, Columns.D, 3)).toBe(false)
    })

    it('pawn cannot move forward if a piece is in front of it', () => {
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
        console.log('piece blocking e3')
        expect(view.canPawnMove(pawn, Columns.E, 3)).toBe(false)
    })

    it('pawn can take move if an enemy piece at correct place', () => {
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

describe('ChessBoardView canKnightMove', () => {
    let board = ChessBoard.emptyBoard()

    it('knight can move L shapes', ()=>{
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 })
        )

        const view = board.whiteView
        const knight = board.pieceAt(Columns.B, 1)
        expect(knight).not.toBeNull()
        expect(view.isEmpty(Columns.C, 3))
        expect(view.canKnightMove(knight, Columns.C, 3)).toBe(true)
    })

    it('knight should not move in any other shapes', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 })
        )
        const view = board.whiteView
        const knight = board.pieceAt(Columns.B, 1)

        expect(knight).not.toBeNull()
        expect(view.canKnightMove(knight, Columns.B, 3)).toBe(false)
        expect(view.canKnightMove(knight, Columns.C, 2)).toBe(false)
    })

    it('knight cannot move to area with friendly piece', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 })
        )

        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.C, row: 3 })
        )
        const view = board.whiteView
        const knight = board.pieceAt(Columns.B, 1)
        expect(knight).not.toBeNull()
        expect(view.isEmpty(Columns.C, 3)).toBe(false)
        expect(view.canKnightMove(knight, Columns.C, 3)).toBe(false)
    })

    it('knight can take an enemy piece', () => {
        console.log('knight can take an enemy piece')
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.B, row: 1 })
        )

        board.placePiece(
            new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.C, row: 3 })
        )
        const view = board.whiteView
        const knight = board.pieceAt(Columns.B, 1)
        expect(knight).not.toBeNull()
        expect(view.isEmpty(Columns.C, 3)).toBe(false)
        expect(view.canAttack(knight, Columns.C, 3)).toBe(true)
        expect(view.canKnightMove(knight, Columns.C, 3)).toBe(true)
    })
})

describe('ChessBoardView canKingMove', () => {
    const board = ChessBoard.emptyBoard()

    it("edge case: king cannot move to same place as it was before", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 4})
        )
        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 4)
        expect(king).not.toBeNull()
        expect(view.canKingMove(king, Columns.E, 4)).toBe(false)
    })
    it('king can move one square in 8 directions', () => {
        console.log('king can move on square in 8 directions')
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 4})
        )
        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 4)
        console.log(king)
        expect(king).not.toBeNull()
        expect(view.canKingMove(king, Columns.E, 5)).toBe(true)
        expect(view.canKingMove(king, Columns.E, 3)).toBe(true)
        expect(view.canKingMove(king, Columns.D, 5)).toBe(true)
        expect(view.canKingMove(king, Columns.D, 4)).toBe(true)
        expect(view.canKingMove(king, Columns.D, 3)).toBe(true)
        expect(view.canKingMove(king, Columns.F, 5)).toBe(true)
        expect(view.canKingMove(king, Columns.F, 4)).toBe(true)
        expect(view.canKingMove(king, Columns.F, 3)).toBe(true)
    })

    it('king cannot move more than one square either horizontally or vertically', () => {
        console.log('king can move on square in 8 directions')
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 4})
        )
        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 4)
        console.log(king)
        expect(king).not.toBeNull()
        expect(view.canKingMove(king, Columns.E, 6)).toBe(false)
        expect(view.canKingMove(king, Columns.B, 4)).toBe(false)
        expect(view.canKingMove(king, Columns.D, 6)).toBe(false)
    })

    it('king cannot move to square being attacked', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 4})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.Black, PieceKinds.Rook, { column: Columns.D, row: 8})
        )
        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 4)
        expect(king).not.toBeNull()
        expect(view.canKingMove(king, Columns.D, 4)).toBe(false)
    })

    it('king can move to take enemy pieces', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 4})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.Black, PieceKinds.Pawn, { column: Columns.E, row: 5})
        )

        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 4)
        expect(king).not.toBeNull()
        expect(view.canAttack(king, Columns.E, 5)).toBe(true)
        expect(view.canKingMove(king, Columns.E, 5)).toBe(true)
    })
})

describe('ChessBoardView canKingCastle', () => {
    let board = ChessBoard.emptyBoard()

    it('king can castle if it has made a move and rook has not made a move, and no piece in between', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 1})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.H, row: 1})
        )

        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 1)
        const rook = board.pieceAt(Columns.H, 1)
        expect(king).not.toBeNull()
        expect(rook).not.toBeNull()
        expect(view.canKingCastle(king, rook, Columns.G, 1)).toBe(true)
    })

    it('king cannot castle to a rook which has made a move', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 1})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.H, row: 1})
        )

        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 1)
        const rook = board.pieceAt(Columns.H, 1)
        rook.firstMoveMade = true
        expect(king).not.toBeNull()
        expect(rook).not.toBeNull()
        expect(view.canKingCastle(king, rook, Columns.G, 1)).toBe(false)
    })
    
    it('king cannot castle to a rook, if king has made a move', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 1})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.H, row: 1})
        )

        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 1)
        const rook = board.pieceAt(Columns.H, 1)
        king.firstMoveMade = true
        expect(king).not.toBeNull()
        expect(rook).not.toBeNull()
        expect(view.canKingCastle(king, rook, Columns.G, 1)).toBe(false)
    })

    it('king cannot castle if there are piece between rook', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 1})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.H, row: 1})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Knight, { column: Columns.G, row: 1})
        )
        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 1)
        const rook = board.pieceAt(Columns.H, 1)
        
        expect(king).not.toBeNull()
        expect(rook).not.toBeNull()
        expect(view.canKingCastle(king, rook, Columns.G, 1)).toBe(false)
    })

    it('king cannot castle if it moves through a square that is being attacked', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 1})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.H, row: 1})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.Black, PieceKinds.Rook, { column: Columns.G, row: 8})
        )

        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 1)
        const rook = board.pieceAt(Columns.H, 1)
        
        expect(king).not.toBeNull()
        expect(rook).not.toBeNull()
        expect(view.canKingCastle(king, rook, Columns.G, 1)).toBe(false)
    })
})

describe('ChessBoardView canRookMove', () => {
    let board = ChessBoard.emptyBoard()

    it("edge case: rook cannot move to same place as it was before", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.E, row: 4})
        )
        const view = board.whiteView
        const rook = board.pieceAt(Columns.E, 4)
        expect(rook).not.toBeNull()
        expect(view.canRookMove(rook, Columns.E, 4)).toBe(false)
    })

    it("rook can move horizontally and vertically", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.E, row: 4})
        )

        const view = board.whiteView
        const rook = board.pieceAt(Columns.E, 4)
        expect(rook).not.toBeNull()
        expect(view.canRookMove(rook, Columns.E, 1)).toBe(true)
        expect(view.canRookMove(rook, Columns.E, 3)).toBe(true)
        expect(view.canRookMove(rook, Columns.E, 8)).toBe(true)
        expect(view.canRookMove(rook, Columns.A, 4)).toBe(true)
        expect(view.canRookMove(rook, Columns.H, 4)).toBe(true)
    })

    it("rook cannot move to any other area except horizontally or vertically", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.E, row: 4})
        )

        const view = board.whiteView
        const rook = board.pieceAt(Columns.E, 4)
        expect(rook).not.toBeNull()
        expect(view.canRookMove(rook, Columns.D, 3)).toBe(false)
    })

    it("rook cannot move to location if there are pieces in between", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.E, row: 4})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.D, row: 4 })
        )
        const view = board.whiteView
        const rook = board.pieceAt(Columns.E, 4)
        expect(rook).not.toBeNull()
        expect(view.canRookMove(rook, Columns.A, 4)).toBe(false)
    })
})

describe('ChessBoardView canBishop', () => {
    let board = null

    beforeEach(() => {
        board = ChessBoard.emptyBoard()
    })
    it("edge case: bishop cannot move to same place as it was before", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Bishop, { column: Columns.E, row: 4 })
        )
        const view = board.whiteView
        const bishop = board.pieceAt(Columns.E, 4)
        expect(bishop).not.toBeNull()
        expect(view.canBishopMove(bishop, Columns.E, 4)).toBe(false)
    })

    it('bishop can move diagonally', () => {
        let bishop1 = new ChessPiece(PlayerColours.White, PieceKinds.Bishop, { column: Columns.A, row: 8})
        board.placePiece(bishop1)
        const view = board.whiteView
        const bishop = board.pieceAt(Columns.A, 8)
        expect(bishop).not.toBeNull()
        expect(view.isEmpty(Columns.C, 6)).toBe(true)
        expect(view.canBishopMove(bishop, Columns.B, 7)).toBe(true)
        expect(view.canBishopMove(bishop, Columns.C, 6)).toBe(true)
        expect(view.canBishopMove(bishop, Columns.D, 5)).toBe(true)
        expect(view.canBishopMove(bishop, Columns.E, 4)).toBe(true)
    })

    it('bishop cannot move to non-diagonal squares', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Bishop, { column: Columns.E, row: 4 })
        )
        const view = board.whiteView
        const bishop = board.pieceAt(Columns.E, 4)
        expect(view.canBishopMove(bishop, Columns.E, 3)).toBe(false)
    })

    it('bishop can not move to location if piece in between', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Bishop, { column: Columns.G, row: 1 })
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Pawn, { column: Columns.F, row: 2 })
        )
        const view = board.whiteView
        const bishop = board.pieceAt(Columns.G, 1)
        expect(view.canBishopMove(bishop, Columns.E, 3)).toBe(false)
    })

})


describe('ChessBoardView canQueenMove', () => {
    const board = ChessBoard.emptyBoard()
    it("edge case: queen cannot move to same place as it was before", () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Queen, { column: Columns.E, row: 4 })
        )
        const view = board.whiteView
        const queen = board.pieceAt(Columns.E, 4)
        expect(queen).not.toBeNull()
        expect(view.canQueenMove(queen, Columns.E, 4)).toBe(false)
    })

    it('queen can move diagonally, horizontally, and vertically', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Queen, { column: Columns.E, row: 4 })
        )

        const view = board.whiteView
        const queen = board.pieceAt(Columns.E, 4)
        expect(queen).not.toBeNull()

        expect(view.canQueenMove(queen, Columns.A, 4)).toBe(true)
        expect(view.canQueenMove(queen, Columns.H, 4)).toBe(true)
        expect(view.canQueenMove(queen, Columns.E, 1)).toBe(true)
        expect(view.canQueenMove(queen, Columns.E, 8)).toBe(true)
        expect(view.canQueenMove(queen, Columns.C, 2)).toBe(true)
        expect(view.canQueenMove(queen, Columns.G, 6)).toBe(true)
        expect(view.canQueenMove(queen, Columns.G, 2)).toBe(true)
        expect(view.canQueenMove(queen, Columns.C, 6)).toBe(true)
    })
})


describe("ChessBoardView canMovePiece", () => {
    const board = ChessBoard.initialBoard()
    it("should return true for valid move of any piece", () => {
        board.placePiece(
            new ChessPiece(
                PlayerColours.White,
                PieceKinds.Pawn,
                { column: Columns.E, row: 2 })
        )

        const pawn = board.pieceAt(Columns.E, 2)
        const view = board.whiteView
        expect(pawn).not.toBeNull()
        expect(view.canMovePiece(pawn, Columns.E, 3))
    })
})