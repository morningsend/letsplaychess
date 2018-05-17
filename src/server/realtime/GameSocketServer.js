export class GameSocketServer {
    constructor(io, matchRepository) {
        this.io = io.of('/game')
        this.matchRepository = matchRepository
        this.currenMatches = {}
        this.playerSockets = {}
        this.idleSockets = {}

        this.setupPlayerSocket = this.setupPlayerSocket.bind(this)
        this.io.on('connection', (socket) => {
            this.idleSockets[socket.id] = socket
            this.setupPlayerSocket(socket)
        })
    }
    setupPlayerSocket(socket) {
        socket.on('connection', (socket) => {

        })
    }

    createMatch(matchId, joinToken, whitePlayerId, blackPlayerId) {
        if(this.currenMatches[matchId]) {
            return
        } else {
            this.currenMatches[matchId] = {
                joinToken,
                whitePlayerId,
                blackPlayerId,
                whitePlayerJoined: false,
                blackPlayerJoined: false,
            }
        }
    }

    joinPlayerToMatch(socket, matchId, playerId, joinToken) {
        
    }
}