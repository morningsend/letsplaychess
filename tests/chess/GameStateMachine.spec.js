import {
    GameStateMachine,
    PlayerAction,
    PlayerActions,
    PlayerColours,
    GameOutcome,
    GameStatus,
    Move,
    Columns,
    MoveTypes,
    ChessBoard,
    ChessPiece,
    PieceKinds,
} from '../../src/chess'

describe('GameStateMachine', () => {
    it('Game status should be ready at initialization', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        expect(stateMachine.nextTurn).toBe(PlayerColours.White)
    })

    it('Game outcome should be indeterminate at initialization', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        expect(stateMachine.gameOutcome).toBe(GameOutcome.Indeterminate)
    })

    it('Game status should be ongoing after white player makes a move', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        const pawn = stateMachine.chessEngine.board.pieceAt(Columns.D, 2)
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.D, row: 4 }, null)
        stateMachine.onMove(move)
        expect(stateMachine.gameStatus).toBe(GameStatus.OnGoing)
    })

    it('nextTurn should be PlayerColours.Black after white player makes a move', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        const pawn = stateMachine.chessEngine.board.pieceAt(Columns.D, 2)
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.D, row: 4 }, null)
        stateMachine.onMove(move)
        expect(stateMachine.nextTurn).toBe(PlayerColours.Black)
    })
})

describe('GameStateMachine onMove', () => {
    it('should reject moves of pieces of colour not equal to nextTurn', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        const pawn = stateMachine.chessEngine.board.pieceAt(Columns.D, 7)
        const move = new Move(pawn, MoveTypes.Normal, { column: Columns.D, row: 5 }, null)
        stateMachine.onMove(move)
        expect(stateMachine.nextTurn).toBe(PlayerColours.White)
    })

    it('should end game when a player is checkmate', () => {
        const board = ChessBoard.emptyBoard()
        const stateMachine = GameStateMachine.newGame({ duration: 600, board: board })

        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.King, { column: Columns.E, row: 1 }, false)
        )
        board.placePiece(
            new ChessPiece(PlayerColours.Black, PieceKinds.King, { column: Columns.E, row: 8 }, false)
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Queen, { column: Columns.A, row: 7 }, false)
        )
        board.placePiece(
            new ChessPiece(PlayerColours.White, PieceKinds.Rook, { column: Columns.B, row: 6 }, false)
        )
        expect(board.whiteView.thisPlayerPieces.length).toBe(3)
        expect(board.whiteView.otherPlayerPieces.length).toBe(1)
        expect(stateMachine.nextTurn).toBe(PlayerColours.White)

        const move = new Move(board.pieceAt(Columns.B, 6), MoveTypes.Normal, { column: Columns.B, row: 8}, null)
        stateMachine.onMove(move)
        expect(stateMachine.gameStatus).toBe(GameStatus.End)
        expect(stateMachine.gameOutcome).toBe(GameOutcome.WhiteWin)
    })
})

describe('GameStateMachine onPlayerAction', () => {
    it('should end game when white resigns with outcome black win', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        stateMachine.onPlayerAction(new PlayerAction(PlayerColours.White, PlayerActions.Resign))
        expect(stateMachine.gameStatus).toBe(GameStatus.End)
        expect(stateMachine.gameOutcome).toBe(GameOutcome.BlackWin)
    })

    it('should end game when black resigns with outcome white win', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        stateMachine.onPlayerAction(new PlayerAction(PlayerColours.Black, PlayerActions.Resign))
        expect(stateMachine.gameStatus).toBe(GameStatus.End)
        expect(stateMachine.gameOutcome).toBe(GameOutcome.WhiteWin)
    })

    it('should not end game when white offers draw', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        stateMachine.onPlayerAction(new PlayerAction(PlayerColours.White, PlayerActions.OfferDraw))
        expect(stateMachine.gameStatus).toBe(GameStatus.Ready)
        expect(stateMachine.gameOutcome).toBe(GameOutcome.Indeterminate)
    })

    it('should end game when white offers draw and black accepts it', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        stateMachine.onPlayerAction(new PlayerAction(PlayerColours.White, PlayerActions.OfferDraw))
        stateMachine.onPlayerAction(new PlayerAction(PlayerColours.Black, PlayerActions.AcceptDraw))
        expect(stateMachine.gameStatus).toBe(GameStatus.End)
        expect(stateMachine.gameOutcome).toBe(GameOutcome.Draw)
    })

    it('should end game when black offers draw and white accepts it', () => {
        const stateMachine = GameStateMachine.newGame({ duration: 600 })
        stateMachine.onPlayerAction(new PlayerAction(PlayerColours.Black, PlayerActions.OfferDraw))
        stateMachine.onPlayerAction(new PlayerAction(PlayerColours.White, PlayerActions.AcceptDraw))
        expect(stateMachine.gameStatus).toBe(GameStatus.End)
        expect(stateMachine.gameOutcome).toBe(GameOutcome.Draw)
    })
})