import { AllPieces, PieceKinds, PlayerColours } from './ChessPieces'
import { ChessBoard } from './ChessBoard'

export class PlayerState {
    constructor() {
        this.states = {
            castled: false,
            castleAllowed: true,
            inCheck: false,
            checkMate: false,
            staleMate: false,
            timeRemaining: 0, //seconds
        }
    }
}

export class ChessEngine {

    constructor() {
        this.chessBoard = ChessBoard.initialBoard()
        this.turn = PlayerColours.White
        this.whitePlayerStates = new PlayerState()
        this.blackPlayerState = new PlayerState()
    }

    makeMove(piece, moveFrom, moveTo) {
        return []
    }

    isMoveValid(piece, moveFrom, moveTo) {
        
    }
}

export default ChessEngine