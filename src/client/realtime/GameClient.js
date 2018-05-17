import { GameStateMachine} from '../../chess'
export const GameSignalTypes = {
    PLAYER_JOIN_GAME: 'PLAYER_JOIN_GAME',
    PLAYRE_JOINED_GAME: 'PLAYER_JOINED_GAME',

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
        this.match = {}
    }

    reset(match) {
        this._gameStateMachine = GameStateMachine.newGame()
        this.match = match
    }

    joinGame(userId, matchId, joinToken) {
        this.socket.emit(GameSignalTypes.PLAYER_JOIN_GAME, {
            userId,
            matchId,
            joinToken,
        })
    }

    onPlayersReady(callback) {

    }

    onOpponentDisconnect(callback) {

    }
    onOfferDraw(callback) {

    }
    acceptDraw() {

    }
    onResign() {

    }

    resign(userId) {
        this.socket.emit(
            GameSignalTypes.PLAYER_RESIGN,
            { userId },
        )
    }
}