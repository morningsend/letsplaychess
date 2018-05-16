const { NotFoundError } = require('../common/Errors')
const userRepository = require('../../database/UserRepository').UserRepository
const jwt = require('jsonwebtoken')
export class AuthenService {
    constructor(userRepository, jwt, bcrypt) {
        this.userRepository = userRepository
        this.jwt = jwt
        this.bcrypt = bcrypt
    }
    verifyToken(token) {
        return new Promise( (resolve, reject) => {
            const decoded = this.jwt.verify(token, 'somesecret')
            console.log('decoded: ' + JSON.stringify(decoded))
            if(!decoded.userId) {
                reject(false)
            } else {
                resolve(true)
            }
        })
    }
    signInWithEmail(email, password) {
        var foundUser
        return this.userRepository
            .findUserByEmail(email)
            .then(user => {
                if(!user) {
                    throw new Error('User is not found')
                }
                foundUser = user
                return this.bcrypt.compare(password, user.passwordHash)
            })
            .then(result => {
                if(result) {
                    const token = this.jwt.sign({ userId: user._id }, 'somesecret', { expiresIn: expiresIn})
                    return {
                        token: token,
                        expiresIn: expiresIn,
                        userId: foundUser._id,
                    }
                } else {
                    throw new NotFoundError('Username and password combination is not found.')
                }
            })
    }

    signInWithUserName(username, password) {
        var foundUser
        const expiresIn = 60 * 60
        return this.userRepository
            .findUserByUserName(username)
            .then(user => {
                if(!user) {
                    throw new NotFoundError(`User with username ${username} is not found`)
                }
                foundUser = user
                return this.bcrypt.compare(password, user.passwordHash)
            })
            .then(result => {
                if(result) {
                    const token = this.jwt
                            .sign({ userId: foundUser._id }, 'somesecret', { expiresIn: expiresIn})
                    return {
                        token: token,
                        expiresIn: expiresIn,
                        userId: foundUser._id,
                    }
                } else {
                    throw new NotFoundError('Username and password combination is not found.')
                }
            })
    }

    signInWithUserId(userId) {
        return this.userRepository
            .findUserById(userId)
            .then(user => {
                if(!user) {
                    throw new NotFoundError('User is not found')
                }
                const token = this.jwt
                                .sign({ userId: user._id }, 'somesecret', { expiresIn: expiresIn})
                return {
                    token: token,
                    expiresIn: expiresIn,
                    userId: user._id,
                }
            })
    }
}