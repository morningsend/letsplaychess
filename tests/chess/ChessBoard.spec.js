import {
    ChessBoard,
    pawnValidMoves,
    kingValidMoves,
    knightValidMoves,
    queenValidMoves,
    bishopValidMoves,
    rookValidMoves,
} from '../../src/chess/ChessBoard'
import { Columns } from '../../src/chess/ChessBoardConstants'
import { PlayerColours, PieceKinds } from '../../src/chess/ChessPieces'

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

describe('pawnValidMoves', ()=>{

    test('pawn can move one or two squares from starting position', () =>{
        const board = ChessBoard.initialBoard()
        const moves = pawnValidMoves(board, PlayerColours, Columns.E, 2)
        expect(moves.length).toBe(2)
    })
})
