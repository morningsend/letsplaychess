const Datastore = require('nedb')

/**
 * User Schema
 *
 * {
 *      _id: string
 *      username: string,
 *      passwordHash: string,
 *      email: string,
 *      isGuest: boolean,
 *      playerProfile: {
 *          ranking: int,
 *          gamesPlayed: int,
 *          username: string,
 *          email: string,
 *      }
 *      matchHistory: Array {
 *          {
 *              timestamp: long,
 *              opponent: {
 *                  _id: string,
 *                  username: string,
 *                  email: string,
 *
 *              }
 *          }
 *      }
 * }
 */
const DEFAULT_USER  = {
    username: 'default_user',
    email: 'default_user@example.com',
    ranking: 1200,
    summary: {
        gamesPlayed: 0,
        win: 0,
        loss: 0,
        draw: 0,
    },
    profile: {
        avatarUrl: '/asset/images/male.png',
        avatar: 'jonsnow'
    },
}
export class UserRepository {
    constructor() {
        // for testing purposes
        this.users = new Datastore()
        this.users.ensureIndex({
            fieldName: 'username',
            unique: true,
        })

        this.users.ensureIndex({
            fieldName: 'email',
            unique: true,
        })
    }

    findUserById(userId) {
        return new Promise( (resolve, reject) => {
            this.users.findOne({_id: userId}, (error, user) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(user)
                }
            })
        })
    }
    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            if(!email) {
                reject({error: 'email cannot be null'})
            }
            this.users.findOne({email: email}, (error, user) =>{
                if(error) {
                    reject(error)
                } else {
                    resolve(user)
                }
            })
        })
    }

    findUserByUserName(username) {
        return new Promise((resolve, reject) => {
            if(!username) {
                reject()
            }
            this.users.findOne({username: username}, (error, user) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(user)
                }
            })
        })
    }

    createUser(username, email, passwordHash, isGuest) {
        return new Promise((resolve, reject) => {
            this.users.insert({
                ...DEFAULT_USER,
                username,
                email,
                passwordHash,
                isGuest,
            }, (error, user) => {
                if(error){
                    reject(error)
                } else {
                    resolve(user)
                }
            })
        })
    }
    createGuestUser(sessionId) {
        return new Promise((resolve, reject) => {
            this.users.insert({
                username: "Guest" + sessionId,
            })
        })
    }
}
