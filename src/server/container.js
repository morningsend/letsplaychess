const { UserRepository, GameRepository, MatchRepository } = require('../database')
const {
    AuthenService,
    RegistrationService,
    MatchMakingService,
    GameService,
    UserService,
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
const matchRepository = new MatchRepository()
const authenService = new AuthenService(userRepository, jwt, bcrypt)
const registrationService = new RegistrationService(userRepository)
const matchMakingService = new MatchMakingService(userRepository, matchRepository)
const userService = new UserService(userRepository)

container.registerInstance('UserRepository', userRepository)
container.registerInstance('MatchRepository', matchRepository)
container.registerInstance('AuthenService', authenService)
container.registerInstance('RegistrationService', registrationService)
container.registerInstance('MatchMakingService', matchMakingService)
container.registerInstance('UserService', userService)

module.exports = container