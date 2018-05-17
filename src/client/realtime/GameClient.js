import { GameStateMachine} from '../../chess'
export const GameSignalTypes = {
    PLAYER_JOIN_GAME: 'PLAYER_JOIN_GAME',
    PLAYER_JOINED_GAME: 'PLAYER_JOINED_GAME',
    JOIN_GAME_FAILED: 'JOIN_GAME_FAILED',
    
    PLAYERS_READY: 'PLAYERS_READY',

    OPPONENT_JOINED: 'PLAYER_JOINED',
    
    OPPONENT_DISCONNECTED: 'PLAYER_DISCONNECTED',
    OPPONENT_DISCONNECT_TIMEOUT: 'PLAYRE_DISCONNECT_TIMEOUT',
    
    OPPONENT_MAKE_MOVE: 'PLAYER_MAKE_MOVE',
    PLAYER_MAKE_MOVE: 'PLAYER_MAKE_MOVE',

    OPPONENT_RESIGN: 'OPPONENT_RESIGN',
    PLAYER_RESIGN: 'PLAYER_RESIGN',

    OPPONENT_ACK_MOVE: 'OPPONENT_ACK_MOVE',
    PLAYER_ACK_MOVE: 'PLAYER_ACK_MOVE',

    OPPONENT_OFFER_DRAW: 'OPPONENT_OFFER_DRAW',
    PLAYER_OFFER_DRAW: 'PLAYER_OFFER_DRAW',

    PLAYER_ACCEPT_DRAW: 'PLAYER_ACCEPT_DRAW',
    OPPONENT_ACCEPT_DRAW: 'OPPONENT_ACCEPT_DRAW',
}

export class GameClient {

    constructor(socket) {
        this.socket = socket
        this._gameStateMachine = null

        this._matchId = null
        this._matchJoinToken = null
        this._opponentId = null
        this._userId = null
        this.onPlayersReadyCallback = () => {}
        this.joinedGame = false
    }

    reset(matchId, joinToken, opponentId) {
        this.joinedGame = false
        this._gameStateMachine = GameStateMachine.newGame()
        this._matchId = null
        this._matchJoinToken = null
        this._opponentId = null
        ths._userId = null
    }

    joinGame(matchId, joinToken, userId, opponentId) {
        this._userId = userId
        this._matchId = matchId
        this._opponentId = opponentId
        this._matchJoinToken = joinToken
        
        this.socket.emit(GameSignalTypes.PLAYER_JOIN_GAME, {
            userId,
            matchId,
            joinToken,
        })
    }

    onPlayersReady(callback) {
        this.onPlayersReadyCallback = callback
    }

    onOpponentDisconnect(callback) {
        this.onOpponentDisconnectCallback = callback
    }
    onOpponentOfferDraw(callback) {

    }
    onOfferDraw() {
        this.socket.emit(
            GameSignalTypes.PLAYER_OFFER_DRAW,
            {
                userId: this._userId,
            }
        )
    }
    acceptDraw() {
        this.socket.emit(
            GameSignalTypes.PLAYER_ACCEPT_DRAW,
            {
                userId: this._userId,
            }
        )
    }
    onResign() {
        this.socket.emit(
            GameSignalTypes.PLAYER_RESIGN,
            {
                userId: this._userId,
            }
        )
    }

    resign() {
        this.socket.emit(
            GameSignalTypes.PLAYER_RESIGN,
            {
                userId: this._userId,
            },
        )
    }
}