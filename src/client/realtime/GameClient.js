import { GameStateMachine, GameStatus} from '../../chess'
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
        console.log('creating game client')
        this.socket = socket
        this._gameStateMachine = null

        this._matchId = null
        this._matchJoinToken = null
        this._opponentId = null
        this._userId = null
        
        this.joinedGame = false

        this.setupSocket = this.setupSocket.bind(this)

        this.setupSocket(socket)

        this.onPlayersReadyCallback = null
        this.onOpponentMakeMoveCallback = null
        this.onOpponentResignCallback = null
        this.onOpponentAckMoveCallback = null
        this.onOpponentAckMoveCallback = null
    }

    setupSocket(socket) {
        const self = this
        socket.on(GameSignalTypes.PLAYERS_READY, () => {
            console.log('aall players ready, begin game')
            self.onPlayersReadyCallback && self.onPlayersReadyCallback()
        })
        socket.on(GameSignalTypes.OPPONENT_MAKE_MOVE, (data) => {
            console.log('opponent made move:', data)
            self.onOpponentMakeMoveCallback && self.onOpponentMakeMoveCallback(data.from, data.to)
        })

        socket.on(GameSignalTypes.OPPONENT_RESIGN, () => {
            self.onOpponentResignCallback &&
            self.onOpponentResignCallback()
        })
        socket.on(GameSignalTypes.OPPONENT_ACK_MOVE, () => {
            self.onOpponentAckMoveCallback &&
            self.onOpponentAckMoveCallback()
        })
        socket.on(GameSignalTypes.OPPONENT_OFFER_DRAW, () => {
            self.onOpponentOfferDrawCallback &&
            self.onOpponentOfferDrawCallback()            
        })
        socket.on(GameSignalTypes.OPPONENT_ACCEPT_DRAW, () => {
            self.onOpponentAcceptDrawCallback &&
            self.onOpponentAcceptDrawCallback()
        })
    }

    reset(matchId, joinToken, opponentId) {
        this.joinedGame = false
        this._gameStateMachine = GameStateMachine.newGame()
        this._matchId = null
        this._matchJoinToken = null
        this._opponentId = null
        this._userId = null
    }

    joinGame(userId, matchId, joinToken) {
        this._userId = userId
        this._matchId = matchId
        this._matchJoinToken = joinToken
        this.joinedGame = true
        console.log('joining game')
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
        this.onOpponentOfferDrawCallback = callback
    }
    onOpponentResign(callback) {
        this.onOpponentResignCallback = callback
    }
    onOpponentMakeMove(callback) {
        this.onOpponentMakeMoveCallback = callback
    }

    offerDraw() {
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
    resign() {
        this.socket.emit(
            GameSignalTypes.PLAYER_RESIGN,
            {
                userId: this._userId,
            },
        )
    }

    makeMove(from, to) {
        
        if(this.joinedGame && 
            this._gameStateMachine &&
            this._gameStateMachine.gameStatus !== GameStatus.End) {
                console.log('game client sending move')
                this.socket.emit(GameSignalTypes.PLAYER_MAKE_MOVE, {
                    from,
                    to,
                })
        }
    }
    onResign() {
        this.socket.emit(
            GameSignalTypes.PLAYER_RESIGN,
            {
                userId: this._userId,
            }
        )
    }



    cleanUpCallbacks() {

    }
}