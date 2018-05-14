import { ChatSignalTypes } from '../../client/realtime/ChatClient'

export class ChatSocketServer {
    constructor(io){
        this.ioChatNameSpace = io.of('/socket')
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
        })
    }
}