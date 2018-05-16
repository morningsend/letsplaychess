const bcrypt = require('bcrypt')

export class UserExistsError extends Error {
    constructor(...args) {
        super(...args)
        Object.setPrototypeOf(this, UserExistsError.prototype)
    }
}

export class RegistrationService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    isUsernameAvailable(username) {
        return this.userRepository
                .findUserByUserName(username)
                .then(user => {
                    return user == null
                })
                .catch(error => {
                    console.error(error)
                    return false
                })
    }
    register(username, email, password) {
        if(username && email && password) {
            if(!this._passwordRequirement(password)){
                return Promise.reject(new UserExistsError(`Username ${username} is already taken.`))
            } else {
                return this._hashPassword(password).then(hash => {
                    return this
                        .userRepository
                        .createUser(username, email, hash, false)
                        .then({ success: true, message: 'User registered'})
                })
            }
        } else {
            return Promise.reject(new Error('username, email or password cannot be empty'))
        }
    }
    _passwordRequirement(password) {
        return password && password.length && password.length >= 8
    }
    _hashPassword(password) {
        if(!password){
            return Promise.reject({error: 'password cannot be null'})
        }
        else {
            return bcrypt.hash(password, 4)
        }
    }
}