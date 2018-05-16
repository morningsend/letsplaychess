const AuthenService = require('./AuthenService').AuthenService
const RegistrationService = require('./RegistrationService').RegistrationService
const GameService = require('./GameService').GameService
const MatchMakingService = require('./MatchMakingService').MatchMakingService
const UserService = require('./UserService').UserService

module.exports = {
    GameService,
    AuthenService,
    RegistrationService,
    MatchMakingService,
    UserService,
}