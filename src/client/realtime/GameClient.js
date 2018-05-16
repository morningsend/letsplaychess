export const GameSignalTypes = {
    PLAYER_JOINED: 'PLAYER_JOINED',
    PLAYER_DISCONNECTED: 'PLAYER_DISCONNECTED',
    PLAYRE_DISCONNECT_TIMEOUT: 'PLAYRE_DISCONNECT_TIMEOUT',
    PLAYER_MADE_MOVE: 'PLAYER_MADE_MOVE',
    PLAYER_OFFER_DRAW: 'PLAYER_OFFER_DRAW',
    PLAYER_ACCEPT_DRAW: 'PLAYER_ACCEPT_DRAW',
    PLAYER_RESIGN: 'PLAYER_RESIGN',
}

export class GameClient {

    constructor(socket) {
        this.socket = socket
    }

    joinGame(userId, gameId) {

    }

    onOpponentDisconnect(callback) {

    }
    
}