const { UserRepository, GameRepository } = require('../database')
const {
    AuthenService,
    RegistrationService,
} = require('./services')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class DependencyContainer {
    constructor() {
        this.objects = {}
    }

    registerInstance(key, instance) {
        this.objects[key] = instance
    }

    resolve(key) {
        if(!this.objects[key]) {
            throw new Error(key + 'does not exist in container.')
        }
        return this.objects[key]
    }
}

const container = new DependencyContainer()
const userRepository = new UserRepository()
const authenService = new AuthenService(userRepository, jwt, bcrypt)
const registrationService = new RegistrationService(userRepository)

container.registerInstance('UserRepository', userRepository)
container.registerInstance('AuthenService', authenService)
container.registerInstance('RegistrationService', registrationService)

module.exports = container