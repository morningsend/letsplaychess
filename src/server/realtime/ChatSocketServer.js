import { ChatSignalTypes } from '../../client/realtime/ChatClient'

export class ChatSocketServer {
    constructor(io, userRepository){
        this.ioChatNameSpace = io.of('/chat')
        this.userRepository = userRepository
        this._setup()
    }
    
    _setup() {
        this.ioChatNameSpace.on('connection', function(socket){
            console.log('someone connected')
            socket.emit('hello', {'message': 'You joined the room!'})
            socket.on(ChatSignalTypes.SEND_MESSAGE, (data, ack) => {
                console.log(data)
                socket.broadcast.emit(ChatSignalTypes.NEW_MESSAGE, data)
            })
            socket.on('disconnect', () => {
                console.log('some one disconnected')
            })
        })
    }
}