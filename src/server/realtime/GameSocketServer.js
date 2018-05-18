import { GameSignalTypes } from '../../client/realtime'
export class GameSocketServer {
    constructor(io, matchRepository) {
        this.io = io.of('/game')
        this.matchRepository = matchRepository
        this.currenMatches = {}
        this.playerSockets = {}
        this.idleSockets = {}

        this.setupPlayerSocket = this.setupPlayerSocket.bind(this)
        this.io.on('connection', (socket) => {
            console.log('player joined games server.')
            this.idleSockets[socket.id] = socket
            this.setupPlayerSocket(socket)
        })
    }
    setupPlayerSocket(socket) {
        const self = this

        socket.on('connect', () => {

        })
        socket.on('disconnect', () =>{
            if(self.idleSockets) {
                delete self.idleSockets[socket.id]
            }
        })
        socket.on(
            GameSignalTypes.PLAYER_JOIN_GAME,
            (data, ack) => {
                const { matchId, userId, joinToken } = data
                console.log(data)
                self.matchRepository.findMatchById(matchId)
                    .then(match => {
                        /*
                        if(match.joinToken === joinToken && (
                            userId === match.whitePlayerId || userId === match.blackPlayerId
                        ))
                        */
                        {
                            socket.matchId = matchId
                            socket.userId = userId
                            socket.emit(GameSignalTypes.PLAYER_JOINED_GAME)
                            socket.join(matchId)
                            console.log('player ' + userId + ' joins match ' + matchId)
                            if(!self.currenMatches[matchId]) {
                                self.currenMatches[matchId] = {
                                    playersJoined: new Set()
                                }
                            }
                            self.currenMatches[matchId].playersJoined.add(userId)
                        }
                    })
                    .then(() => {
                        if(self.currenMatches[matchId].playersJoined.size >= 2) {
                            self.io
                                .to(matchId)
                                .emit(GameSignalTypes.PLAYERS_READY, {
                                    timestamp: Date.now(),
                                })
                        }
                    })
                    .catch(error => {
                        socket.emit(GameSignalTypes.JOIN_GAME_FAILED)
                    })
            }
        )


        socket.on(
            GameSignalTypes.PLAYER_MAKE_MOVE,
            (data) => {
                console.log(data)
                if(!socket.matchId) {
                    return
                }
                socket.broadcast.emit(GameSignalTypes.OPPONENT_MAKE_MOVE, data)
            }
        )

        socket.on(
            GameSignalTypes.PLAYER_OFFER_DRAW,
            (data) => {
                if(!socket.matchId) {
                    return
                }
                socket.broadcast.emit(GameSignalTypes.OPPONENT_OFFER_DRAW, data)
            }
        )

        socket.on(
            GameSignalTypes.PLAYER_RESIGN,
            (data) => {
                if(!socket.matchId) {
                    return
                }

                socket.broadcast.emit(GameSignalTypes.OPPONENT_RESIGN)
            }
        )
        socket.on(
            GameSignalTypes.PLAYER_ACCEPT_DRAW,
            (data) => {
                if(!socket.matchId) {
                    return
                }
                
                socket.broadcast.emit(GameSignalTypes.OPPONENT_ACCEPT_DRAW)
            }
        )
    }

    joinPlayerToMatch(socket, matchId, playerId, joinToken) {

    }
}