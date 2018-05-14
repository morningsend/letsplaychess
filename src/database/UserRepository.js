const Datastore = require('nedb')

class UserRepository {
    constructor() {
        // for testing purposes
        this.users = new Datastore()
    }

    findUserById(userId, cb) {
        return this.users.findOne({_id: userId}, cb)
    }
}