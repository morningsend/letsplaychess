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
    constructor(userId, username, gameId) {
        this.userId = userId
        this.username = username
        this.gameId = gameId
        this.socket = null,
        this.newMessageHandlers = []
        this.batchReceiveHandlers = []
        this.messageBuffer = []
    }
    connect() {

    }
    joinRoom() {
        
    }
    onNewMessage(handler) {
        if(handler)
            this.newMessageHandlers.push(handler)
    }
    onBatchReceiveMessage(handler) {
        if(handler) {
            this.batchReceiveHandlers.push(handler)
        }
    }
    _notifyNewMessage(data) {
        for(let i = 0; i < this.newMessageHandlers.length; i++) {
            try{
                this.newMessageHandlers[i](data)
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
        socket.on('hello', (data) => {
            console.log(data)
        })
        socket.on(ChatSignalTypes.NEW_MESSAGE, (data) => {
            this._notifyNewMessage(data)
        })
    }
    send(message, callback) {
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
                this.messageBuffer.push(message)
            }
        } catch(error) {
            console.error(error)
        }
    }
}

export default ChatClient
