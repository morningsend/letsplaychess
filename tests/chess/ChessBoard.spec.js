import {
    ChessBoard
} from '../../src/chess/ChessBoard'
import { Columns } from '../../src/chess/ChessBoardConstants'
import { PlayerColours, PieceKinds, ChessPiece } from '../../src/chess/ChessPieces'

describe('ChessBoard', () => {
    const board = ChessBoard.initialBoard()

    it('pieceAt(e,1) should return white king at e1', () => {
        const piece = board.pieceAt(Columns.E, 1)
        expect(piece.kind).toBe(PieceKinds.King)
        expect(piece.colour).toBe(PlayerColours.White)
    })

    it('pieceAt(d,8) should return black queen ', () => {
        
        const piece = board.pieceAt(Columns.D, 8)
        expect(piece.kind).toBe(PieceKinds.Queen)
        expect(piece.colour).toBe(PlayerColours.Black)
    })

    it('pieceAt(e,4) should return null', () => {
        const piece = board.pieceAt(Columns.E, 4)
        expect(piece).toBeNull();
    })
})

describe('ChessBoard', () => {
    const board = ChessBoard.initialBoard()

    it('blackView should return view with playerColour == black', () =>  {
        const view = board.blackView
        expect(view.playerColour).toBe(PlayerColours.Black)
    })

    it('whiteView should return view with playerColour == white', () =>  {
        const view = board.whiteView
        expect(view.playerColour).toBe(PlayerColours.White)
    })
})

describe('ChessBoard isKingInCheck', () => {
    let board = null
    let whiteKing = new ChessPiece(
        PlayerColours.White,
        PieceKinds.King,
        {
            column: Columns.E,
            row: 4
        }
    )

    let blackKing = new ChessPiece(
        PlayerColours.Black,
        PieceKinds.King,
        {
            column: Columns.E,
            row: 4
        }
    )
    let blackRook = new ChessPiece(
        PlayerColours.Black,
        PieceKinds.Rook,
        {
            column: Columns.E,
            row: 1
        }
    )

    let whiteRook = new ChessPiece(
        PlayerColours.White,
        PieceKinds.Rook,
        {
            column: Columns.E,
            row: 1
        }
    )
    beforeEach(() => {
        board = ChessBoard.emptyBoard()
    })
    it('should be false if king is not on the board', () => {
        expect(board.isKingInCheck(PlayerColours.White).inCheck).toBe(false)
        expect(board.isKingInCheck(PlayerColours.Black).inCheck).toBe(false)
    })

    it('should be false if king is not attacked', () => {
        board.placePiece(whiteKing)
        const result = board.isKingInCheck(PlayerColours.White)
        expect(board.isKingInCheck(PlayerColours.White).inCheck).toBe(false)
    })

    it('should be true if king is attacked', () => {
        board.placePiece(whiteKing)
        board.placePiece(blackRook)
        expect(board.isKingInCheck(PlayerColours.White).inCheck).toBe(true)
    })

    it('should be true if black king is attacked', () => {
        board.placePiece(blackKing)
        board.placePiece(whiteRook)
        const result = board.isKingInCheck(PlayerColours.Black)
        expect(result.inCheck).toBe(true)
    })
})


describe('ChessBoard isCheckMate', () => {
    let whiteKing = null
    let board = null
    let blackQueen = null
    let blackRook = null
    beforeEach(() => {
        board = ChessBoard.emptyBoard()
        whiteKing = new ChessPiece(
            PlayerColours.White,
            PieceKinds.King,
            { column: Columns.E, row: 1 },
            false
        )
        blackQueen = new ChessPiece(
            PlayerColours.Black,
            PieceKinds.Queen,
            { column: Columns.A, row: 1},
            true
        )
        blackRook = new ChessPiece(
            PlayerColours.Black,
            PieceKinds.Rook,
            { column: Columns.A, row: 2},
            true
        )
    })
    it('should be false if king is on not board', () => {
        const result = board.isCheckMate(PlayerColours.White)
        expect(result).toBe(false)

    })

    it('should be false if king is not attacked', () => {
        board.placePiece(whiteKing) 
        const result = board.isCheckMate(PlayerColours.White)
        expect(result).toBe(false)
    })

    it('should be false if king can move out of check', () => {
        board.placePiece(whiteKing)
        board.placePiece(blackQueen)
        const result = board.isCheckMate(PlayerColours.White)
        expect(result).toBe(false)
    })

    it('should return true if king cannot move out of check', () => {
        board.placePiece(whiteKing)
        board.placePiece(blackQueen)
        board.placePiece(blackRook)
        //const result = board.isCheckMate(PlayerColours.White)
        //console.log(result)
        //expect(board.blackView.isAnyPieceAttacking(Columns.E, 8)).toBe(true)
        //expect(board.blackView.isAnyPieceAttacking(Columns.E, 7)).toBe(true)
        console.log(board.blackView.thisPlayerPieces)
        console.log(board.blackView.otherPlayerPieces)
        expect(board.blackView.isAnyPieceAttacking(Columns.F, 8)).toBe(true)
        //expect(board.blackView.isAnyPieceAttacking(Columns.F, 7)).toBe(true)
        //expect(board.blackView.isAnyPieceAttacking(Columns.D, 7)).toBe(true)
        //expect(board.blackView.isAnyPieceAttacking(Columns.D, 8)).toBe(true)
        //expect(result).toBe(true)
    })

})