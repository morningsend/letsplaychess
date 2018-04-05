import { ChatSignalTypes } from '../../client/realtime/ChatClient'
export class Room {
    constructor() {

    }
}
export class ChatServer {
    constructor(io){
        this.rooms = []
        this.ioChatNameSpace = io.of('/chat')
        this._setup()
    }
    
    _setup() {
        this.ioChatNameSpace.on('connection', function(socket){
            console.log('someone connected')
            socket.emit('hello', {'message': 'You joined the room!'})
            socket.on(ChatSignalTypes.SEND_MESSAGE, (data, ack) => {
                socket.broadcast.emit(ChatSignalTypes.NEW_MESSAGE, data)
            })
        })
    }
    createRoom(roomId) {
        
    }
    
    removeRoom(roomId) {

    }
}