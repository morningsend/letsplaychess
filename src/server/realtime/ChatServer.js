export class Room {
    constructor() {

    }
}
export class ChatServer {
    constructor(io){
        this.rooms = []
        this.ioNameSpace = io
        this._setup()
    }
    
    _setup() {
        this.ioNameSpace.on('connect', function(socket){
            console.log('someone connected')
        })
    }
    createRoom(roomId) {
        
    }
    
    removeRoom(roomId) {

    }
}