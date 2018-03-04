import {
    ChessBoard,
    Columns,
    PlayerColours,
    PieceKinds,
    ChessPiece,
    Move,
    MoveTypes
} from '../../src/chess'

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
        const result = board.isCheckMate(PlayerColours.White)
        expect(result).toBe(true)
    })

    it('should be false if king can take the enemy attacking piece', () => {
        board.placePiece(whiteKing, Columns.H, 1)
        board.placePiece(blackQueen, Columns.G, 1)
        expect(board.pieceAt(Columns.H, 1)).toBeTruthy()
        expect(board.pieceAt(Columns.G, 1)).toBeTruthy()
        const result = board.isCheckMate(PlayerColours.White)

        expect(board.pieceAt(Columns.H, 1)).toBeTruthy()
        expect(board.pieceAt(Columns.G, 1)).toBeTruthy()
        
        expect(result).toBe(false)
    })
})

describe('ChessBoard isMoveValid', () => {
    let board = null

    beforeEach(() => { board = ChessBoard.emptyBoard() })

    it('king cannot move to square being attacked', () => {
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 4})
        )
        board.placePiece(
            new ChessPiece(PlayerColours.Black, PieceKinds.Rook, { column: Columns.D, row: 8})
        )
        const view = board.whiteView
        const king = board.pieceAt(Columns.E, 4)
        const move = new Move(king, MoveTypes.Normal, { column: Columns.D, row: 4})
        expect(king).not.toBeFalsy()
        expect(board.isMoveValid(move)).toBe(false)
    })
})