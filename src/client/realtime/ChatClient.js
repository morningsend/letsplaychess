import io from 'socket.io-client'
import { config } from '../config'

export const ChatSignalTypes = {
    JOIN_ROOM : 'JOIN_ROOM',
    LEAVE_ROOM: 'LEAVE_ROOM',
    NEW_MESSAGE: 'NEW_MESSAGE',
    SEND_MESSAGE: 'SEND_MESSAGE',
    BATCH_RECEIVE: 'BATCH_RECEIVE',
}

export function createSendMessageSignal(userId, gameId, message) {
    return {
        type: ChatSignalTypes.SEND_MESSAGE,
        userId,
        gameId,
        message
    }
}

export function createJoinRoomSignal(userId, roomId) {
    return {
        type: ChatSignalTypes.JOIN_ROOM,
        userId,
        gameId,
        message
    }
}

export function createLeaveRoomSignal(userId, roomId) {
    return {
        type: ChatSignalTypes.LEAVE_ROOM,
        userId,
        gameId,
        message
    }
}

export class ChatClient {
    constructor(socket, userId, username, gameId) {
        this.userId = userId
        this.username = username
        this.gameId = gameId
        this.newMessageHandlers = []
        this.batchReceiveHandlers = []
        this.messageBuffer = []
        this.socket = socket
        this.setupSocket(this.socket)
        this._notifyNewMessage = this._notifyNewMessage.bind(this)
    }
    
    onNewMessage(handler) {
        if(handler)
            this.newMessageHandlers.push(handler)
    }
    removeNewMessage(handler) {
        if(handler) {
            this.newMessageHandlers = this.newMessageHandlers.filter(h => h !== handler)
        }
    }
    onBatchReceiveMessage(handler) {
        if(handler) {
            this.batchReceiveHandlers.push(handler)
        }
    }
    _notifyNewMessage(data) {
        for(let i = 0; i < this.newMessageHandlers.length; i++) {
            try{
                this.newMessageHandlers[i](data.message)
            } catch(error){
                console.log(error)
            }
        }
    }
    _notifyReceivedMessageBatch(data) {
        for(let i = 0; i < this.newMessageHandlers.length; i++) {
            try{
                this.batchReceiveHandlers[i](data)
            } catch(error){
                console.log(error)
            }
        }
    }
    setupSocket(socket) {
        socket.on('connection', () => {
            console.log('connected to chat socket')
        })
        socket.on('hello', (data) => {
            console.log(data)
        })
        socket.on(ChatSignalTypes.NEW_MESSAGE, (data) => {
            console.log('got new message')
            this._notifyNewMessage(data)
        })
    }
    send(message, callback) {
        console.log('chat client sending messsage')
        console.log(message)
        if(!message) {
            return
        }
        try {
            if(this.socket.connected) {
                this.socket.emit(ChatSignalTypes.SEND_MESSAGE, createSendMessageSignal(
                        this.userId,
                        this.gameId,
                        message
                    ),
                    callback
                )
            } else {
                console.log('socket is not connected')
                this.messageBuffer.push(message)
            }
        } catch(error) {
            console.error(error)
        }
    }
}

export default ChatClient
