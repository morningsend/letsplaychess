const Datastore = require('nedb')

export class GameRepository {
    constructor() {
        this.games = new Datastore()
    }
    findGameById(gameId, cb) {
        return this.games.findOne({_id: gameId}, cb)
    }
}