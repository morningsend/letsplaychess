const express = require('express')

const url = '/register'
const router = express.Router()

const container = require('../container')
const { UserExistsError } = require('../services/RegistrationService')

router.post('/', async (request, response) => {
    const username = request.body.username
    const password = request.body.password
    const email = request.body.email

    if(!username || !password || !email) {
        response.status(400)
            .send({
                success: false,
                message: 'resquest body missing parameters',
            })
        return
    }
    try{
        const registrationService = container.resolve('RegistrationService')
        const result = await registrationService.register(username, email, password)
        response.json({
            success: true,
            message: 'Successfully registered new user ' + username,
        })
    }catch(error) {
        console.log(error)
        if(error instanceof UserExistsError) {
            response.status(400)
                .send({
                    success: false,
                    message: error.message
                })
        }
        else {
            response.sendStatus(400)
        }
    }
})
router.get('/check_username', async (request, response) => {
    const username = request.query.username
    if(!username) {
        response.status(400)
            .send({
                exist: false,
                message: 'missing username parameter',
            })
    }
    try{
        const registrationService = container.resolve('RegistrationService')
        const result = await registrationService.isUsernameAvailable(username)
        response.json({
            available: result,
            message: 'username ' + username + (result ? ' is available' : ' is not available'),
        })
    } catch(error) {
        console.log(error)
        response.status(500).send({
            success: false,
            message: 'server error'
        })
    }
})
export {
    url,
    router
}